import { Router } from "express";
import { storage } from "../storage";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username required" });
  }

  // TEMP LOGIN (testing only)
  //const role = username.startsWith("admin") ? "admin" : "user";
  const user = await storage.getUserByUsername(username);
    if (!user) {
    return res.status(401).json({ message: "Invalid username" });
  }


  req.session.user = {
    id: user.id,
    username: user.username,
    role: user.role,
  };

  res.json({ user: req.session.user });
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
        },
    });
});
