import { db } from "./db";
import { eq } from "drizzle-orm";
import type { InsertUser, User } from "@shared/schema";
import { users } from "@shared/schema";
import { hashPassword, looksHashed } from "@/lib/password";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(id: string, role: "admin" | "user"): Promise<User>;
  setUserActive(id: string, active: boolean): Promise<User>;
  setUserPassword(id: string, passwordHash: string): Promise<User>;
  deleteUser(id: string): Promise<User>;
}

export class DBStorage implements IStorage {
  async getUser(id: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, id));

    return user;
  }

  async getUserByUsername(username: string) {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return user;
  }

  async getUsers() {
    return db.select().from(users);
  }

  async createUser(insertUser: InsertUser) {
    const passwordToStore = looksHashed(insertUser.password)
      ? insertUser.password
      : await hashPassword(insertUser.password);

    const [created] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: passwordToStore,
        updatedAt: new Date(),
      })
      .returning();

    return created;
  }

  async updateUserRole(id: string, role: "admin" | "user") {
    const [updated] = await db
      .update(users)
      .set({
        role,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return updated;
  }

  async setUserActive(id: string, active: boolean) {
    const [updated] = await db
      .update(users)
      .set({
        active,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!updated) {
      throw new Error("User not found");
    }

    return updated;
  }

  async setUserPassword(id: string, passwordHash: string) {
    const [updated] = await db
      .update(users)
      .set({
        password: passwordHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    return updated;
  }

  async deleteUser(id: string) {
    const [deleted] = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return deleted;
  }
}

export const storage = new DBStorage();
