import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  role: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // attach user info to request
    (req as any).user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export const auth = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  req.user = decoded;
  next();
};

// Only Provider Role
export const providerOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "PROVIDER") {
    return res.status(403).json({
      message: "Only provider can add meals",
    });
  }
  next();
};

// Only Admin Role:
export const adminOnly = (req: any, res: Response, next: NextFunction) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
  next();
};