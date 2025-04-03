import express from "express";
import Item from "../models/Item.js"; // Ensure the file has .js extension in imports

const router = express.Router();

// GET items by category
router.get("/category/:categoryName", async (req, res) => {
  try {
    const category = req.params.categoryName;
    const items = await Item.find({ category: category });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items", error });
  }
});

export default router;
