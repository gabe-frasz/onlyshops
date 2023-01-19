import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import oauth2 from "@fastify/oauth2";
import Fastify from "fastify";
import rawBody from "fastify-raw-body";

import { OAuth2Provider } from "@/@types";
import { authRoutes, checkoutRoutes, webhookRoutes } from "@/routes";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  const PORT = Number(process.env.PORT || 5000);

  await fastify.register(cors, { origin: process.env.WEB_APP_ORIGIN });
  await fastify.register(jwt, { secret: process.env.JWT_SECRET! });
  await fastify.register(rawBody, { global: false });
  await fastify.register(oauth2, {
    name: "github" as OAuth2Provider,
    credentials: {
      client: {
        id: process.env.GITHUB_CLIENT_ID!,
        secret: process.env.GITHUB_SECRET!,
      },
      auth: oauth2.GITHUB_CONFIGURATION,
    },
    startRedirectPath: "/auth/login/github",
    callbackUri: `${process.env.DOMAIN_URL}/auth/callback/github`,
    scope: ["read:user", "user:email"],
  });

  await fastify.register(authRoutes);
  await fastify.register(checkoutRoutes, { prefix: "/checkouts" });
  await fastify.register(webhookRoutes, { prefix: "/webhooks" });

  await fastify.listen({ port: PORT });
}

bootstrap();
