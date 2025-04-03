import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Buttons() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status when the component loads
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsSignedIn(!!user); // Convert user value to boolean
  }, []);

  return (
    <div className="flex gap-4">
      {/* Cart Button (Always Visible) */}
      <Link
        to={"/cart"}
        type="button"
        className="py-3 px-4 gap-3 cursor-pointer inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
      >
        Cart
        <svg
          className="shrink-0 size-4"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 11 4-7" />
          <path d="m19 11-4-7" />
          <path d="M2 11h20" />
          <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4" />
          <path d="m9 11 1 9" />
          <path d="M4.5 15.5h15" />
          <path d="m15 11-1 9" />
        </svg>
      </Link>

      {/* Conditionally Render Login or Logout Button */}
      <Link
        to={"/login"}
        className="relative py-3 px-6 inline-flex cursor-pointer items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 
          bg-gray-800/50 text-white shadow-lg backdrop-blur-md transition-all duration-300 
          hover:bg-gray-700/60 hover:border-gray-400 hover:shadow-xl 
          active:scale-95 active:shadow-md"
      >
        Login Free
        <svg
          className="shrink-0 size-5 text-gray-300 transition-colors duration-300 group-hover:text-white"
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
