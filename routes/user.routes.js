import express from "express";

import { signupPostRequestBodySchema } from "../utils/validation/request.validation.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { createUserById, findUserByEmail } from "../services/user.service.js";

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
  const existingUser = await findUserByEmail(email);

  // if user entered mail already exist in the db
  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exists!` });
  }

  const { salt, password: hashedPassword } = hashPasswordWithSalt(password);

  // if user entered mail is not exist in the db
  // so, can create a new db entry
  const user = await createUserById(
    email,
    firstName,
    lastName,
    hashedPassword,
    salt
  );

  return res
    .status(201)
    .json({ message: "Successfully registered", data: { id: user.id } });
});



export default router;
