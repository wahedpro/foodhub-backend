import { Request, Response } from "express";
import * as AdminService from "./admin.service";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await AdminService.getAllUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};
