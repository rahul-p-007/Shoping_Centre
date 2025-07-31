import epxress from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./db/connect/db_connection.js";
import cookieParser from "cookie-parser";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = epxress();

app.use(epxress.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

connectDB(app);
