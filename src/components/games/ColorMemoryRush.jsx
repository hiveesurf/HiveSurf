import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';

const ColorMemoryRush = ({ onComplete, onFail, onScoreUpdate, gameTimer, gameScore, isGameRunning }) => {
  const { addGameTime } = useGame();
  const [sequences, setSequences] = useState([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const [userInput, setUserInput] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(true);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [highlightedColor, setHighlightedColor] = useState(null);

  const WIN_SCORE = 90;
  const POINTS_PER_SEQUENCE = 30;
  const SEQUENCE_COUNT = 3;
  const HIGHLIGHT_MS = 500; // per color highlight
  const GAP_MS = 300; // gap between highlights

  const colors = [
    { name: 'red', bg: 'bg-red-500', light: 'bg-red-300', symbol: '🔴' },
    { name: 'blue', bg: 'bg-blue-500', light: 'bg-blue-300', symbol: '🔵' },
    { name: 'green', bg: 'bg-green-500', light: 'bg-green-300', symbol: '🟢' },
    { name: 'yellow', bg: 'bg-yellow-500', light: 'bg-yellow-300', symbol: '🟡' }
  ];

  // Generate random sequence
  const generateSequence = () => {
    const sequence = [];
    const length = 3 + Math.floor(Math.random() * 3); // 3-5 colors
    for (let i = 0; i < length; i++) {
      sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    return sequence;
  };

  // Start the game
  useEffect(() => {
    if (isGameRunning && gameTimer > 0 && !isGameActive) {
      setIsGameActive(true);
      setScore(0);
      setCurrentSequenceIndex(0);
      setUserInput([]);
      
      // Generate sequences
      const newSequences = [];
      for (let i = 0; i < SEQUENCE_COUNT; i++) {
        newSequences.push(generateSequence());
      }
      setSequences(newSequences);
      
      // Start showing first sequence
      showCurrentSequence(newSequences, 0);
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

  // Show current sequence (and refund time spent showing it)
  const showCurrentSequence = (seqs = sequences, indexOverride = currentSequenceIndex) => {
    setIsShowingSequence(true);
    setUserInput([]);
    
    const currentSequence = seqs[indexOverride] || [];

    // Calculate total show time and add it back to the game timer so the user doesn't lose time watching
    const totalShowMs = currentSequence.length * (HIGHLIGHT_MS + GAP_MS) + 500; // plus small buffer before input
    addGameTime(totalShowMs);
    
    // Highlight each color in sequence
    let idx = 0;
    const highlightNext = () => {
      if (idx < currentSequence.length) {
        setHighlightedColor(currentSequence[idx]);
        setTimeout(() => {
          setHighlightedColor(null);
          idx++;
          setTimeout(highlightNext, GAP_MS);
        }, HIGHLIGHT_MS);
      } else {
        // Sequence shown, start input phase
        setTimeout(() => {
          setIsShowingSequence(false);
        }, 500);
      }
    };
    
    highlightNext();
  };

  // Handle color click
  const handleColorClick = useCallback((color) => {
    if (!isGameActive || isShowingSequence) return;

    const newInput = [...userInput, color];
    setUserInput(newInput);

    // Check if input matches sequence
    const currentSequence = sequences[currentSequenceIndex] || [];
    const isCorrect = newInput.every((input, index) => input.name === currentSequence[index].name);

    if (!isCorrect) {
      // Wrong input - fail game
      setIsGameActive(false);
      onFail(score, 'wrong_sequence');
      return;
    }

    // Check if sequence is complete
    if (newInput.length === currentSequence.length) {
      // Sequence completed correctly
      setScore(prev => prev + POINTS_PER_SEQUENCE);
      
      // Move to next sequence
      if (currentSequenceIndex < sequences.length - 1) {
        const nextIndex = currentSequenceIndex + 1;
        setCurrentSequenceIndex(nextIndex);
        setTimeout(() => {
          showCurrentSequence(sequences, nextIndex);
        }, 600);
      } else {
        // All sequences completed
        setIsGameActive(false);
        onComplete(score + POINTS_PER_SEQUENCE);
      }
    }
  }, [isGameActive, isShowingSequence, userInput, sequences, currentSequenceIndex, score, onComplete, onFail]);

  // Handle game timeout
  useEffect(() => {
    if (gameTimer <= 0 && isGameActive) {
      setIsGameActive(false);
      onFail(score, 'timeout');
    }
  }, [gameTimer, isGameActive, score, onFail]);

  const currentSequence = sequences[currentSequenceIndex] || [];

  // Show waiting screen if game is not running yet
  if (!isGameRunning) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Color Memory Rush</h3>
          <p className="text-purple-200 mb-6">Memorize and click the colored squares in order!</p>
          <div className="text-sm text-gray-300">
            <p>• Watch the colored squares light up</p>
            <p>• Click them in the exact same order</p>
            <p>• Complete 2-3 sequences to win</p>
            <p>• Each sequence = 30 points</p>
            <p>• You have 5 seconds!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 rounded-xl flex flex-col items-center justify-center p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Color Memory Rush
        </h3>
        <p className="text-purple-200">
          Sequence {currentSequenceIndex + 1} of {sequences.length}
        </p>
      </div>

      {/* Color Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {colors.map((color) => (
          <motion.button
            key={color.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleColorClick(color)}
            disabled={isShowingSequence}
            className={`w-24 h-24 rounded-xl flex items-center justify-center text-4xl font-bold transition-all duration-200 ${
              isShowingSequence 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:shadow-lg cursor-pointer'
            } ${
              highlightedColor?.name === color.name
                ? color.light
                : color.bg
            } ${
              highlightedColor?.name === color.name
                ? 'ring-4 ring-white ring-opacity-50'
                : ''
            }`}
          >
            {color.symbol}
          </motion.button>
        ))}
      </div>

      {/* Sequence Display */}
      <div className="mb-8">
        <AnimatePresence mode="wait">
          {isShowingSequence ? (
            <motion.div
              key="sequence"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <div className="text-white text-lg mb-4">
                Watch the sequence carefully...
              </div>
              
              <div className="flex space-x-2 justify-center">
                {currentSequence.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.3 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      highlightedColor?.name === color.name ? color.light : color.bg
                    }`}
                  >
                    {color.symbol}
                  </motion.div>
                ))}
              </div>
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
                Now click the colors in the same order!
              </div>
              
              {/* User Input Display */}
              <div className="flex space-x-2 justify-center">
                {userInput.map((color, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${color.bg}`}
                  >
                    {color.symbol}
                  </motion.div>
                ))}
                {Array.from({ length: currentSequence.length - userInput.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-xl"
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
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(score / WIN_SCORE) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-white text-sm">
        <p className="mb-2">
          {isShowingSequence ? 'Memorize the color sequence...' : 'Click the colors in order!'}
        </p>
        <p className="text-gray-300">
          Each sequence = {POINTS_PER_SEQUENCE} points
        </p>
      </div>

      {/* Win Message */}
      {score >= WIN_SCORE && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-90 rounded-xl"
        >
          <div className="text-white text-4xl font-bold text-center">
            🎉 WIN! 🎉
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ColorMemoryRush;
