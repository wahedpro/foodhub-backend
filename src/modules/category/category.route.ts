import { Router } from "express";
import { adminOnly, auth } from "../../middlewares/auth.middleware";
import * as CategoryController from "./category.controller";

const router = Router();

// create category
router.post("/", auth, adminOnly, CategoryController.createCategory);

// get all categories
router.get("/", CategoryController.getAllCategories); // public (optional)

// update category
router.patch("/:id", auth, adminOnly, CategoryController.updateCategory);

// delete category
router.delete("/:id", auth, adminOnly, CategoryController.deleteCategory);

export default router;
