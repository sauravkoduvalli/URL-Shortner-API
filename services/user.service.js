import { db } from "../db/index.js";
import { usersTable } from "../model/index.js";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email) => {
  const [existingUser] = await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      email: usersTable.email,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return existingUser;
};

export const createUserById = async (
  email,
  firstName,
  lastName,
  hashedPassword,
  salt
) => {
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

  return user;
};

export const getUsersByMail = async (email = undefined) => {
  if ((email === null) | (email === undefined)) {
    const users = await db
      .select({
        id: usersTable.id,
        email: usersTable.email,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
      })
      .from(usersTable);
    return users;
  }
  const [user] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    })
    .from(usersTable)
    .where(eq(email, usersTable.email));
  return user;
};
