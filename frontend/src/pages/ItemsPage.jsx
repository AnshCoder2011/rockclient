import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ItemsPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    if (!categoryName) return;

    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/items/category/${categoryName}`,
        );
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching items:", error);
        toast.error("Failed to load items");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [categoryName]);

  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to add items");
        return;
      }

      await axios.post(
        "http://localhost:5000/cart/add",
        { itemId: item._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success(`${item.name} added to cart!`, {
        position: "bottom-right",
        className: "bg-purple-900 text-white",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add item");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* Hero Section */}
      <div className="relative h-72 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: 'url("/images/banner2.webp")',
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backgroundBlendMode: "multiply",
          }}
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-center text-white mb-10 relative after:block after:w-16 after:h-1 after:bg-purple-500 after:mx-auto after:mt-2 md:mt-4 sm:mt-6">
            {categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1)}
          </h1>
        </div>
      </div>

      {/* Items Grid */}
      <div className="container mx-auto px-10 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded-xl p-4 animate-pulse h-96"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-2xl text-gray-400">No items found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <div
                key={item._id}
                className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300"
                onMouseEnter={() => setHoveredItem(item._id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Image with hover zoom effect */}
                <div className="relative overflow-hidden h-60 cursor-pointer">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      hoveredItem === item._id ? "scale-110" : "scale-100"
                    }`}
                    onError={(e) => (e.target.src = "/placeholder-item.png")}
                  />
                </div>

                {/* Item Info */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-white truncate">
                    {item.name}
                  </h3>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-2xl font-bold text-purple-400">
                      ${item.price}
                    </span>
                    <button
                      onClick={() => addToCart(item)}
                      className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg 
                                 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300
                                 before:absolute before:inset-0 before:bg-white before:opacity-0 hover:before:opacity-10
                                 active:scale-95"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ItemsPage;
