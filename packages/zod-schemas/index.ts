import { z } from "zod";

export const createCheckoutSessionSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
        images: z.array(z.string().url()).max(8).optional(),
        priceInCents: z.number().int().min(1),
        quantity: z.number().int().min(1),
      })
    )
    .min(1),
});

export const checkoutSessionCompletedSchema = z.object({
  id: z.string(),
  customer: z.string().nullable(),
  customer_email: z.string().email().nullable(),
});

export const createUserBodySchema = z.object({
  provider: z.enum(["github"]),
  providerId: z.coerce.string(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().nullable(),
});
export type CreateUserBody = z.infer<typeof createUserBodySchema>;

export const createUserResponseSchema = z.object({
  token: z.string().nullable(),
  error: z.string().nullable(),
});
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

export const githubUserInfoResponseSchema = z.object({
  id: z.coerce.string(),
  name: z.string(),
  email: z.string().email(),
  avatar_url: z.string().url().nullish(),
});
