import { FastifyInstance } from "fastify";

import { checkoutSessionCompletedSchema } from "zod-schemas";

import { mailAdapter } from "@/adapters";
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
}
