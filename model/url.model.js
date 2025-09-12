import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model.js";

export const urlTable = pgTable("urls", {
  id: uuid().primaryKey().defaultRandom(),

  shortCode: varchar("code", { length: 155 }).notNull().unique(),
  target: text("target_url").notNull(),

  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAT: timestamp("updated_at").$onUpdate(() => new Date()),
});
