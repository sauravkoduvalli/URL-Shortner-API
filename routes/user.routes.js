import express from "express";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

import { db } from "../db/index.js";
import { usersTable } from "../model/index.js";
import { signupPostRequestBodySchema } from "../utils/validation/request.validation.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  // vallidation
  const validationResult = await signupPostRequestBodySchema.safeParseAsync(
    req.body
  );
  // if validation fails
  if (!validationResult.success)
    return res.status(400).json({ error: validationResult.error.issues });

  // if validation success
  const { firstName, lastName, email, password } = validationResult.data;

  // get the existing user with the email
  const [existingUser] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  // if user entered mail already exist in the db
  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists!` });
  }

  //password hashing
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  // if user entered mail is not exist in the db
  // so, can create a new db entry
  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      firstName,
      lastName,
      password: hashedPassword,
      salt,
    })
    .returning({
      id: usersTable.id,
    });

  return res
    .status(201)
    .json({ message: "Successfully registered", data: { id: user.id } });
});

export default router;
