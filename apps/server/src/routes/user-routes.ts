import { FastifyInstance } from "fastify";
import { createUserBodySchema } from "zod-schemas";

import { authenticate } from "@/plugins";
import { userRepository } from "@/repositories";

export async function userRoutes(fastify: FastifyInstance) {
  /** @POST //* Create a user */
  /** @Public */
  fastify.post("/", async (req, res) => {
    const parsedBody = createUserBodySchema.safeParse(req.body);
    if (!parsedBody.success) {
      return res.status(400).send({
        status: "400 Bad Request",
        message: parsedBody.error.format(),
      });
    }
    const bodyData = parsedBody.data;

    let user = await userRepository.getUserByEmail(bodyData.email);

    if (!user) {
      user = await userRepository.create({
        name: bodyData.name,
        email: bodyData.email,
        avatarUrl: bodyData.avatarUrl ?? undefined,
      });
    }

    const token = fastify.jwt.sign(
      {
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      {
        sub: user.id,
        expiresIn: "1d",
      }
    );

    res.status(200).send({ token });
  });

  /** @GET //* Get user data */
  /** @Private */
  fastify.get("/me", { onRequest: [authenticate] }, async (req, res) => {
    return req.user;
  });
}
