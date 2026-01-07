import type { Request, Response, NextFunction } from "express";

export function requireRole(role: "admin") {
  return (req: Request, res: Response, next: NextFunction) => {
    if(!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    if (req.session.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
}
