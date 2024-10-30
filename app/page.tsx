'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
  id: number;
  initialX: number;
  initialY: number;
  size: number;
  duration: number;
  delay: number;
}

export default function Page() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          initialX: Math.random() * 100,
          initialY: Math.random() * 100,
          size: Math.random() * 3 + 1,
          duration: Math.random() * 20 + 10,
          delay: Math.random() * -20,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0f1729] to-[#0a0f1d]">
      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.initialX}%`,
            top: `${star.initialY}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
            delay: star.delay,
          }}
        />
      ))}

      {/* Shooting stars */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={`shooting-star-${index}`}
          className="absolute h-[1px] w-[100px] bg-white"
          style={{
            rotate: "45deg",
            top: `${Math.random() * 50}%`,
            left: "-100px",
          }}
          animate={{
            x: ["0vw", "200vw"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 7,
            ease: "linear",
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="w-48 h-48 rounded-full border-4 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm"
          >
            <span className="text-5xl font-bold text-white">JC</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold text-white"
          >
            Jason Cui
          </motion.h1>
        </motion.div>
      </div>
    </div>
  );
}
