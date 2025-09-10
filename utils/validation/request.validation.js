import * as z from "zod";

export const signupPostRequestBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string().optional(),
  email: z.email(),
  password: z.string().min(6),
});
