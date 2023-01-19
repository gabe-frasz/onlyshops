import { FastifyInstance } from "fastify";
import { createCheckoutSessionSchema } from "zod-schemas";

import { prisma, stripe } from "@/libs";
import { authenticate } from "@/plugins";

export async function checkoutRoutes(fastify: FastifyInstance) {
  // * Create checkout session
  fastify.post("/", { onRequest: [authenticate] }, async (req, res) => {
    const parsedBody = createCheckoutSessionSchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).send({
        status: "400 Bad request",
        message: parsedBody.error.format(),
      });
    }
    const { items } = parsedBody.data;

    const user = await prisma.user.findUnique({
      select: { email: true },
      where: { id: req.user.sub },
    });

    if (!user) return res.status(404).send({ error: "User not found" });

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
      success_url: `${process.env.WEB_APP_ORIGIN}/success`,
      cancel_url: `${process.env.WEB_APP_ORIGIN}?canceled=true`,
      customer_email: user.email,
      customer: req.user.sub,
    });

    res.redirect(303, session.url!);
  });
}
