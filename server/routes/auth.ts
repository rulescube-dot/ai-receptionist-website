import { Router } from "express";

export const authRouter = Router();

authRouter.post("/login", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "username required" });
  }

  // TEMP LOGIN (testing only)
  const role = username.startsWith("admin") ? "admin" : "user";

  req.session.user = {
    id: crypto.randomUUID(),
    username,
    role,
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

  res.json({ user: req.session.user });
});
