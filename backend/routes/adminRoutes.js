import express from "express";
import { adminLogin } from "../controllers/adminController.js";
import {
  createItem,
  updateItem,
  deleteItem,
  getAllItems,
  getItemById, // ✅ Import getItemById
} from "../controllers/adminController.js";
import { adminProtect } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Admin Login
router.post("/login", adminLogin);

// ✅ Admin Item Routes
router.get("/items", adminProtect, getAllItems);
router.get("/items/:id", adminProtect, getItemById); // ✅ Fix: Add this route
router.post("/items/new", adminProtect, createItem);
router.put("/items/:id", adminProtect, updateItem);
router.delete("/items/:id", adminProtect, deleteItem);

export default router;
