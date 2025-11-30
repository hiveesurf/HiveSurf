import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LogoClickFrenzy = ({ onComplete, onFail, onScoreUpdate, gameTimer, gameScore, isGameRunning }) => {
  const [logos, setLogos] = useState([]);
  const [clickedLogos, setClickedLogos] = useState(new Set());
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const gameAreaRef = useRef(null);
  const logoIdRef = useRef(0);

  const WIN_SCORE = 50;
  const POINTS_PER_CLICK = 10;
  const MAX_LOGOS = 7;
  const MIN_LOGOS = 5;
  const LOGO_LIFESPAN_MS = 12000; // keep logos around for the whole 10s game, plus buffer

  // Generate random position within game area
  const getRandomPosition = () => {
    if (!gameAreaRef.current) return { x: 0, y: 0 };
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const logoSize = 60; // Logo size in pixels
    
    return {
      x: Math.random() * (rect.width - logoSize),
      y: Math.random() * (rect.height - logoSize)
    };
  };

  // Generate random velocity for bouncing
  const getRandomVelocity = () => ({
    x: (Math.random() - 0.5) * 4, // -2 to 2
    y: (Math.random() - 0.5) * 4
  });

  // Create a new logo
  const createLogo = () => {
    const position = getRandomPosition();
    const velocity = getRandomVelocity();
    
    return {
      id: logoIdRef.current++,
      x: position.x,
      y: position.y,
      velocity,
      size: 60 + Math.random() * 20, // 60-80px
      rotation: Math.random() * 360,
      createdAt: Date.now()
    };
  };

  // Start the game
  useEffect(() => {
    if (isGameRunning && gameTimer > 0 && !isGameActive) {
      setIsGameActive(true);
      setScore(0);
      setClickedLogos(new Set());
      
      // Create initial logos
      const initialLogos = [];
      const logoCount = MIN_LOGOS + Math.floor(Math.random() * (MAX_LOGOS - MIN_LOGOS + 1));
      
      for (let i = 0; i < logoCount; i++) {
        initialLogos.push(createLogo());
      }
      
      setLogos(initialLogos);
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

  // Handle logo click
  const handleLogoClick = useCallback((logoId) => {
    if (clickedLogos.has(logoId) || !isGameActive || !isGameRunning) return;

    // Add to clicked set
    setClickedLogos(prev => new Set([...prev, logoId]));
    
    // Update score
    setScore(prev => prev + POINTS_PER_CLICK);
    
    // Remove clicked logo
    setLogos(prev => prev.filter(logo => logo.id !== logoId));
    
    // Create new logo to replace it
    setTimeout(() => {
      setLogos(prev => [...prev, createLogo()]);
    }, 200);
  }, [clickedLogos, isGameActive, isGameRunning]);

  // Update logo positions (bouncing animation)
  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setLogos(prev => prev.map(logo => {
        const newX = logo.x + logo.velocity.x;
        const newY = logo.y + logo.velocity.y;
        
        // Bounce off edges
        let newVelocity = { ...logo.velocity };
        if (!gameAreaRef.current) return logo;
        
        const rect = gameAreaRef.current.getBoundingClientRect();
        
        if (newX <= 0 || newX >= rect.width - logo.size) {
          newVelocity.x = -newVelocity.x;
        }
        if (newY <= 0 || newY >= rect.height - logo.size) {
          newVelocity.y = -newVelocity.y;
        }
        
        return {
          ...logo,
          x: Math.max(0, Math.min(newX, rect.width - logo.size)),
          y: Math.max(0, Math.min(newY, rect.height - logo.size)),
          velocity: newVelocity,
          rotation: logo.rotation + 2
        };
      }));
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [isGameActive]);

  // Clean up old logos (older than lifespan) and maintain minimum count
  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      const now = Date.now();
      setLogos(prev => {
        // Remove expired
        let next = prev.filter(logo => now - logo.createdAt < LOGO_LIFESPAN_MS);
        // Maintain minimum count
        while (next.length < MIN_LOGOS) {
          next = [...next, createLogo()];
        }
        // Cap at max logos
        if (next.length > MAX_LOGOS) {
          next = next.slice(0, MAX_LOGOS);
        }
        return next;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isGameActive]);

  // Handle game timeout
  useEffect(() => {
    if (gameTimer <= 0 && isGameActive) {
      setIsGameActive(false);
      onFail(score, 'timeout');
    }
  }, [gameTimer, isGameActive, score, onFail]);

  // Show waiting screen if game is not running yet
  if (!isGameRunning) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl flex items-center justify-center">
        <div className="text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Logo Click Frenzy</h3>
          <p className="text-blue-200 mb-6">Click the bouncing logos as fast as you can!</p>
          <div className="text-sm text-gray-300">
            <p>• 3-5 logos will appear on screen</p>
            <p>• Click them before they disappear</p>
            <p>• Each click = 10 points</p>
            <p>• Get 50+ points to win!</p>
            <p>• You have 10 seconds!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={gameAreaRef}
      className="relative w-full h-full overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-32 h-32 bg-white rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-4 w-24 h-24 bg-yellow-400 rounded-full blur-lg"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-pink-400 rounded-full blur-md"></div>
      </div>

      {/* Logos */}
      <AnimatePresence>
        {logos.map(logo => (
          <motion.div
            key={logo.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [1, 1.1, 1], 
              opacity: 1,
              x: logo.x,
              y: logo.y,
              rotate: logo.rotation
            }}
            transition={{
              scale: {
                duration: 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
            exit={{ 
              scale: 0, 
              opacity: 0,
              transition: { duration: 0.2 }
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute cursor-pointer"
            style={{
              width: logo.size,
              height: logo.size,
              left: logo.x,
              top: logo.y
            }}
            onClick={() => handleLogoClick(logo.id)}
          >
            {/* HiveSurf Logo */}
            <img 
              src="logo.svg" 
              alt="HiveSurf Logo" 
              className="w-full h-full object-contain"
              style={{
                filter: 'brightness(1.1) contrast(1.1)'
              }}
            />
            
            {/* Click Effect */}
            {clickedLogos.has(logo.id) && (
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-yellow-400 rounded-full"
                style={{ zIndex: 1 }}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white text-sm font-semibold">
        Click the bouncing logos! Each click = {POINTS_PER_CLICK} points
      </div>

      {/* Score Display */}
      <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
        Score: {score} / {WIN_SCORE}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-4 right-4 w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${(score / WIN_SCORE) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
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

export default LogoClickFrenzy;
