import { Router } from "express";
import * as MealController from "./meal.controller";

const router = Router();

// GET all meals (public)
router.get("/", MealController.getAllMeals);
// GET meal details by id
router.get("/:id", MealController.getMealById);

export default router;
