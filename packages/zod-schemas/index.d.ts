import { z } from "zod";
export declare const createCheckoutSessionSchema: z.ZodObject<
  {
    items: z.ZodArray<
      z.ZodObject<
        {
          id: z.ZodString;
          name: z.ZodString;
          description: z.ZodOptional<z.ZodString>;
          images: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
          priceInCents: z.ZodNumber;
          quantity: z.ZodNumber;
        },
        "strip",
        z.ZodTypeAny,
        {
          description?: string | undefined;
          images?: string[] | undefined;
          id: string;
          name: string;
          priceInCents: number;
          quantity: number;
        },
        {
          description?: string | undefined;
          images?: string[] | undefined;
          id: string;
          name: string;
          priceInCents: number;
          quantity: number;
        }
      >,
      "many"
    >;
  },
  "strip",
  z.ZodTypeAny,
  {
    items: {
      description?: string | undefined;
      images?: string[] | undefined;
      id: string;
      name: string;
      priceInCents: number;
      quantity: number;
    }[];
  },
  {
    items: {
      description?: string | undefined;
      images?: string[] | undefined;
      id: string;
      name: string;
      priceInCents: number;
      quantity: number;
    }[];
  }
>;
export declare const createUserBodySchema: z.ZodObject<
  {
    provider: z.ZodEnum<["github"]>;
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    avatarUrl: z.ZodNullable<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    id: string;
    name: string;
    provider: "github";
    email: string;
    avatarUrl: string | null;
  },
  {
    id: string;
    name: string;
    provider: "github";
    email: string;
    avatarUrl: string | null;
  }
>;
export type CreateUserBody = z.infer<typeof createUserBodySchema>;
export declare const createUserResponseSchema: z.ZodObject<
  {
    token: z.ZodNullable<z.ZodString>;
    error: z.ZodNullable<z.ZodString>;
  },
  "strip",
  z.ZodTypeAny,
  {
    error: string | null;
    token: string | null;
  },
  {
    error: string | null;
    token: string | null;
  }
>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export declare const githubUserInfoResponseSchema: z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    avatar_url: z.ZodNullable<z.ZodOptional<z.ZodString>>;
  },
  "strip",
  z.ZodTypeAny,
  {
    avatar_url?: string | null | undefined;
    id: string;
    name: string;
    email: string;
  },
  {
    avatar_url?: string | null | undefined;
    id: string;
    name: string;
    email: string;
  }
>;
//# sourceMappingURL=index.d.ts.map
