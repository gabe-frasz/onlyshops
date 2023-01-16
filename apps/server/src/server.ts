import { OAuth2Provider } from "@/@types";
import { authRoutes, checkoutRoutes } from "@/routes";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import oauth2 from "@fastify/oauth2";
import Fastify from "fastify";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  const PORT = (process.env.PORT || 5000) as number;

  await fastify.register(cors, { origin: process.env.CORS_ORIGIN });
  await fastify.register(jwt, { secret: process.env.JWT_SECRET! });
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
  await fastify.register(checkoutRoutes);

  await fastify.listen({ port: PORT });
}

bootstrap();
