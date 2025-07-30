import epxress from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./db/connect/db_connection.js";
dotenv.config();
const app = epxress();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

connectDB(app);
