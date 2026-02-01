import { Request, Response } from "express";
import { createReviewService } from "./review.service";

export const createReview = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // auth middleware থেকে
    const { mealId, rating, comment } = req.body;

    if (!mealId || !rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "mealId, rating and comment are required",
      });
    }

    const review = await createReviewService({
      userId,
      mealId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
