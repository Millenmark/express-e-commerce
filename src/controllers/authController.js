import User from "../models/User.js";
import { attachCookiesToResponse } from "../utils/jwt.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isFirstUser = (await User.countDocuments({})) === 0;
  const role = isFirstUser ? "admin" : "user";

  if (await User.findOne({ email }))
    return res.status(400).json({ message: "Email already used" });

  const user = await User.create({ name, email, password, role });

  attachCookiesToResponse(res, {
    name: user.name,
    userId: user._id,
    role: user.role,
  });

  res.status(201).json({ message: "User created successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: "Invalid Credentials" });

  if (!(await user.comparePassword(password)))
    return res.status(401).json({ message: "Invalid Credentials" });

  attachCookiesToResponse(res, {
    name: user.name,
    userId: user._id,
    role: user.role,
  });

  res.status(201).json({ message: "Log in successful" });
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ message: "Log out successful" });
};
