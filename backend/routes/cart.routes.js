import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  addToCart,
  getCartProduct,
  removeAllProductsFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
const router = express.Router();

router.get("/", protectRoute, getCartProduct);
router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllProductsFromCart);
router.put("/:id", protectRoute, updateQuantity);

export default router;
