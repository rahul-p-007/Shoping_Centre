import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  getfeaturedproducts,
  getProductsByCategory,
  getRecommendationsProducts,
  toggleFeaturedProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllproducts);
router.get("/featured", getfeaturedproducts);
router.get("/category/:category", getProductsByCategory);
router.get("/recommendations", getRecommendationsProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);
export default router;
