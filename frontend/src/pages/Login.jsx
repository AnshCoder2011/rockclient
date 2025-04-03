import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleMinecraftLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh

    if (!username.trim()) {
      toast.error("Please enter a valid Minecraft username.");
      return;
    }

    try {
      console.log("🔹 Sending request to backend...");

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      console.log("🔹 Response Status:", response.status);

      const data = await response.json();
      console.log("🔹 Full Response Data:", data);

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ Store both user details and JWT token in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token); // 🔹 Store the token

      console.log("✅ Login Successful! Token Stored:", data.token);
      toast.success(`Welcome ${username} to RockClient!`);

      // ✅ Navigate to home page after successful login
      navigate("/");
    } catch (error) {
      console.error("❌ Login Failed:", error.message);
      toast.error(
        error.message || "Something went wrong. Please try again later.",
      );
    }
    console.log("Stored Token:", localStorage.getItem("token"));
    console.log("Stored User:", localStorage.getItem("user"));
  };

  return (
    <>
      <Navbar />
      <div className="flex mt-16 justify-center items-center min-h-screen bg-[#111] text-white">
        <div className="bg-[#1a1a1a] bg-opacity-90 p-8 rounded-2xl shadow-2xl border border-gray-800 w-96 backdrop-blur-lg">
          <div className="flex justify-center mb-6">
            <img
              src="/images/client_logo.png"
              alt="RockClient Logo"
              className="w-fit h-32"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-4">
            Minecraft Login
          </h2>
          <h2 className="font-bold text-sm text-red-400 text-center mb-4">
            Note: You will not be able to change your username once entered!
          </h2>
          <p className="text-sm font-thin text-zinc-300 text-center mb-4">
            Enter your Minecraft username to continue.
          </p>

          <form onSubmit={handleMinecraftLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Enter your Minecraft Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-center text-white"
            />
            <button
              type="submit"
              className="w-full py-3 border-2 border-purple-700 bg-transparent hover:bg-zinc-800 rounded-full text-white font-semibold transition shadow-md"
            >
              Login
            </button>
          </form>

          {error && (
            <p className="text-red-500 text-sm text-center mt-2">{error}</p>
          )}
        </div>
      </div>

      <ToastContainer />
      <Footer />
    </>
  );
};

export default Login;
