import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const GameResultModal = ({ type, data, onClose, onProceed }) => {
  const navigate = useNavigate();
  
  if (!type || !data) return null;

  const isWin = type === 'win';
  const isLose = type === 'lose';

  const handleGoHome = () => {
    navigate('/');
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
        className={`rounded-2xl p-8 max-w-md mx-4 shadow-2xl border ${
          isWin 
            ? 'bg-gradient-to-br from-green-900 to-blue-900 border-green-500'
            : 'bg-gradient-to-br from-red-900 to-orange-900 border-red-500'
        }`}
      >
        {/* Icon */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 200, 
              damping: 10,
              delay: 0.2 
            }}
            className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isWin ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {isWin ? (
              <CheckCircle className="w-10 h-10 text-white" />
            ) : (
              <XCircle className="w-10 h-10 text-white" />
            )}
          </motion.div>
          
          <h2 className={`text-3xl font-bold mb-2 ${
            isWin ? 'text-green-400' : 'text-red-400'
          }`}>
            {isWin ? 'Congratulations!' : 'Game Over!'}
          </h2>
          
          <p className={`text-lg ${
            isWin ? 'text-green-200' : 'text-red-200'
          }`}>
            {isWin 
              ? `You completed Game ${data.game}!`
              : `You failed Game ${data.game}`
            }
          </p>
        </div>

        {/* Score Display */}
        <div className="text-center mb-6">
          <div className={`text-4xl font-bold mb-2 ${
            isWin ? 'text-green-400' : 'text-red-400'
          }`}>
            {data.score} points
          </div>
          
          {isWin && data.game < 3 && (
            <div className="text-green-200 text-sm">
              Ready for Game {data.game + 1}!
            </div>
          )}
          
          {isLose && (
            <div className="text-red-200 text-sm">
              {data.reason === 'timeout' 
                ? 'Time ran out!' 
                : 'Better luck next time!'
              }
            </div>
          )}
        </div>

        {/* Win-specific content */}
        {isWin && (
          <div className="text-center mb-6">
            <div className="text-white text-sm leading-relaxed">
              {data.game === 3 ? (
                <div>
                  <p className="text-yellow-400 font-semibold mb-2">
                    🎉 ALL GAMES COMPLETED! 🎉
                  </p>
                  <p>You've unlocked the special reward!</p>
                </div>
              ) : (
                <div>
                  <p className="mb-2">Great job! You're progressing well.</p>
                  <p>Get ready for the next challenge!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lose-specific content */}
        {isLose && (
          <div className="text-center mb-6">
            <div className="text-white text-sm leading-relaxed">
              <p className="mb-2">
                <strong>24-Hour Cooldown Activated</strong>
              </p>
              <p>
                You'll need to wait 24 hours before trying again.
                This makes the reward even more special!
              </p>
              <p className="text-yellow-400 font-semibold mt-3">
                Redirecting to main page in 3 seconds...
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-4">
          {isWin ? (
            <>
              {data.game < 3 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onProceed}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Next Game</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onProceed}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Claim Reward</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              )}
            </>
          ) : (
            <>
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
              >
                <RotateCcw className="w-4 h-4" />
              </motion.button>
            </>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors duration-200"
          >
            <XCircle className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Motivational Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <div className={`text-sm font-semibold ${
            isWin ? 'text-green-400' : 'text-red-400'
          }`}>
            {isWin 
              ? '🎯 Keep up the great work!'
              : '💪 Don\'t give up! The reward is worth it!'
            }
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GameResultModal;
