import express from "express";
import {
  updateProfile,
  changePassword,
} from "./user.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = express.Router();

router.patch("/me", auth, updateProfile);
router.patch("/change-password", auth, changePassword);

export default router;
