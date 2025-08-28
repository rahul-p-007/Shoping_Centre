import epxress from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import productsRoutes from "./routes/products.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import paymentsRoutes from "./routes/payment.routes.js";
import couponRoutes from "./routes/coupon.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import path from "path";

import { connectDB } from "./db/connect/db_connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

const app = epxress();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(epxress.json({ limit: "10mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/analytics", analyticsRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(epxress.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB(app);
