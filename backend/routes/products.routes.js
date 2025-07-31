import express from "express";
import {
  createProduct,
  getAllproducts,
  getfeaturedproducts,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllproducts);
router.get("/featured", getfeaturedproducts);
router.post("/", protectRoute, adminRoute, createProduct);
export default router;
