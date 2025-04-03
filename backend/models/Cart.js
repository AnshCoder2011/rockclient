import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
      name: String,
      price: Number,
      imageUrl: String,
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
