import { Request, Response } from "express";
import * as CategoryService from "./category.service";

type IdParams = { id: string };

export const createCategory = async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
};

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategories();

  res.status(200).json({
    success: true,
    data: categories,
  });
};

export const updateCategory = async (
  req: Request<IdParams>,
  res: Response
) => {
  const result = await CategoryService.updateCategory(
    req.params.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: result,
  });
};

export const deleteCategory = async (
  req: Request<IdParams>,
  res: Response
) => {
  await CategoryService.deleteCategory(req.params.id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};
