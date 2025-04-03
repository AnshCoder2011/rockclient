import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import fetch from "node-fetch";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // ✅ Fetch UUID from Mojang API
    const response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`,
    );
    const mojangData = await response.json();

    if (!mojangData || !mojangData.id || !mojangData.name) {
      return res.status(404).json({ message: "Invalid Minecraft username" });
    }

    console.log("✅ Mojang API Data:", mojangData);

    // ✅ Check if user exists using `mojangId` (UUID)
    let user = await User.findOne({ mojangId: mojangData.id });

    if (!user) {
      console.log("🟡 User not found in MongoDB, creating new entry...");

      user = new User({
        username: mojangData.name,
        mojangId: mojangData.id, // Store UUID properly
      });

      await user.save();
    }

    // ✅ Generate JWT Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    console.log("🟢 Generated Token:", token);

    // ✅ Return the user object with JWT token
    res.json({
      message: `Welcome ${user.username} to RockClient!`,
      user: { _id: user._id, username: user.username },
      token, // Send JWT token to frontend
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

export default router;
