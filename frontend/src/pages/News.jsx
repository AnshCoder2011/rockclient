import React from "react";
import { motion } from "framer-motion";

const newsData = [
  {
    id: 1,
    title: "New Minecraft Update Released!",
    description:
      "Experience new features, blocks, and mobs in the latest update.",
    image: "/images/news.jpg",
    date: "March 20, 2025",
  },
  {
    id: 2,
    title: "RockClient Exclusive Mods!",
    description:
      "Unlock exclusive performance-boosting mods only available on RockClient.",
    image: "/images/news2.jpg",
    date: "March 18, 2025",
  },
  {
    id: 3,
    title: "Minecraft Esports Tournament!",
    description:
      "Compete against top players for massive rewards in the upcoming event!",
    image: "/images/news3.jpg",
    date: "March 15, 2025",
  },
  {
    id: 3,
    title: "Minecraft Esports Tournament!",
    description:
      "Compete against top players for massive rewards in the upcoming event!",
    image: "/images/news4.webp",
    date: "March 15, 2025",
  },
  {
    id: 3,
    title: "Minecraft Esports Tournament!",
    description:
      "Compete against top players for massive rewards in the upcoming event!",
    image: "/images/news2.jpg",
    date: "March 15, 2025",
  },
];

const News = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-32 py-12">
      <h2 className="text-4xl font-bold text-center text-white mb-10 relative after:block after:w-16 after:h-1 after:bg-purple-500 after:mx-auto after:mt-2 md:block hidden">
        Latest News
      </h2>
      <div className="grid md:grid-cols-3 gap-8 mt-44 md:mt-0">
        {newsData.map((news) => (
          <motion.div
            key={news.id}
            className="bg-[#111] border border-purple-400/50 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:border-pink-500/70"
            whileHover={{ y: -5 }}
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <p className="text-sm text-gray-400">{news.date}</p>
              <h3 className="text-xl font-semibold text-white mt-2">
                {news.title}
              </h3>
              <p className="text-gray-300 mt-2">{news.description}</p>
              <button className="mt-4 text-purple-500 hover:text-pink-400 transition">
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default News;
