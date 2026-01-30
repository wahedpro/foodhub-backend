import { Router } from "express";
import * as ProviderPublicController from "./providerPublic.controller";

const router = Router();

// GET all providers (public)
router.get("/", ProviderPublicController.getAllProviders);
// GET provider with menu (public)
router.get("/:id", ProviderPublicController.getProviderById);

export default router;
