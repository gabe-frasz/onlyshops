"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubUserInfoResponseSchema = exports.createUserResponseSchema = exports.createUserBodySchema = exports.createCheckoutSessionSchema = void 0;
const zod_1 = require("zod");
exports.createCheckoutSessionSchema = zod_1.z.object({
    items: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string(),
        name: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        images: zod_1.z.array(zod_1.z.string().url()).max(8).optional(),
        priceInCents: zod_1.z.number().int().min(1),
        quantity: zod_1.z.number().int().min(1),
    })),
});
exports.createUserBodySchema = zod_1.z.object({
    provider: zod_1.z.enum(["github"]),
    id: zod_1.z.coerce.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    avatarUrl: zod_1.z.string().url().nullable(),
});
exports.createUserResponseSchema = zod_1.z.object({
    token: zod_1.z.string().nullable(),
    error: zod_1.z.string().nullable(),
});
exports.githubUserInfoResponseSchema = zod_1.z.object({
    id: zod_1.z.coerce.string(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    avatar_url: zod_1.z.string().url().nullish(),
});
