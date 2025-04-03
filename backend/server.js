import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";
import cartRoutes from "./routes/cart.js";
import itemRoutes from "./routes/itemRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

// 1. Database Connection
connectDB();

// 2. Middleware Setup
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

// 4. Route Registration
app.use("/auth", authRoutes);
app.use("/cart", cartRoutes);
app.use("/items", itemRoutes);
app.use("/api/admin", adminRoutes);

// 5. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
