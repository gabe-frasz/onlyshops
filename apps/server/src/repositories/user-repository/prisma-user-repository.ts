import { OAuth2Provider } from "@/@types";
import { prisma } from "@/libs";
import { CreateUserData, UserRepository } from "./contract";

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserData) {
    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
        githubId: data.githubId,
      },
    });
  }

  async getUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByProviderId(provider: OAuth2Provider, providerId: string) {
    switch (provider) {
      case "github":
        return await prisma.user.findUnique({
          where: { githubId: providerId },
        });

      default:
        return null;
    }
  }

  async getEmail(userId: string) {
    const user = await prisma.user.findUnique({
      select: { email: true },
      where: { id: userId },
    });

    return user ? user.email : null;
  }
}
