import { Response } from "express";
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
