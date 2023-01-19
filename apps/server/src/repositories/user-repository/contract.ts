import { User } from "@prisma/client";

import { OAuth2Provider } from "@/@types";
import { PrismaUserRepository } from "./prisma-user-repository";

export interface CreateUserData {
  name: string;
  email: string;
  avatarUrl?: string;
  githubId?: string;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<void>;
  getUser(id: string): Promise<User | null>;
  getUserByProviderId(
    provider: OAuth2Provider,
    providerId: string
  ): Promise<User | null>;
  getEmail(id: string): Promise<CreateUserData["email"] | null>;
}

export const userRepository = new PrismaUserRepository();
