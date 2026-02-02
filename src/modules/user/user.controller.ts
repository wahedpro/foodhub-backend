import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const { name } = req.body;

    const user = await prisma.user.update({
      where: { id: userId },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json({
      success: true,
      data: user,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Profile update failed",
    });
  }
};
