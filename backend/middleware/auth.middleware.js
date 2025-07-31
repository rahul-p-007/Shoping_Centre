import jwt from "jsonwebtoken";
import User from "../db/models/user.models.js";
export const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(401).json({
        message: "Unauthorized - No access token found",
      });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) {
        res.stuatus(401).json({
          message: "User not found",
        });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Access token expired",
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          message: "Invalid access token",
        });
      }
      throw error;
    }
  } catch (error) {
    console.log("protect route error", error.message);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized - Not an admin",
    });
  }
};
