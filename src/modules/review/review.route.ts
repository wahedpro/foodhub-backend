import express from "express";
import { createReview } from "./review.controller";
import { auth } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/", auth, createReview);

export default router;
