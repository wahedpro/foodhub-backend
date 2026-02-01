import { Request, Response } from "express";
import * as MealService from "./meal.service";

// get all the meals here
export const getAllMeals = async (req: Request, res: Response) => {
  const meals = await MealService.getAllMeals(req.query);

  res.status(200).json({
    success: true,
    data: meals,
  });
};


// get single meal here
type IdParams = { id: string };

export const getMealById = async (
  req: Request<IdParams>,
  res: Response
) => {
  try {
    const meal = await MealService.getMealById(req.params.id);

    res.status(200).json({
      success: true,
      data: meal,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Meal not found",
    });
  }
};