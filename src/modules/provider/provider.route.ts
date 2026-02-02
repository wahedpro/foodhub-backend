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

// Delete Meal
router.delete(
  "/meals/:id",
  auth,
  providerOnly,
  ProviderController.deleteMeal
);

// // update the Order status
// router.patch(
//   "/orders/:id",
//   auth,
//   providerOnly,
//   ProviderController.updateOrderStatus
// );

router.get(
  "/orders",
  auth,
  providerOnly,
  ProviderController.getIncomingOrders
);

router.patch(
  "/orders/:id/status",
  auth,
  providerOnly,
  ProviderController.updateOrderStatus
);

router.get(
  "/dashboard-stats",
  auth,
  providerOnly,
  ProviderController.getDashboardStats
);


export default router;
