import { z } from "zod";

export const userTokenSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string(),
});

export const verifyUserTokenSchema = z.object({
  token: z.jwt(),
});
