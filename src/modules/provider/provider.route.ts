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

// Update Meal
router.put(
  "/meals/:id",
  auth,
  providerOnly,
  ProviderController.updateMeal
);



export default router;
