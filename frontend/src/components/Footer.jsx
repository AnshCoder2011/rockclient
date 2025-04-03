import React, { useState, useEffect } from "react";
import { FaTwitter, FaYoutube, FaCommentDots } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  // Show the "Back to Top" button when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-20 pb-12 overflow-hidden">
      {/* Animated Wave Background */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-[60px] w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#111"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,192C384,203,480,245,576,261.3C672,277,768,267,864,234.7C960,203,1056,149,1152,128C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo Section */}
        <div className="flex justify-center mb-8 transform transition-transform duration-300 hover:scale-105 hover:rotate-2">
          <img
            src="/images/client_logo.png"
            alt="RockClient Logo"
            className="w-40 h-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300"
          />
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-400 text-sm mb-8">
          {["Home", "Download", "Store", "Support"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:text-purple-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:underline"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Glowing Gradient Line */}
        <div className="h-[3px] w-48 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 animate-pulse mx-auto my-8 rounded-full"></div>

        {/* Description */}
        <p className="text-gray-500 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          RockClient is a next-gen Minecraft client, offering high-performance
          optimizations, mod support, and an intuitive interface to enhance your
          gaming experience.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-8 text-gray-400 text-2xl mb-6">
          {[
            { icon: <FaCommentDots />, link: "#" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaYoutube />, link: "#" },
          ].map((social, index) => (
            <a
              key={index}
              href={social.link}
              className="hover:text-purple-400 transition-all duration-300 hover:scale-125 hover:drop-shadow-lg hover:rotate-12"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-gray-600 text-xs mt-6">
          © {new Date().getFullYear()} RockClient. All rights reserved.
        </p>
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 opacity-90 animate-bounce"
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
