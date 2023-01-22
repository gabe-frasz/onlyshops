import { prisma } from "@/libs";
import { CreateUserData, UserRepository } from "./contract";

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserData) {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
      },
    });
  }

  async getUser(id: string) {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getEmail(userId: string) {
    const user = await prisma.user.findUnique({
      select: { email: true },
      where: { id: userId },
    });

    return user ? user.email : null;
  }
}
