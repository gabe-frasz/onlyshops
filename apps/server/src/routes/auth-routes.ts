import { User } from "@prisma/client";
import axios from "axios";
import { FastifyInstance } from "fastify";
import {
  CreateUserBody,
  createUserBodySchema,
  CreateUserResponse,
} from "zod-schemas";

import type { OAuth2Provider } from "@/@types";
import { prisma } from "@/libs";
import { authenticate } from "@/plugins";
import { getUserInfoFromProvider } from "@/utils";

export async function authRoutes(fastify: FastifyInstance) {
  // * Handle user login
  fastify.get("/auth/callback/:provider", async (req, res) => {
    const { provider } = req.params as { provider: OAuth2Provider };

    const {
      token: { access_token },
    } = await fastify[provider].getAccessTokenFromAuthorizationCodeFlow(req);

    const userInfo = await getUserInfoFromProvider(provider, access_token);

    if (!userInfo)
      return res.status(500).send({ error: "Error getting user info" });

    const { data } = await axios.post<CreateUserResponse>(
      `${process.env.DOMAIN_URL}/users`,
      {
        provider,
        providerId: userInfo.id,
        id: undefined,
        name: userInfo.name,
        email: userInfo.email,
        avatarUrl: userInfo.avatarUrl,
      } as CreateUserBody
    );

    if (!data.token) {
      return res.status(500).send(data.error);
    }

    return { token: data.token };
  });

  // * Create user and sign jwt
  fastify.post("/users", async (req, res) => {
    const parsedBody = createUserBodySchema.safeParse(req.body);
    if (!parsedBody.success)
      return res.status(400).send({ error: "Invalid body" });
    const { provider, providerId, name, email, avatarUrl } = parsedBody.data;

    let user: User | null = null;

    switch (provider) {
      case "github":
        user = await prisma.user.findUnique({
          where: { githubId: providerId },
        });
        break;

      default:
        return res.status(400).send({ error: "Invalid provider" });
    }

    if (!user) {
      user = await prisma.user.findUnique({
        where: { email },
      });

      if (user) {
        await prisma.user.update({
          data: {
            githubId: provider === "github" ? providerId : undefined,
          },
          where: { id: user.id },
        });
      }

      if (!user) {
        user = await prisma.user.create({
          data: {
            githubId: provider === "github" ? providerId : undefined,
            name,
            email,
            avatarUrl,
          },
        });
      }
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "1d",
      }
    );

    return res.status(201).send({ token, error: null } as CreateUserResponse);
  });

  // * Get user data
  fastify.get("/me", { onRequest: [authenticate] }, async (req, res) => {
    return req.user;
  });
}
