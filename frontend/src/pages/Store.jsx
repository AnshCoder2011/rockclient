import React, { useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SubNav from "../components/SubNav";
import ModernGlowButton from "../components/ModernGlowButton";
import Testimonials from "../components/Testimonials";
import { FaArrowRight } from "react-icons/fa";
import DownloadBanner from "../components/DownloadBanner";
import EmailForm from "./EmailForm";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const categoriesRef = useRef(null);
  const navigate = useNavigate();

  // Function to scroll to the categories section
  const scrollToCategories = () => {
    categoriesRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (categoryName) => {
    const formattedCategory = categoryName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    navigate(`/items/${formattedCategory}`);
  };

  return (
    <div className="text-[#eaeaea] w-full min-h-screen bg-[#111] flex flex-col">
      <Navbar />
      {/* Hero Section */}
      <div className="relative flex-grow flex flex-col lg:flex-row items-center justify-between px-6 lg:px-10 pt-20 lg:pt-40">
        {/* Left Side - Image */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center lg:justify-start"
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          <img
            src="/images/storepic.png"
            alt="Minecraft Store Character"
            className="w-[90%] md:w-[80%] lg:w-[60%] drop-shadow-2xl hover:drop-shadow-3xl transition-all duration-300"
          />
        </motion.div>

        {/* Right Side - Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-10 lg:mt-0">
          <div className="text-center lg:text-left">
            <h1 className="text-white text-4xl lg:text-5xl font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Explore Our Store
            </h1>
            <div className="w-14 h-1 bg-purple-500 mt-2 rounded-full mx-auto lg:mx-0"></div>
          </div>

          <br />
          <p className="text-lg lg:text-xl pt-4 pb-8">
            Welcome to our Minecraft client store, <br />
            where you can discover a vast array of mods, plugins, and <br />
            customizations to elevate your gaming experience.
          </p>

          {/* Call-to-Action Button */}
          <ModernGlowButton onClick={scrollToCategories} />
        </div>
      </div>
      {/* SubNav Section */}
      <div className="w-full">
        <SubNav />
      </div>
      {/* Featured Categories Section */}
      <div
        ref={categoriesRef}
        className="w-full px-6 lg:px-10 py-20 bg-[#181818]"
      >
        {/* Header */}
        <h2 className="text-white text-4xl lg:text-5xl mt-12 font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Featured Categories
        </h2>
        <div className="w-20 h-1 bg-purple-500 mx-auto mt-4 rounded-full mb-14"></div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { name: "Hats", image: "/images/hats.jpg" },
            { name: "Capes", image: "/images/capes.png" },
            { name: "Wings", image: "/images/wings.webp" },
            { name: "Bandanas", image: "/images/bandana's.jpg" },
            { name: "RCoins", image: "/images/rcoins.jpg" },
            { name: "Skins", image: "/images/skins.jpg" },
          ].map((category, index) => (
            <div
              key={index}
              className="relative bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-[6px_6px_12px_#131313,-6px_-6px_12px_#252525] transition-all duration-300 hover:shadow-[0px_10px_40px_rgba(128,0,128,0.5)] border border-[#292929] cursor-pointer group"
              onClick={() => handleCategoryClick(category.name)} // Add click handler
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-64 object-cover brightness-90 transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/10"></div>
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <h3 className="text-5xl font-bold text-white drop-shadow-lg">
                  {category.name}
                </h3>
                <FaArrowRight className="text-purple-400 text-4xl bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials Section */}
      <Testimonials />
      <DownloadBanner />
      <EmailForm />
      <Footer />
    </div>
  );
};

export default Store;
