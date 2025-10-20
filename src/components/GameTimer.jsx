import React from 'react';
import { motion } from 'framer-motion';

const GameTimer = ({ timeRemaining, totalTime, isRunning }) => {
  const percentage = (timeRemaining / totalTime) * 100;
  const seconds = Math.ceil(timeRemaining / 1000);
  
  // Determine color based on time remaining
  const getTimerColor = () => {
    if (percentage > 60) return 'bg-green-500';
    if (percentage > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Determine if we should pulse (last 2 seconds)
  const shouldPulse = percentage <= 40;

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Timer Bar */}
      <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden shadow-lg">
        <motion.div
          className={`h-full ${getTimerColor()} transition-colors duration-300`}
          initial={{ width: '100%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.1, ease: 'linear' }}
          style={{
            boxShadow: shouldPulse ? '0 0 20px currentColor' : 'none'
          }}
        />
      </div>

      {/* Time Display */}
      <motion.div
        className={`text-2xl font-bold text-white ${
          shouldPulse ? 'animate-pulse' : ''
        }`}
        animate={shouldPulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ 
          duration: 0.5, 
          repeat: shouldPulse ? Infinity : 0,
          ease: 'easeInOut'
        }}
      >
        {seconds}
      </motion.div>

      {/* Status Text */}
      <div className="text-sm text-gray-300 text-center">
        {isRunning ? 'Time Remaining' : 'Game Over'}
      </div>

      {/* Warning at 2 seconds */}
      {shouldPulse && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-red-400 text-sm font-semibold"
        >
          ⚠️ HURRY UP!
        </motion.div>
      )}
    </div>
  );
};

export default GameTimer;
