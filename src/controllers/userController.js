import mongoose from "mongoose";
import User from "../models/User.js";
import { attachCookiesToResponse } from "../utils/jwt.js";
import { checkPermissions } from "../utils/permissions.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({ users });
};

export const getSingleUser = async (req, res) => {
  const { id: userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId))
    return res.status(404).json({ message: "Not Found" });

  const user = await User.findById(userId).select("-password");

  if (!user) return res.status(404).json({ message: "Not Found" });

  if (!checkPermissions(req.user, user._id))
    return res.status(401).json({ message: "Who you" });

  res.status(200).json({ user });
};

export const showCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const updateUser = async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true }
  );

  attachCookiesToResponse(res, {
    name: user.name,
    userId: user._id,
    role: user.role,
  });

  res.status(200).json({ message: "User updated sucessfully" });
};

export const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect)
    return res.status(401).json({ message: "Old password is incorrect" });

  user.password = newPassword;

  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};
