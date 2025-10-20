import React from 'react';
import { motion } from 'framer-motion';

const GameScore = ({ score, currentGame }) => {
  // Get win condition for current game
  const getWinCondition = () => {
    switch (currentGame) {
      case 1:
        return { required: 50, pointsPerAction: 10 };
      case 2:
        return { required: 75, pointsPerAction: 25 };
      case 3:
        return { required: 90, pointsPerAction: 30 };
      default:
        return { required: 0, pointsPerAction: 0 };
    }
  };

  const winCondition = getWinCondition();
  const percentage = Math.min((score / winCondition.required) * 100, 100);
  const isWinning = score >= winCondition.required;

  return (
    <div className="bg-gray-900/75 backdrop-blur-sm border border-gray-700 rounded-xl px-4 py-3 shadow-xl">
      {/* Score Header */}
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1">Score</div>

      {/* Score Display */}
      <motion.div
        key={score}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="text-5xl font-extrabold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] leading-none"
      >
        {score}
      </motion.div>

      {/* Progress Bar */}
      <div className="w-40 h-3 mt-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`h-full transition-colors duration-300 ${
            isWinning ? 'bg-green-500' : 'bg-blue-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </div>

      {/* Win Condition */}
      <div className="mt-2 text-sm text-gray-200">
        <div className="font-semibold">
          {isWinning ? '✓ WIN!' : `${winCondition.required - score} to win`}
        </div>
        <div className="text-xs text-gray-400">Need {winCondition.required} points</div>
      </div>

      {/* Game Number */}
      <div className="mt-1 text-[10px] text-gray-500">Game {currentGame}/3</div>
    </div>
  );
};

export default GameScore;
