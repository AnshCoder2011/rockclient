import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mojangId: { type: String, required: true, unique: true }, // Unique identifier for each user
  cart: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item" }, // Reference to the Item model
      name: { type: String, required: true }, // Store item name directly for quick access
      price: { type: Number, required: true }, // Store price to avoid extra DB queries
      imageUrl: String, // Image URL from cloud storage
    },
  ],
});

export default mongoose.model("User", userSchema);
