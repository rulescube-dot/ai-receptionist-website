import type { Request, Response, NextFunction } from "express";
import { storage } from "../storage";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const sessionUser = req.session.user;

  if (!sessionUser) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const dbUser = await storage.getUserByUsername(sessionUser.username);

  if (!dbUser || !dbUser.active) {

    req.session.destroy(() => {});
    return res.status(403).json({ 
      message: "Your Account is disabled. Please contact an administrator."
    });
  }

  next();
}
