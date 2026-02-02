import express from "express";
import {
  updateProfile,
} from "./user.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = express.Router();

router.patch("/me", auth, updateProfile);


export default router;
