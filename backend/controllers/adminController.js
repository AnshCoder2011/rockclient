import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Admin } from "../models/Admin.js";
import Item from "../models/Item.js";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Handle missing email or password
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const admin = await Admin.findOne({ email });

  console.log("Admin Found:", admin); // ✅ Debugging

  if (!admin) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  console.log("Password Match:", isMatch); // ✅ Debugging

  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid credentials" });
  }

  // ✅ Token now includes admin ID
  const token = jwt.sign(
    { id: admin._id, isAdmin: true },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({
    message: "Login successful",
    token,
    admin: { id: admin._id, email: admin.email }, // ✅ Returning logged-in admin info
  });
};

// ✅ Fetch all items (Protected Route)
export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching items" });
  }
};

// ✅ Add a new item (Protected Route)
export const createItem = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debugging log

    const { name, category, price, imageUrl } = req.body;

    if (!name || !category || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new Item({ name, category, price, imageUrl });
    await newItem.save();

    res
      .status(201)
      .json({ message: "Product added successfully", item: newItem });
  } catch (error) {
    console.error("Error adding product:", error); // Log error details
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// ✅ Fetch a single item by ID
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Update an item (Protected Route)
export const updateItem = async (req, res) => {
  try {
    const { name, price, category, imageUrl } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, price, category, imageUrl },
      { new: true },
    );
    res.json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Error updating item" });
  }
};

// ✅ Delete an item (Protected Route)
export const deleteItem = async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item" });
  }
};
