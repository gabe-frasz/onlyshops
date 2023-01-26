import { FastifyInstance } from "fastify";

export async function authRoutes(fastify: FastifyInstance) {
  // ? it went wrong
  // fastify.get("/auth/login/google", async (req, res) => {
  //   const authorizationUri = fastify.google.generateAuthorizationUri(req);
  //   res.send(authorizationUri);
  // });
  // fastify.get("/auth/callback/google", async (req, res) => {
  //   const { token } =
  //     await fastify.google.getAccessTokenFromAuthorizationCodeFlow(req);
  //   res.send(token);
  // });
  // Create user and sign jwt
  // fastify.post("/users", async (req, res) => {
  //   const parsedBody = createUserBodySchema.safeParse(req.body);
  //   if (!parsedBody.success)
  //     return res.status(400).send({ error: "Invalid body" });
  //   const { provider, access_token } = parsedBody.data;
  //   const {
  //     id: providerId,
  //     name,
  //     email,
  //     avatarUrl,
  //   } = await getUserInfoFromProvider(provider, access_token);
  //   let user: User | null = null;
  //   switch (provider) {
  //     case "github":
  //       user = await prisma.user.findUnique({
  //         where: { githubId: providerId },
  //       });
  //       break;
  //     default:
  //       return res.status(400).send({ error: "Invalid provider" });
  //   }
  //   if (!user) {
  //     user = await prisma.user.findUnique({
  //       where: { email },
  //     });
  //     if (user) {
  //       await prisma.user.update({
  //         data: {
  //           githubId: provider === "github" ? providerId : undefined,
  //         },
  //         where: { id: user.id },
  //       });
  //     }
  //     if (!user) {
  //       user = await prisma.user.create({
  //         data: {
  //           githubId: provider === "github" ? providerId : undefined,
  //           name,
  //           email,
  //           avatarUrl,
  //         },
  //       });
  //     }
  //   }
  //   const token = fastify.jwt.sign(
  //     {
  //       name: user.name,
  //       avatarUrl: user.avatarUrl,
  //     },
  //     {
  //       sub: user.id,
  //       expiresIn: "1d",
  //     }
  //   );
  //   return res.status(201).send({ token });
  // });
}
