import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../utils/validation/request.validation.js";
import { createUserById } from "../services/user.service.js";
import { hashPasswordWithSalt } from "../utils/hash.js";
import { findUserByEmail, getUsersByMail } from "../services/user.service.js";
import { createUserToken } from "../utils/token.js";

export const signupController = async (req, res) => {
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
};

export const loginController = async (req, res) => {
  const validationResult = await loginPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.issues });
  }

  const { email, password } = validationResult.data;

  const user = await findUserByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ error: `user with email: ${email} is not exists!` });
  }

  const { password: hashedPassword } = hashPasswordWithSalt(
    password,
    user.salt
  );

  if (user.password !== hashedPassword) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const payload = {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ` + `${user.lastName}`,
  };

  const token = await createUserToken(payload);

  return res.json({ token });
};

export const getUsersController = async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({ error: "Unauthorized access restricted" });
  }

  const users = await getUsersByMail("saurav27@gmail.com");
  return res.json({ ststus: "success", users });
};
