import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js"; // ✅ Ensure only logged-in users access

const router = express.Router();

// Routes
router.post("/add", protect, addToCart); // ✅ Add item to cart
router.delete("/remove/:itemId", protect, removeFromCart); // ✅ Remove item
router.get("/", protect, getCart); // ✅ Get all cart items

export default router;
