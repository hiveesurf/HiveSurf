import React from 'react';
import { motion } from 'framer-motion';
import { X, Play } from 'lucide-react';

const GameInstructions = ({ instructions, onClose }) => {
  if (!instructions) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-blue-500"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            {instructions.title}
          </h2>
          <p className="text-blue-200 text-lg">
            {instructions.description}
          </p>
        </div>

        {/* Instructions List */}
        <div className="space-y-3 mb-8">
          {instructions.instructions.map((instruction, index) => (
            <motion.div
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3"
            >
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                {instruction}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Start Game</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Countdown */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-4"
        >
          <div className="text-yellow-400 text-sm">
            Game starts automatically in 2 seconds...
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameInstructions;
