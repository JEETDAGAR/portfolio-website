import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/images/circuit-bg.jpg')] bg-cover bg-center opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
      </div>

      {/* Loading animation */}
      <div className="relative z-10 text-center">
        {/* Glowing orb */}
        <motion.div
          className="w-32 h-32 mx-auto mb-8 relative"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-70"></div>
          <div className="absolute inset-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur-md opacity-90"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 rounded-full"></div>
        </motion.div>

        {/* Loading text */}
        <motion.h1
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading Portfolio
        </motion.h1>

        {/* Loading dots */}
        <div className="flex space-x-2 justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto mt-8">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

export default LoadingScreen;
