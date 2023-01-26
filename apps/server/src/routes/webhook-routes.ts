import algoliasearch from "algoliasearch";
import { FastifyInstance } from "fastify";
import request from "graphql-request";
import { checkoutSessionCompletedSchema } from "zod-schemas";

import { mailAdapter } from "@/adapters";
import { productsQuery, ProductsQueryResponse } from "@/graphql";
import { stripe } from "@/libs";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

export async function webhookRoutes(fastify: FastifyInstance) {
  /** @POST //* Handle stripe webhooks */
  /** @Public */
  // TODO: finish email content
  fastify.post("/stripe", { config: { rawBody: true } }, async (req, res) => {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return res.status(401).send({
        status: "401 Unauthorized",
        message: "Missing Stripe signature",
      });
    }

    const event = stripe.webhooks.constructEvent(
      req.rawBody!,
      signature,
      endpointSecret!
    );

    switch (event.type) {
      case "checkout.session.completed":
        const parsedObject = checkoutSessionCompletedSchema.safeParse(
          event.data.object
        );
        if (!parsedObject.success) {
          return res
            .status(400)
            .send({ status: "400 Bad Request", message: "Missing data" });
        }
        const { customer_email } = parsedObject.data;

        if (!customer_email) return;

        await mailAdapter.sendMail({
          to: customer_email,
          subject: "Checkout completed",
          text: "Checkout completed",
          html: "<p>Checkout completed</p>",
        });

        break;

      default:
        return res.status(400).send(`Unhandled event type ${event.type}`);
    }

    res.send();
  });

  // TODO: Implement algolia index
  fastify.post("/algolia/index", async (req, res) => {
    const { products } = await request<ProductsQueryResponse>(
      "https://api-sa-east-1.hygraph.com/v2/clczce4hn4b0a01ukejgw1gz6/master",
      productsQuery,
      {
        locale: "en",
      }
    );

    const transformedData = products.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      price: p.price,
      image: p.images[0].url,
      inStock: p.inStock,
      categories: p.categories.map((c) => c.name),
    }));

    algoliasearch(process.env.ALGOLIA_APP_ID!, process.env.ALGOLIA_ADMIN_KEY!)
      .initIndex("products")
      .saveObjects(transformedData, { autoGenerateObjectIDIfNotExist: true })
      .wait();

    res.send();
  });
}
