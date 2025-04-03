import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["hats", "capes", "wings", "bandanas", "rcoins", "skins"],
    required: true,
  },
  imageUrl: { type: String, required: true }, // Cloud storage URL
});

export default mongoose.model("Item", itemSchema);
