import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          navigate("/admin/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/admin/items", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Total Products</h3>
                <p className="text-2xl font-bold">{items.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Categories</h3>
                <p className="text-2xl font-bold">6</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Inventory Value</h3>
                <p className="text-2xl font-bold">
                  ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        );
      case "products":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">All Products</h2>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => navigate("/admin/products/new")}
              >
                Add New Product
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900 text-red-200 p-4 rounded">
                Error: {error}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-700">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="border border-gray-700 px-4 py-2">Name</th>
                      <th className="border border-gray-700 px-4 py-2">
                        Category
                      </th>
                      <th className="border border-gray-700 px-4 py-2">
                        Price
                      </th>
                      <th className="border border-gray-700 px-4 py-2">
                        Image
                      </th>
                      <th className="border border-gray-700 px-4 py-2">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length > 0 ? (
                      items.map((item) => (
                        <tr
                          key={item._id}
                          className="bg-gray-800 hover:bg-gray-750"
                        >
                          <td className="border border-gray-700 px-4 py-2">
                            {item.name}
                          </td>
                          <td className="border border-gray-700 px-4 py-2 capitalize">
                            {item.category}
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            ${item.price}
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="h-12 w-12 object-cover mx-auto"
                            />
                          </td>
                          <td className="border border-gray-700 px-4 py-2">
                            <div className="flex space-x-2 justify-center">
                              <button
                                onClick={() =>
                                  navigate(`/admin/products/edit/${item._id}`)
                                }
                                className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-4">
                          No items found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case "orders":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Orders</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p>Orders management will be implemented here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        `http://localhost:5000/api/admin/items/${itemId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      console.error("Error deleting item:", error);
      setError(error.message);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "dashboard" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            Orders
          </button>
        </nav>
        <button
          onClick={logout}
          className="mt-auto bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-center"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderTabContent()}</div>
    </div>
  );
};

export default AdminDashboard;
