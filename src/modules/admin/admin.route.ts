import { Router } from "express";
import { adminOnly, auth } from "../../middlewares/auth.middleware";
import * as AdminController from "./admin.controller";

const router = Router();

router.get(
  "/users",
  auth,
  adminOnly,
  AdminController.getAllUsers
);

export default router;
