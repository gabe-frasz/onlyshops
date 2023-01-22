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
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url().optional(),
});
export type CreateUserBody = z.infer<typeof createUserBodySchema>;
