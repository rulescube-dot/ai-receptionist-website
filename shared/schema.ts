import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

import { pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  username: text("username").notNull().unique(),

  password: text("password").notNull(),

  role: userRoleEnum("role").notNull().default("user"),

  active: boolean("active").notNull().default(true),

  createdAt: timestamp("created_at").notNull().defaultNow(),

  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  active: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
