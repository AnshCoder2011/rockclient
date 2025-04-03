import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import Buttons from "./Buttons";
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillLinkedin,
} from "react-icons/ai";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  return (
    <nav className="fixed top-0 left-0 w-full px-6 lg:px-20 py-4 flex h-28 justify-between items-center bg-[#111111cc] backdrop-blur-lg z-50">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img
          loading="lazy"
          src="/images/client_logo.png"
          alt="RockClient Logo"
          className="w-auto h-12 md:h-20 max-w-[140px] md:max-w-[200px]"
        />
      </a>

      {/* Desktop Menu */}

      <div className="hidden md:flex items-center gap-8 tracking-widest text-sm font-semibold uppercase">
        <Link
          to="/"
          className="relative text-[#eaeaea] transition duration-300 hover:text-[#8A2BE2] after:block after:w-0 after:h-[2px] after:bg-[#8A2BE2] after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
        >
          Home
        </Link>
        <Link
          to="/contact"
          className="relative text-[#eaeaea] transition duration-300 hover:text-[#8A2BE2] after:block after:w-0 after:h-[2px] after:bg-[#8A2BE2] after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
        >
          Contact us
        </Link>
        {[
          { name: "Features", tooltip: "Scroll down to discover features" },
          { name: "News", tooltip: "Scroll down, check latest News" },
        ].map((item, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setTooltip(item.tooltip || null)}
            onMouseLeave={() => setTooltip(null)}
          >
            <motion.a
              href="#"
              className="relative text-[#eaeaea] transition duration-300 hover:text-[#8A2BE2] after:block after:w-0 after:h-[2px] after:bg-[#8A2BE2] after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
            >
              {item.name}
            </motion.a>

            {/* Tooltip - Appears Below the Link */}
            <AnimatePresence>
              {tooltip === item.tooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 10 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full mt-2 px-3 py-2 text-sm text-white bg-[#222] rounded-lg shadow-md"
                >
                  {tooltip}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Store Link */}
        <Link
          to="/store"
          className="relative text-[#eaeaea] transition duration-300 hover:text-[#8A2BE2] after:block after:w-0 after:h-[2px] after:bg-[#8A2BE2] after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
        >
          Store
        </Link>

        {/* Socials Dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <motion.a
            href="#"
            className="relative text-[#eaeaea] transition duration-300 hover:text-[#8A2BE2] after:block after:w-0 after:h-[2px] after:bg-[#8A2BE2] after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
          >
            Socials
          </motion.a>

          {/* Animated Dropdown */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-8 left-1/2 transform -translate-x-1/2 w-48 bg-[#222] shadow-lg flex flex-col items-start py-3 rounded-lg"
              >
                {[
                  {
                    name: "Instagram",
                    icon: AiFillInstagram,
                    link: "https://www.instagram.com/rockclient",
                  },
                  {
                    name: "Twitter",
                    icon: AiFillTwitterCircle,
                    link: "https://www.twitter.com/rockclient",
                  },
                  {
                    name: "Facebook",
                    icon: AiFillFacebook,
                    link: "https://www.facebook.com/rockclient",
                  },
                  {
                    name: "LinkedIn",
                    icon: AiFillLinkedin,
                    link: "https://www.linkedin.com/company/rockclient",
                  },
                ].map((social, index) => (
                  <a
                    key={index.id}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full px-4 py-2 text-[#eaeaea] hover:bg-[#8A2BE2] hover:text-white transition rounded-md"
                  >
                    <social.icon size={20} className="mr-2" />
                    {social.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Buttons />
      </div>

      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#8A2BE2] transition hover:shadow-lg"
      >
        {isOpen ? (
          <X size={24} color="#eaeaea" />
        ) : (
          <Menu size={24} color="#eaeaea" />
        )}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 w-full bg-[#111] shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden"
          >
            <Link
              to="/"
              className="text-[#eaeaea] hover:text-[#8A2BE2] transition"
            >
              Home
            </Link>
            <Link
              to="/contact"
              className="text-[#eaeaea] hover:text-[#8A2BE2] transition"
            >
              Contact us
            </Link>
            {["Features", "News"].map((item, index) => (
              <a
                key={index}
                href="#"
                className="text-[#eaeaea] hover:text-[#8A2BE2] transition"
              >
                {item}
              </a>
            ))}

            {/* Mobile Store Link */}
            <Link
              to="/store"
              className="text-[#eaeaea] hover:text-[#8A2BE2] transition"
            >
              Store
            </Link>

            <Buttons />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
