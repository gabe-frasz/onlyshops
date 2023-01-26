import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import rawBody from "fastify-raw-body";

import { checkoutRoutes, webhookRoutes } from "@/routes";
import { userRoutes } from "./routes/user-routes";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  const PORT = Number(process.env.PORT || 5000);

  await fastify.register(cors, { origin: process.env.WEB_APP_ORIGIN });
  await fastify.register(jwt, { secret: process.env.JWT_SECRET! });
  await fastify.register(rawBody, { global: false });

  await fastify.register(userRoutes, { prefix: "/users" });
  await fastify.register(checkoutRoutes, { prefix: "/checkouts" });
  await fastify.register(webhookRoutes, { prefix: "/webhooks" });

  await fastify.listen({ port: PORT });
}

bootstrap();
