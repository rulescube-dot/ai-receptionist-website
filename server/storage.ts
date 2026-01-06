import { db } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";
import type { InsertUser, User } from "@shared/schema";

export interface IStorage {
  getUserByUsername(username: string): Promise<User | undefined>;
  getUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  updateUserRole(id: string, role: "admin" | "user"): Promise<User>;
}

export class DBStorage implements IStorage {
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

  async createUser(user: InsertUser) {
    const [created] = await db
      .insert(users)
      .values(user)
      .returning();
    return created;
  }

  async updateUserRole(id: string, role: "admin" | "user") {
    const [updated] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DBStorage();
