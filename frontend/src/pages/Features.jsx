import { motion } from "framer-motion";
import { useState } from "react";
import { FaRocket, FaMagic, FaShieldAlt } from "react-icons/fa";
import React from "react";

const features = [
  {
    icon: <FaRocket />,
    title: "Lightning Fast Speed",
    description:
      "Experience blazing fast performance with our optimized technology.",
  },
  {
    icon: <FaMagic />,
    title: "Enchanting UI",
    description:
      "Our sleek and modern UI enhances user experience like never before.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Top-Notch Security",
    description:
      "Your data is protected with industry-leading security measures.",
  },
];

const FeatureCard = () => {
  return (
    <div className="flex flex-col h-[75vh] pt-30 justify-center gap-8 p-10 bg-[#111] text-white">
      <h2 className="hidden sm:block text-2xl sm:text-4xl font-bold text-center text-white mb-10 relative after:block after:w-16 after:h-1 after:bg-purple-500 after:mx-auto after:mt-2 md:mt-4 sm:mt-6">
        Features Provided by Us
      </h2>

      <div className="flex flex-wrap justify-center gap-8 mt-24 sm:mt-0">
        {features.map((feature, index) => (
          <TiltCard key={index} feature={feature} />
        ))}
      </div>
    </div>
  );
};

const TiltCard = ({ feature }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <>
      <motion.div
        className="feature-card"
        onMouseMove={handleMouseMove}
        style={{
          transform: `rotateY(${mousePosition.x * 15}deg) rotateX(${
            mousePosition.y * -15
          }deg)`,
        }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="card-border"></div>
        <motion.div
          className="icon-container"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          {feature.icon}
        </motion.div>
        <h3 className="text-xl font-bold text-center mt-4">{feature.title}</h3>
        <p className="text-gray-400 text-center px-4 mt-2">
          {feature.description}
        </p>
        <div className="shiny-effect"></div>
      </motion.div>
    </>
  );
};

export default FeatureCard;
