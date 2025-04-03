import { useEffect, useState } from "react";
import { getCartItems, removeCartItem } from "../api/cartApi";
import CartItem from "../components/CartItem";
import { toast } from "react-toastify";
import { FiTruck, FiShoppingBag } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const { cart } = await getCartItems(token);
        console.log("Cart Data:", cart);
        setCartItems(cart?.items?.filter((item) => item?.item) || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart");
      }
      setLoading(false);
    };
    fetchCart();
  }, [token]);

  const handleRemove = async (itemId, itemName) => {
    try {
      const success = await removeCartItem(itemId, token);
      console.log("Remove Item Response:", success);

      if (success) {
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item?.item?._id !== itemId),
        );
        toast.success(`${itemName} removed from cart!`, {
          style: {
            background: "#4C1D95",
            color: "#E9D5FF",
          },
        });
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item?.item?.price || 0),
    0,
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 px-10 text-white pt-28">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-2 text-purple-300 flex items-center gap-3">
            <FiShoppingBag className="inline" /> Your Cart
          </h1>
          <p className="text-gray-400 mb-8">Review and checkout your items</p>

          {loading ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 rounded-xl p-6 h-40 animate-pulse"
                  />
                ))}
              </div>
              <div className="bg-gray-800 rounded-xl p-6 h-64 animate-pulse" />
            </div>
          ) : cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item, index) => (
                  <div
                    key={item?.item?._id || index}
                    className="group bg-gray-800 cursor-pointer rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 border border-gray-700 hover:border-purple-900/50"
                  >
                    {item?.item ? (
                      <CartItem item={item.item} onRemove={handleRemove} />
                    ) : (
                      <p>Invalid item</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-bold mb-6 text-purple-300 border-b border-gray-700 pb-4">
                    Order Summary
                  </h2>
                  <div className="flex items-center gap-3 bg-purple-900/30 p-3 rounded-lg mb-6 border border-purple-800/50">
                    <FiTruck className="text-2xl text-purple-400" />
                    <div>
                      <p className="font-medium text-purple-100">
                        FREE Shipping
                      </p>
                      <p className="text-sm text-purple-300">
                        Instant Secure Delivery
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping</span>
                      <span className="text-green-400">FREE</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-purple-300">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r cursor-pointer from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 active:scale-[0.98]">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8">
                <h3 className="text-xl font-medium text-gray-300 mt-4">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mt-2">
                  Looks like you haven't added anything to your cart yet
                </p>
                <button className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors duration-300">
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
