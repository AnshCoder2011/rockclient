import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import React from "react";

function SmokeEffect({ color = "#ffffff", particlesPerEmit = 3 }) {
  const [particles, setParticles] = useState([]);

  const createParticle = useCallback(
    (x, y) => ({
      id: crypto.randomUUID(), // Generates a unique ID
      x,
      y,
      angle: Math.random() * Math.PI * 2, // Random angle
      speed: Math.random() * 1.5 + 0.5, // Smooth speed
      size: Math.random() * 10 + 5, // Particle size
      opacity: Math.random() * 0.3 + 0.2,
    }),
    [],
  );

  const emitParticles = useCallback(
    (x, y) => {
      const newParticles = Array.from({ length: particlesPerEmit }, () =>
        createParticle(x, y),
      );

      setParticles((prev) => [...prev, ...newParticles]);

      setTimeout(() => {
        setParticles((prev) =>
          prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
        );
      }, 1000);
    },
    [createParticle, particlesPerEmit],
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      emitParticles(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [emitParticles]);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[1000]">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id} // Ensures unique keys
            className="absolute rounded-full blur-md"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: particle.opacity,
            }}
            animate={{
              x: particle.x + Math.cos(particle.angle) * 100 * particle.speed,
              y: particle.y + Math.sin(particle.angle) * 100 * particle.speed,
              scale: 1.5,
              opacity: 0,
            }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: color,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function MouseSmokeEffect() {
  return <SmokeEffect />;
}
