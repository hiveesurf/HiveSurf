import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

const ScrollPatternMaster = ({ onComplete, onFail, onScoreUpdate, gameTimer, gameScore, isGameRunning }) => {
  const { addGameTime } = useGame();
  const [patterns, setPatterns] = useState([]);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const [userInput, setUserInput] = useState([]);
  const [isShowingPattern, setIsShowingPattern] = useState(true);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [lastScrollDirection, setLastScrollDirection] = useState(null);
  const scrollTimeoutRef = useRef(null);

  const WIN_SCORE = 75;
  const POINTS_PER_PATTERN = 25;
  const PATTERN_COUNT = 4;
  const PATTERN_DISPLAY_TIME = 1500; // 1.5 seconds to show pattern
  const INPUT_TIMEOUT = 4000; // 4 seconds to input (extended to avoid premature fails)

  const directions = ['up', 'down', 'left', 'right'];
  const directionSymbols = {
    up: '↑',
    down: '↓',
    left: '←',
    right: '→'
  };
  const directionColors = {
    up: 'text-red-500',
    down: 'text-blue-500',
    left: 'text-green-500',
    right: 'text-yellow-500'
  };

  // Generate random pattern
  const generatePattern = () => {
    const pattern = [];
    for (let i = 0; i < 3 + Math.floor(Math.random() * 2); i++) { // 3-4 directions
      pattern.push(directions[Math.floor(Math.random() * directions.length)]);
    }
    return pattern;
  };

  // Start the game
  useEffect(() => {
    if (isGameRunning && gameTimer > 0 && !isGameActive) {
      setIsGameActive(true);
      setScore(0);
      setCurrentPatternIndex(0);
      setUserInput([]);
      
      // Generate patterns
      const newPatterns = [];
      for (let i = 0; i < PATTERN_COUNT; i++) {
        newPatterns.push(generatePattern());
      }
      setPatterns(newPatterns);
      
      // Start showing first pattern
      showCurrentPattern();
    }
  }, [isGameRunning, gameTimer, isGameActive]);

  // Update score in parent
  useEffect(() => {
    onScoreUpdate(score);
  }, [score, onScoreUpdate]);

  // Check win condition
  useEffect(() => {
    if (score >= WIN_SCORE && isGameActive) {
      setIsGameActive(false);
      onComplete(score);
    }
  }, [score, isGameActive, onComplete]);

  // Show current pattern
  const showCurrentPattern = () => {
    // Clear any pending input timeout when switching phases
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }

    setIsShowingPattern(true);
    setUserInput([]);
    
    setTimeout(() => {
      setIsShowingPattern(false);
      startInputTimeout();
    }, PATTERN_DISPLAY_TIME);
  };

  // Start input timeout
  const startInputTimeout = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      if (isGameActive) {
        setIsGameActive(false);
        onFail(score, 'timeout');
      }
    }, INPUT_TIMEOUT);
  };

  // Handle scroll input
  const handleScroll = useCallback((direction) => {
    if (!isGameActive || isShowingPattern) return;

    setLastScrollDirection(direction);

    // Reset inactivity timer on each input
    startInputTimeout();

    const newInput = [...userInput, direction];
    setUserInput(newInput);

    // Check if input matches pattern
    const currentPattern = patterns[currentPatternIndex];
    const isCorrect = newInput.every((input, index) => input === currentPattern[index]);

    if (!isCorrect) {
      // Wrong input - fail game
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      setIsGameActive(false);
      onFail(score, 'wrong_pattern');
      return;
    }

    // Check if pattern is complete
    if (newInput.length === currentPattern.length) {
      // Completed this pattern - clear input timeout immediately
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }

      // Pattern completed correctly
      setScore(prev => prev + POINTS_PER_PATTERN);

      // Add bonus time for next stage (+2 seconds)
      addGameTime(4000);
      
      // Move to next pattern
      if (currentPatternIndex < patterns.length - 1) {
        setCurrentPatternIndex(prev => prev + 1);
        setTimeout(() => {
          showCurrentPattern();
        }, 500);
      } else {
        // All patterns completed
        setIsGameActive(false);
        onComplete(score + POINTS_PER_PATTERN);
      }
    }
  }, [isGameActive, isShowingPattern, userInput, patterns, currentPatternIndex, score, onComplete, onFail, addGameTime]);

  // Listen for scroll events and keyboard inputs
  useEffect(() => {
    if (!isGameActive || isShowingPattern) return;

    const handleScrollEvent = (e) => {
      const deltaY = e.deltaY;
      const deltaX = e.deltaX;
      
      let direction = null;
      
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        direction = deltaY > 0 ? 'down' : 'up';
      } else if (Math.abs(deltaX) > 0) {
        direction = deltaX > 0 ? 'right' : 'left';
      }
      
      if (direction) {
        e.preventDefault?.();
        handleScroll(direction);
      }
    };

    const handleKeyEvent = (e) => {
      if (!isGameActive || isShowingPattern) return;
      let direction = null;
      switch (e.key) {
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
        default:
          break;
      }
      if (direction) {
        e.preventDefault();
        handleScroll(direction);
      }
    };

    window.addEventListener('wheel', handleScrollEvent, { passive: false });
    window.addEventListener('keydown', handleKeyEvent);
    
    return () => {
      window.removeEventListener('wheel', handleScrollEvent);
      window.removeEventListener('keydown', handleKeyEvent);
    };
  }, [isGameActive, isShowingPattern, handleScroll]);

  // Handle game timeout
  useEffect(() => {
    if (gameTimer <= 0 && isGameActive) {
      setIsGameActive(false);
      onFail(score, 'timeout');
    }
  }, [gameTimer, isGameActive, score, onFail]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const currentPattern = patterns[currentPatternIndex] || [];

  // Show waiting screen if game is not running yet
  if (!isGameRunning) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-green-900 to-blue-900 rounded-xl flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Scroll Pattern Master</h3>
          <p className="text-green-200 mb-6">Match the scrolling patterns exactly!</p>
          <div className="text-sm text-gray-300">
            <p>• Watch the arrow patterns carefully</p>
            <p>• Scroll in the exact same directions</p>
            <p>• Complete 3-4 sequences to win</p>
            <p>• Each sequence = 25 points</p>
            <p>• You have 5 seconds!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-green-900 to-blue-900 rounded-xl flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Scroll Pattern Master
        </h3>
        <p className="text-green-200">
          Pattern {currentPatternIndex + 1} of {patterns.length}
        </p>
      </div>

      {/* Pattern Display */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          {isShowingPattern ? (
            <motion.div
              key="pattern"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex space-x-4"
            >
              {currentPattern.map((direction, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl font-bold ${directionColors[direction]}`}
                >
                  {directionSymbols[direction]}
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <div className="text-white text-lg mb-4">
                Now scroll in the same pattern!
              </div>
              
              {/* User Input Display */}
              <div className="flex space-x-2 justify-center">
                {userInput.map((direction, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold ${directionColors[direction]}`}
                  >
                    {directionSymbols[direction]}
                  </motion.div>
                ))}
                {Array.from({ length: currentPattern.length - userInput.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl font-bold text-gray-500"
                  >
                    ?
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="w-full max-w-md mb-4">
        <div className="flex justify-between text-white text-sm mb-2">
          <span>Progress</span>
          <span>{score} / {WIN_SCORE}</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            initial={{ width: 0 }}
            animate={{ width: `${(score / WIN_SCORE) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-white text-sm">
        <p className="mb-2">
          {isShowingPattern ? 'Memorize the pattern...' : 'Scroll to match the pattern!'}
        </p>
        <p className="text-gray-300">
          Use mouse wheel/trackpad or arrow keys
        </p>
      </div>

      {/* Last Scroll Direction Indicator */}
      {lastScrollDirection && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute top-4 right-4 text-white text-sm"
        >
          Last: <span className={directionColors[lastScrollDirection]}>
            {directionSymbols[lastScrollDirection]}
          </span>
        </motion.div>
      )}

      {/* Win Message */}
      {score >= WIN_SCORE && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-8 text-white text-xl font-bold"
        >
          SUCCESS!
        </motion.div>
      )}
    </div>
  );
};

export default ScrollPatternMaster;
