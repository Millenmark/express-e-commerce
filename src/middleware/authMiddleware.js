import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { isTokenValid } from "../utils/jwt.js";

export const verifyToken = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const { userId } = isTokenValid(token);
    req.user = await User.findById(userId).select("-password");
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  return next();
};

export const authorizedPermissions =
  (...roles) =>
  (req, res, next) => {
    const { role } = req.user;

    if (!roles.includes(role))
      return res.status(403).json({ message: "Forbidden" });

    next();
  };
