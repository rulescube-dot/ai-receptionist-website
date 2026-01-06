import type { Request, Response, NextFunction } from "express";

export function requireRole(role: "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.session.user;

    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
