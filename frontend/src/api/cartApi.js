import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/cart`; // ✅ Correct way for Vite

export const getCartItems = async (token) => {
  try {
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log(
      "API Response from /cart:",
      JSON.stringify(response.data, null, 2),
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching cart:",
      error.response?.data || error.message,
    );
    return { cart: { items: [] } }; // Return a default empty cart
  }
};

export const removeCartItem = async (itemId, token) => {
  try {
    await axios.delete(`${API_URL}/remove/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch (error) {
    console.error(
      "Error removing item:",
      error.response?.data || error.message,
    );
    return false;
  }
};
