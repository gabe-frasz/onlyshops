import { OAuth2Namespace } from "@fastify/oauth2";

declare module "fastify" {
  interface FastifyInstance {
    github: OAuth2Namespace;
    google: OAuth2Namespace;
  }
}
