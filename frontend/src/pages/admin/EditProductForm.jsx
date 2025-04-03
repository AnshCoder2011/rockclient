import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await fetch(
          `http://localhost:5000/api/admin/items/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/items/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        },
      );

      if (!response.ok) throw new Error("Failed to update product");

      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111]">
      <div className="bg-[#1a1a1a] bg-opacity-80 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Edit Product
        </h2>

        {error && (
          <div className="bg-red-900 text-red-200 p-3 rounded-lg text-center mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 outline-none"
              placeholder="Product Name"
              required
            />
          </div>

          <div className="relative">
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 outline-none"
            >
              <option value="hats">Hats</option>
              <option value="capes">Capes</option>
              <option value="wings">Wings</option>
              <option value="bandanas">Bandanas</option>
              <option value="rcoins">RCoins</option>
              <option value="skins">Skins</option>
            </select>
          </div>

          <div className="relative">
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 outline-none"
              placeholder="Price"
              required
            />
          </div>

          <div className="relative">
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className="w-full px-4 py-3 text-white bg-gray-800 rounded-xl border border-gray-600 focus:border-purple-500 focus:ring focus:ring-purple-500 outline-none"
              placeholder="Image URL"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-lg font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition duration-300 ease-in-out shadow-md transform hover:scale-105"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
