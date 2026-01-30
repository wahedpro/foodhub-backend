import { Router } from "express";
import { auth } from "../../middlewares/auth.middleware";
import * as OrderController from "./order.controller";

const router = Router();

// create new order (customer)
router.post("/", auth, OrderController.createOrder);

// get user's orders
router.get("/", auth, OrderController.getMyOrders);

export default router;
