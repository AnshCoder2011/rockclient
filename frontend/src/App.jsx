import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import LandingPage from "./pages/LandingPage";
import MouseSmokeEffect from "./components/MouseSmokeEffect";
import Login from "./pages/Login";
import Store from "./pages/Store";
import EmailForm from "./pages/EmailForm";
import Cart from "./pages/Cart";
import ItemsPage from "./pages/ItemsPage";
import PrivateRoute from "./routes/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import NewProductForm from "./pages/admin/NewProductForm";
import EditProductForm from "./pages/admin/EditProductForm";

export default function App() {
  return (
    <Router>
      {/* Background Blur Effect */}

      {/* Mouse Smoke Effect */}
      <MouseSmokeEffect />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/store" element={<Store />} />
        <Route path="/contact" element={<EmailForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/items/:categoryName" element={<ItemsPage />} />
        {/* Protected Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/products/new" element={<NewProductForm />} />
        <Route path="/admin/products/edit/:id" element={<EditProductForm />} />
        <Route element={<PrivateRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>

      {/* ToastContainer for notifications */}
      <ToastContainer
        position="bottom-right" // Position of the toast
        autoClose={3000} // Auto-close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // New toasts appear below older ones
        closeOnClick // Close toast on click
        rtl={false} // Left-to-right layout
        pauseOnFocusLoss // Pause toast timer when window loses focus
        draggable // Allow dragging to dismiss
        pauseOnHover // Pause toast timer on hover
      />
    </Router>
  );
}
