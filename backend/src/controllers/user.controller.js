import { User } from "../models/user.model.js";

function publicUser(user) {
  return { id: user._id, username: user.username, email: user.email };
}

export async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Username, email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();
    const existing = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existing) {
      return res.status(409).json({ message: "A user with that email or username already exists" });
    }

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password,
    });

    return res.status(201).json({ message: "User registered successfully", user: publicUser(user) });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    return res.status(200).json({ message: "User logged in successfully", user: publicUser(user) });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export function logoutUser(_req, res) {
  // This beginner project does not create a session or token, so logout only
  // acknowledges the request. Real authentication would invalidate a session/token.
  return res.status(200).json({ message: "Logout successful" });
}
