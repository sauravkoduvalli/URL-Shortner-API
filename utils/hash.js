import { randomBytes, createHmac } from "node:crypto";

export const hashPasswordWithSalt = (password) => {
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  return { salt, password: hashedPassword };
};
