import { Response } from "express";
import * as OrderService from "./order.service";

export const createOrder = async (req: any, res: Response) => {
  const result = await OrderService.createOrder(req.user, req.body);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: result,
  });
};
