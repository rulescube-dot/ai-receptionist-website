import { Router } from "express";
import { storage } from "../storage";
import { verifyPassword, looksHashed, hashPassword } from "@/lib/password";
import { validatePassword } from "../../shared/passwordPolicy";
import { requireAuth } from "../middleware/requireAuth";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { username, password } = req.body as {
    username?: string;
    password?: string;
  };

  if (!username || !password) {
    return res.status(400).json({ message: "username and password required" });
  }


  const user = await storage.getUserByUsername(username);
  if (!user){
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.active) {
    return res.status(403).json({ 
      message: "Your Account is disabled. Please contact an administrator."
     });
  }

   // 🔐 auto-migrate plaintext passwords
  if (!looksHashed(user.password)) {
    const newHash = await hashPassword(user.password);
    await storage.setUserPassword(user.id, newHash);
    user.password = newHash;
  }

  const ok = await verifyPassword(password, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  req.session.regenerate((err) => {
    if (err) return res.status(500).json({ message: "Session error" });

    req.session.user = { id: user.id, username: user.username, role: user.role, active: user.active };

    req.session.save((err2) => {
      if (err2) return res.status(500).json({ message: "Session save error" });
      return res.json({ user: { id: user.id, username: user.username, role: user.role, active: user.active } });
    });
  });
});

authRouter.post("/change-password", requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await storage.getUserByUsername(req.session.user!.username);
  if (!user) {
    return res.status(401).json({ message: "Invalid session" });
  }

  const ok = await verifyPassword(currentPassword, user.password);
  if (!ok) {
    return res.status(401).json({ message: "Current password is incorrect" });
  }

  const policyError = validatePassword(newPassword);
  if (policyError) {
    return res.status(400).json({ message: policyError });
  }

  const hashed = await hashPassword(newPassword);
  await storage.setUserPassword(user.id, hashed);

  res.json({ ok: true });
});


//logout route
authRouter.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }

    res.clearCookie("ai-receptionist.sid");
    res.json({ ok: true });
  });
});


//api/me route
authRouter.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  res.json({ 
    data: {
        id: req.session.user.id,
        username: req.session.user.username,
        role: req.session.user.role,
        active: req.session.user.active,
        },
    });
});
