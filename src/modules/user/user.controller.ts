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

export const changePassword = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = (req as any).user.id;
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old & new password required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Password change failed",
    });
  }
};
