import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  checkout_success,
  createCheckoutSession,
} from "../controllers/payment.controller.js";
const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, checkout_success);

export default router;
