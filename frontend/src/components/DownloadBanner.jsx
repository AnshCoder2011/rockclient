import React from "react";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { motion } from "framer-motion";

export default function DownloadBanner() {
  return (
    <div className="relative w-full bg-[#111] text-white py-16 px-6 flex flex-col items-center text-center overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8A2BE2] to-[#4B0082] opacity-30 blur-xl"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-extrabold uppercase tracking-wide z-10"
      >
        Level Up Your Game
      </motion.h2>

      <p className="mt-4 text-lg md:text-xl text-gray-300 z-10">
        Download RockClient and enhance your Minecraft experience!
      </p>

      {/* Download Buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-4 z-10">
        {[
          {
            name: "Windows",
            icon: <FaWindows size={20} />,
            color: "bg-blue-600",
          },
          { name: "Mac", icon: <FaApple size={20} />, color: "bg-gray-800" },
          { name: "Linux", icon: <FaLinux size={20} />, color: "bg-green-600" },
        ].map((platform, index) => (
          <motion.a
            key={index}
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${platform.color} flex items-center px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 hover:brightness-125 shadow-lg`}
          >
            {platform.icon}{" "}
            <span className="ml-3">Download for {platform.name}</span>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
