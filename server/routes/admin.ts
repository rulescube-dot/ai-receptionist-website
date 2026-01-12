import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { requireRole } from "../middleware/requireRole";
import { storage } from "../storage";
import crypto from "crypto";
import { hashPassword } from "@/lib/password";
import { writeAuditLog } from "../audit";

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole("admin"));

/* ---------------- USERS LIST ---------------- */

adminRouter.get("/users", async (_req, res) => {
  const users = await storage.getUsers();

  const safeUsers = users.map(u => ({
    id: u.id,
    username: u.username,
    role: u.role,
    active: u.active,
  }));

  res.json({ data: safeUsers });
});

/* ---------------- CREATE USER ---------------- */

adminRouter.post("/users", async (req, res) => {
  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: "username and role required" });
  }

  const tempPassword = crypto.randomBytes(12).toString("hex");
  const hashedPassword = await hashPassword(tempPassword);

  const created = await storage.createUser({
    username,
    password: hashedPassword,
    role,
    active: true,
  } as any);

  await writeAuditLog({
    actorUserId: req.session.user!.id,
    actorUsername: req.session.user!.username,
    action: "CREATE_USER",
    targetUserId: created.id,
    targetUsername: created.username,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.status(201).json({
    data: {
      id: created.id,
      username: created.username,
      role: created.role,
      active: created.active,
    },
    tempPassword, // shown once
  });
});

/* ---------------- CHANGE ROLE ---------------- */

adminRouter.patch("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  if (!role) {
    return res.status(400).json({ message: "role required" });
  }

  const user = await storage.updateUserRole(id, role);

  await writeAuditLog({
    actorUserId: req.session.user!.id,
    actorUsername: req.session.user!.username,
    action: "CHANGE_USER_ROLE",
    targetUserId: user.id,
    targetUsername: user.username,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    active: user.active,
  });
});

/* ---------------- DISABLE USER ---------------- */

adminRouter.patch("/users/:id/disable", async (req, res) => {
  const user = await storage.setUserActive(req.params.id, false);

  await writeAuditLog({
    actorUserId: req.session.user!.id,
    actorUsername: req.session.user!.username,
    action: "DISABLE_USER",
    targetUserId: user.id,
    targetUsername: user.username,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    active: user.active,
  });
});

/* ---------------- ENABLE USER ---------------- */

adminRouter.patch("/users/:id/enable", async (req, res) => {
  const user = await storage.setUserActive(req.params.id, true);

  await writeAuditLog({
    actorUserId: req.session.user!.id,
    actorUsername: req.session.user!.username,
    action: "ENABLE_USER",
    targetUserId: user.id,
    targetUsername: user.username,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.json({
    id: user.id,
    username: user.username,
    role: user.role,
    active: user.active,
  });
});

/* ---------------- RESET PASSWORD ---------------- */

adminRouter.post("/users/:id/reset-password", async (req, res) => {
  const tempPassword = crypto.randomBytes(12).toString("hex");
  const hashed = await hashPassword(tempPassword);

  const user = await storage.setUserPassword(req.params.id, hashed);

  await writeAuditLog({
    actorUserId: req.session.user!.id,
    actorUsername: req.session.user!.username,
    action: "RESET_PASSWORD",
    targetUserId: user.id,
    targetUsername: user.username,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.json({
    data: {
      id: user.id,
      username: user.username,
      role: user.role,
      active: user.active,
    },
    tempPassword,
  });
});

/* ---------------- DELETE USER ---------------- */

adminRouter.delete("/users/:id", async (req, res) => {
  const deleted = await storage.deleteUser(req.params.id);

  await writeAuditLog({
    actorUserId: req.session.user!.id,
    actorUsername: req.session.user!.username,
    action: "DELETE_USER",
    targetUserId: deleted.id,
    targetUsername: deleted.username,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res.json({ ok: true });
});
