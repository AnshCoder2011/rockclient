import React from "react";
import { useNavigate } from "react-router-dom";

const SubNav = () => {
  const navigate = useNavigate();

  const handleSubNavClick = (categoryName) => {
    navigate(`/items/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="bg-[#111] text-white -mt-3 pb-8 overflow-hidden">
      {/* Glassmorphism Container */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div
          className="flex justify-center lg:justify-center bg-white/8 backdrop-blur-lg rounded-full p-3 shadow-2xl border border-white/20 
                        w-fit mx-auto mt-5 whitespace-nowrap space-x-4 lg:space-x-6 px-4 lg:px-8"
        >
          {["Hats", "Capes", "Wings", "Bandana's", "RCoins", "Skins"].map(
            (item) => (
              <button
                key={item}
                onClick={() => handleSubNavClick(item)}
                className="text-gray-300 cursor-pointer px-4 py-2 rounded-full transition-all duration-300 
                        hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 
                        hover:text-purple-400 hover:scale-110 hover:shadow-lg focus:outline-none"
              >
                {item}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default SubNav;
