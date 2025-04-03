import React from "react";

const GlowButton = ({ onClick }) => {
  return (
    <button
      className="relative px-8 py-3 text-white text-lg cursor-pointer font-bold uppercase tracking-wider bg-transparent 
                 border-2 border-purple-500 rounded-xl overflow-hidden transition-all duration-300 
                 hover:bg-purple-500 hover:text-white hover:shadow-[0_0_20px_5px_rgba(192,132,252,0.6)] 
                 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      onClick={onClick}
    >
      {/* Button Text */}
      <span className="relative z-10">Shop Now</span>

      {/* Glow Effect */}
      <span
        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 
                   transition-opacity duration-300 hover:opacity-100"
        style={{
          zIndex: 1,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      ></span>
    </button>
  );
};

export default GlowButton;
