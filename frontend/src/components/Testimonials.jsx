import { FaStar } from "react-icons/fa";
import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      review: "Amazing store! The mods are top-notch.",
      rating: 5,
      avatar: "/images/creeper.png",
    },
    {
      name: "Jane Smith",
      review: "Great selection of cosmetics and pets.",
      rating: 4,
      avatar: "/images/head.png",
    },
    {
      name: "Alex Johnson",
      review: "Highly recommend this store for Minecraft fans!",
      rating: 5,
      avatar: "/images/head2.png",
    },
  ];

  return (
    <div className="w-full px-6 lg:px-10 py-20 bg-[#181818]">
      {/* Heading */}
      <h2 className="text-white text-3xl lg:text-4xl font-bold text-center mt-5">
        What Our Users Say
      </h2>
      <div className="w-14 h-1 bg-purple-500 mx-auto mt-2 rounded-full mb-20"></div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="relative bg-[#1e1e1e] rounded-xl p-6 shadow-[6px_6px_12px_#131313,-6px_-6px_12px_#252525] transition-all duration-300 hover:shadow-[4px_4px_8px_#131313,-4px_-4px_8px_#252525] border border-[#292929]"
          >
            {/* User Avatar */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full border-4 border-purple-500 shadow-md"
              />
            </div>

            <div className="pt-8 text-center">
              {/* Star Ratings */}
              <div className="flex justify-center mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={`text-lg ${
                      i < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-500"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-300 italic">"{testimonial.review}"</p>

              {/* User Name */}
              <p className="text-white font-semibold mt-4">
                {testimonial.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
