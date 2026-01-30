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

export const getMyOrders = async (req: any, res: Response) => {
  const orders = await OrderService.getMyOrders(req.user);

  res.status(200).json({
    success: true,
    data: orders,
  });
};


export const getOrderById = async (
  req: any,
  res: Response
) => {
  const order = await OrderService.getOrderById(req.user, req.params.id);

  res.status(200).json({
    success: true,
    data: order,
  });
};