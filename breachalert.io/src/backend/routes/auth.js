import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// ✅ Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(200).json({ 
      msg: "Signup successful ✅", 
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("🔥 Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials ❌" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      msg: "Login successful ✅",
      token,
      user: { username: user.username, email: user.email }
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
