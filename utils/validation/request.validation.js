import * as z from "zod";

export const signupPostRequestBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.email(),
  password: z.string().min(6).max(16),
});

export const loginPostRequestBodySchema = z.object({
  email: z.email("This is not a valid email."),
  password: z.string().min(6).max(16),
});

export const GetUserRequestSchema = z.object({
  email: z.email(),
});

export const shortenPostRequestBodySchema = z.object({
  url: z.url(),
  code: z.string().optional(),
});
