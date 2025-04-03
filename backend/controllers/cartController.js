import Cart from "../models/Cart.js";
import Item from "../models/Item.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { itemId } = req.body;

  try {
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    cart.items.push({
      item: itemId,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
    });

    await cart.save();
    res.status(200).json({ cart: { items: cart.items } }); // Fixed response
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove from Cart
export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (cartItem) => cartItem.item.toString() !== itemId,
    );
    await cart.save();

    res.json({ cart: { items: cart.items } }); // Fixed response
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Cart
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.item",
    );
    res.json({ cart: { items: cart?.items || [] } }); // Fixed response
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
