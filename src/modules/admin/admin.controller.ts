import { Request, Response } from "express";
import * as AdminService from "./admin.service";

// get all the user
export const getAllUsers = async (req: Request, res: Response) => {
  const users = await AdminService.getAllUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};

// update user isActive 
type IdParams = {
  id: string;
};

export const updateUserStatus = async (
  req: Request<IdParams>,
  res: Response
) => {
  const result = await AdminService.updateUserStatus(
    req.params.id,
    req.body.isActive
  );

  res.status(200).json({
    success: true,
    message: "User status updated",
    data: result,
  });
};


export const getAllOrders = async (req: Request, res: Response) => {
  const orders = await AdminService.getAllOrders();

  res.json({
    success: true,
    data: orders,
  });
};
