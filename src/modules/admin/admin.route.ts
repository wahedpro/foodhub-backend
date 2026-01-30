import { Router } from "express";
import { adminOnly, auth } from "../../middlewares/auth.middleware";
import * as AdminController from "./admin.controller";

const router = Router();

// get all the user
router.get(
  "/users",
  auth,
  adminOnly,
  AdminController.getAllUsers
);

// user isActive update
router.patch(
  "/users/:id",
  auth,
  adminOnly,
  AdminController.updateUserStatus
);

export default router;
