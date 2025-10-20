import React from 'react';
import { motion } from 'framer-motion';
import { Clock, RefreshCw, X, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const CooldownModal = ({ cooldownTime, onClose, canClose = false }) => {
  const navigate = useNavigate();
  const { exitGame } = useGame();

  const handleGoHome = () => {
    // Ensure overlay closes and state resets
    exitGame();
    // Also navigate explicitly for safety
    navigate('/');
  };

  const handleClose = () => {
    exitGame();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[10001]"
      style={{ backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="bg-gradient-to-br from-red-900 to-orange-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-red-500 relative"
      >
        {/* Close (X) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-red-200 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Clock className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold text-white mb-2">
            Game Cooldown
          </h2>
          <p className="text-red-200 text-lg">
            You need to wait before trying again
          </p>
        </div>

        {/* Time Display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-mono font-bold text-white mb-2">
            {cooldownTime}
          </div>
          <div className="text-red-200 text-sm">
            Time remaining until next attempt
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-orange-500"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 24 * 60 * 60, ease: 'linear' }}
          />
        </div>

        {/* Message */}
        <div className="text-center mb-8">
          <div className="text-gray-200 text-sm leading-relaxed">
            <p className="mb-2">
              <strong>Don't worry!</strong> This cooldown system makes the games more exciting.
            </p>
            <p>
              Come back in <span className="text-yellow-400 font-semibold">{cooldownTime}</span> to try again!
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Go to Main Page</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
          
          {(canClose || true) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-6"
        >
          <div className="text-yellow-400 text-sm font-semibold">
            💪 Keep trying! The reward is worth it!
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CooldownModal;
