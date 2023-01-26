import { User } from "@prisma/client";

import { PrismaUserRepository } from "./prisma-user-repository";

export interface CreateUserData {
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getEmail(id: string): Promise<CreateUserData["email"] | null>;
}

export const userRepository = new PrismaUserRepository();
