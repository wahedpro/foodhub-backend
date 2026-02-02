import { Response, } from "express";
import * as ProviderService from "../provider/provider.service"
import { OrderStatus } from "../../../generated/prisma/enums";

// Create provider profile
export const createProviderProfile = async (req: any, res: Response) => {
  const result = await ProviderService.createProviderProfile(
    req.user,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Provider profile created successfully",
    data: result,
  });
};

// Add meal
export const addMeal = async (req: any, res: Response) => {
  const result = await ProviderService.addMeal(req.user, req.body);

  res.status(201).json({
    success: true,
    message: "Meal added successfully",
    data: result,
  });
};

// Update Meal
export const updateMeal = async (
  req: any,
  res: Response
) => {
  const result = await ProviderService.updateMeal(
    req.user,
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Meal updated successfully",
    data: result,
  });
};

// Delete Meal
export const deleteMeal = async (
  req: any,
  res: Response
) => {
  await ProviderService.deleteMeal(req.user, req.params.id);

  res.status(200).json({
    success: true,
    message: "Meal deleted successfully",
  });
};

// update the Order status
// export const updateOrderStatus = async (req: any, res: Response) => {
//   const status = req.body.status as OrderStatus;

//   const result = await ProviderService.updateOrderStatus(
//     req.user,
//     req.params.id,
//     status
//   );

//   res.status(200).json({
//     success: true,
//     message: "Order status updated successfully",
//     data: result,
//   });
// };


export const getIncomingOrders = async (req: any, res: Response) => {
  const orders = await ProviderService.getIncomingOrders(req.user.id);

  res.json({
    success: true,
    data: orders,
  });
};

export const updateOrderStatus = async (req: any, res: Response) => {
  const { status } = req.body;

  const order = await ProviderService.updateOrderStatus(
    req.user.id,
    req.params.id,
    status
  );

  res.json({
    success: true,
    message: "Order status updated",
    data: order,
  });
};

export const getDashboardStats = async (req: any, res: Response) => {
  const stats = await ProviderService.getDashboardStats(req.user.id);

  res.json({
    success: true,
    data: stats,
  });
};