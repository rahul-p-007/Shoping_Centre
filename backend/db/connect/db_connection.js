import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONOGO_DB_CONNECTION_STRING = process.env.MOGO_URI;
const PORT = process.env.PORT;
export const connectDB = async (app) => {
  try {
    await mongoose.connect(MONOGO_DB_CONNECTION_STRING, {
      dbName: "shopping_cetner",
    });
    app.listen(PORT, () => {
      console.log(`Sever is listening on the port ${PORT}`);
    });
    console.log("Database is connected successfully");
  } catch (error) {
    console.log("Database error");
    console.log(error.message);
    process.exit(1);
  }
};
