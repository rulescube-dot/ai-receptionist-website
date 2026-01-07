import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { storage } from "../storage";
import crypto from "crypto";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

adminRouter.get("/users", async (_req, res) => {
  const users = await storage.getUsers();

  // 🔒 sanitize output
  const safeUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    role: u.role,
  }));

  res.json({ data: safeUsers });
});


adminRouter.post("/users", async (req, res) => {
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: "username and role required" });
  }

  const tempPassword = crypto.randomBytes(12).toString("hex");

  const user = await storage.createUser({
    username,
    password: tempPassword,
    role,
  });

  res.status(201).json(user);
});

adminRouter.patch("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!role) {
    return res.status(400).json({ message: "role required" });
  }

  const user = await storage.updateUserRole(id, role);
  res.json(user);
});

adminRouter.patch("/users/:id/disable", async (req, res) => {
  const user = await storage.setUserActive(req.params.id, false);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } 
  res.json(user);
});

adminRouter.patch("/users/:id/enable", async (req, res) => {
  const user = await storage.setUserActive(req.params.id, true);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
});

