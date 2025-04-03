import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiLogIn, FiLoader, FiAlertCircle } from "react-icons/fi";

const AdminLogin = () => {
  const [email, setEmail] = useState("admin@rockclient.com");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/admin/login",
        { email, password },
        { timeout: 5000 }, // 5-second timeout
      );

      localStorage.setItem("adminToken", data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                RockClient Admin
              </h1>
              <p className="text-gray-400">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-900/50 text-red-200 px-4 py-3 rounded-lg mb-6">
                <FiAlertCircle className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-medium ${
                    isLoading
                      ? "bg-purple-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } text-white transition-colors`}
                >
                  {isLoading ? (
                    <>
                      <FiLoader className="animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <>
                      <FiLogIn />
                      Login
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="px-8 py-4 bg-gray-900/50 text-center">
            <p className="text-gray-400 text-sm">
              Having trouble? Contact support@rockclient.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
