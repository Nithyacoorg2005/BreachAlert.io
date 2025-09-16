import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fetch from "node-fetch";


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
router.post("/breach-check", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const response = await fetch("https://leakinsight-api.p.rapidapi.com/api/v1/breach-lookup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.LEAKINSIGHT_API_KEY,
        "X-RapidAPI-Host": "leakinsight-api.p.rapidapi.com"
      },
      body: JSON.stringify({ email })
    });

    const text = await response.text(); // first get raw text
    console.log("LeakInsight raw:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      return res.status(500).json({ error: "Invalid JSON from LeakInsight", raw: text });
    }

    res.json(data);
  } catch (err) {
    console.error("BreachCheck error:", err);
    res.status(500).json({ error: "Failed to check breach" });
  }
});

export default router;
