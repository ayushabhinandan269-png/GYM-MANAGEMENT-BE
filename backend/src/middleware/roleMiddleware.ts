import { Request, Response, NextFunction } from "express";

export const adminOnly = (req: any, res: Response, next: NextFunction) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access required"
    });
  }

  next();
};

export const trainerOnly = (req: any, res: Response, next: NextFunction) => {

  if (req.user.role !== "trainer") {
    return res.status(403).json({
      message: "Trainer access required"
    });
  }

  next();
};

export const memberOnly = (req: any, res: Response, next: NextFunction) => {

  if (req.user.role !== "member") {
    return res.status(403).json({
      message: "Member access required"
    });
  }

  next();
};