import { Router } from "express";
import { auth, providerOnly } from "../../middlewares/auth.middleware";
import * as ProviderController from "../provider/provider.controller"

const router = Router();


// Provider profile create (ONE TIME)
router.post(
  "/profile",
  auth,
  providerOnly,
  ProviderController.createProviderProfile
);

// Add meal
router.post(
  "/meals",
  auth,
  providerOnly,
  ProviderController.addMeal
);

export default router;
