import { authenticate } from "@/plugins";
import { FastifyInstance } from "fastify";
import { Stripe } from "stripe";
import { createCheckoutSessionSchema } from "zod-schemas";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2022-11-15",
});

export async function checkoutRoutes(fastify: FastifyInstance) {
  // * Create checkout session
  fastify.post("/checkout", { onRequest: [authenticate] }, async (req, res) => {
    const parsedBody = createCheckoutSessionSchema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(400).send({ error: "Invalid body" });
    const { items } = parsedBody.data;

    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item) => ({
        price_data: {
          currency: "brl",
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images,
          },
          unit_amount: item.priceInCents,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.CORS_ORIGIN}/success`,
      cancel_url: `${process.env.CORS_ORIGIN}?canceled=true`,
    });

    res.redirect(303, session.url!);
  });
}
