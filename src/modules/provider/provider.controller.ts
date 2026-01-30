import { Response, Request } from "express";
import * as ProviderService from "../provider/provider.service"

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
