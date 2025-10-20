import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gameSystemTracker } from '../utils/GameSystemTracker';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState({
    isGameActive: false,
    currentGame: 0,
    isInCooldown: false,
    cooldownTimeRemaining: 0,
    cooldownTimeFormatted: '00:00:00',
    allGamesCompleted: false,
    showCooldownModal: false,
    showRewardModal: false,
    showResultModal: false,
    showStartButton: false,
    resultType: null, // 'win' or 'lose'
    resultData: null
  });

  const [logoClickCount, setLogoClickCount] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [gameTimer, setGameTimer] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

  const gameIntervalRef = useRef(null);
  const cooldownIntervalRef = useRef(null);
  const lastLogoClickTimeRef = useRef(0);

  // Initialize game state from tracker
  useEffect(() => {
    const state = gameSystemTracker.getCurrentState();
    setGameState(prev => ({
      ...prev,
      isInCooldown: state.isInCooldown,
      cooldownTimeRemaining: state.cooldownTimeRemaining,
      cooldownTimeFormatted: state.cooldownTimeFormatted,
      allGamesCompleted: state.allGamesCompleted,
      showCooldownModal: state.isInCooldown,
      // Only show reward modal if all completed AND not previously claimed/dismissed
      showRewardModal: state.allGamesCompleted && !state.rewardClaimed && !state.rewardDismissed
    }));
  }, []);

  // Update cooldown timer every second
  useEffect(() => {
    if (gameState.isInCooldown) {
      cooldownIntervalRef.current = setInterval(() => {
        const state = gameSystemTracker.getCurrentState();
        setGameState(prev => ({
          ...prev,
          cooldownTimeRemaining: state.cooldownTimeRemaining,
          cooldownTimeFormatted: state.cooldownTimeFormatted,
          isInCooldown: state.isInCooldown,
          showCooldownModal: state.isInCooldown
        }));

        // Clear cooldown when it expires
        if (!state.isInCooldown) {
          clearInterval(cooldownIntervalRef.current);
        }
      }, 1000);
    }

    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, [gameState.isInCooldown]);

  // Handle logo click
  const handleLogoClick = () => {
    if (gameState.isInCooldown) {
      return; // Don't count clicks during cooldown
    }

    const now = Date.now();
    const timeSinceLastClick = now - (lastLogoClickTimeRef.current || 0);
    const withinStreakWindow = timeSinceLastClick <= 2000; // 3 seconds

    const newCount = withinStreakWindow ? logoClickCount + 1 : 1;
    setLogoClickCount(newCount);
    lastLogoClickTimeRef.current = now;
    
    gameSystemTracker.trackLogoClicks(newCount);

    if (newCount >= gameSystemTracker.requiredLogoClicks) {
      startGame(1);
      setLogoClickCount(0); // Reset click count
    }
  };

  // Start a game (shows start button first)
  const startGame = (gameNumber) => {
    if (gameState.isInCooldown) {
      return false;
    }

    const success = gameSystemTracker.startGame(gameNumber);
    if (success) {
      setGameState(prev => ({
        ...prev,
        isGameActive: true,
        currentGame: gameNumber,
        showCooldownModal: false,
        showRewardModal: false,
        showResultModal: false,
        showStartButton: true
      }));
      
      setGameScore(0);
      setGameTimer(0); // Don't start timer yet
      setIsGameRunning(false); // Don't start game yet
      
      return true;
    }
    return false;
  };

  // Actually begin the game (called when user clicks start button)
  const beginGame = () => {
    setGameState(prev => ({
      ...prev,
      showStartButton: false
    }));
    
    const durationMs = gameState.currentGame === 1 ? 10000 : gameSystemTracker.gameDuration;
    setGameTimer(durationMs);
    setIsGameRunning(true);
    
    // Start game timer
    startGameTimer();
  };

  // Start game timer
  const startGameTimer = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }

    gameIntervalRef.current = setInterval(() => {
      setGameTimer(prev => {
        if (prev <= 100) {
          // Game time is up
          clearInterval(gameIntervalRef.current);
          setIsGameRunning(false);
          failGame('timeout');
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  };

  // Complete a game successfully
  const completeGame = (score) => {
    if (!isGameRunning) return;

    clearInterval(gameIntervalRef.current);
    setIsGameRunning(false);
    
    const success = gameSystemTracker.completeGame(gameState.currentGame, score);
    if (success) {
      setGameScore(score);
      
      if (gameState.currentGame === 3) {
        // All games completed - show reward modal
        setGameState(prev => ({
          ...prev,
          isGameActive: false,
          currentGame: 0,
          allGamesCompleted: true,
          showRewardModal: true,
          showResultModal: false
        }));
      } else {
        // Show win result and proceed to next game
        setGameState(prev => ({
          ...prev,
          showResultModal: true,
          resultType: 'win',
          resultData: { game: gameState.currentGame, score }
        }));
      }
    }
  };

  // Fail a game
  const failGame = (reason = 'timeout') => {
    if (!isGameRunning) return;

    clearInterval(gameIntervalRef.current);
    setIsGameRunning(false);
    
    gameSystemTracker.failGame(gameState.currentGame, gameScore, reason);
    
    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      currentGame: 0,
      isInCooldown: true,
      showCooldownModal: true,
      showResultModal: true,
      resultType: 'lose',
      resultData: { game: gameState.currentGame, score: gameScore, reason }
    }));

    // Redirect to main page after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  // Update game score
  const updateScore = (newScore) => {
    setGameScore(newScore);
  };

  // Proceed to next game (after win result)
  const proceedToNextGame = () => {
    const nextGame = gameState.currentGame + 1;
    setGameState(prev => ({
      ...prev,
      showResultModal: false,
      resultType: null,
      resultData: null
    }));
    
    // Small delay before starting next game
    setTimeout(() => {
      startGame(nextGame);
    }, 1000);
  };

  // Close result modal
  const closeResultModal = () => {
    setGameState(prev => ({
      ...prev,
      showResultModal: false,
      resultType: null,
      resultData: null
    }));
  };

  // Close cooldown modal (only when cooldown is over)
  const closeCooldownModal = () => {
    if (!gameState.isInCooldown) {
      setGameState(prev => ({
        ...prev,
        showCooldownModal: false
      }));
    }
  };

  // Close reward modal (now wipes all game records for the user)
  const closeRewardModal = () => {
    // Remove all stored game records
    gameSystemTracker.resetProgress();

    // Reset context state
    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      currentGame: 0,
      isInCooldown: false,
      showRewardModal: false,
      showResultModal: false,
      showCooldownModal: false,
      allGamesCompleted: false,
      resultType: null,
      resultData: null
    }));

    setLogoClickCount(0);
    setGameScore(0);
    setGameTimer(0);
    setIsGameRunning(false);

    // Return to main page
    navigate('/');
  };

  // Claim reward
  const claimReward = (userProfile) => {
    const success = gameSystemTracker.claimReward(userProfile);
    if (success) {
      setGameState(prev => ({
        ...prev,
        showRewardModal: false,
        allGamesCompleted: false
      }));
      
      // Redirect to main page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
      // Reset progress after 24 hours
      setTimeout(() => {
        gameSystemTracker.resetProgress();
        setGameState(prev => ({
          ...prev,
          currentGame: 0,
          isGameActive: false,
          isInCooldown: false,
          allGamesCompleted: false
        }));
      }, gameSystemTracker.cooldownDuration);
    }
    return success;
  };

  // Reset all progress (for testing)
  const resetProgress = () => {
    gameSystemTracker.resetProgress();
    setGameState({
      isGameActive: false,
      currentGame: 0,
      isInCooldown: false,
      cooldownTimeRemaining: 0,
      cooldownTimeFormatted: '00:00:00',
      allGamesCompleted: false,
      showCooldownModal: false,
      showRewardModal: false,
      showResultModal: false,
      resultType: null,
      resultData: null
    });
    setLogoClickCount(0);
    setGameScore(0);
    setGameTimer(0);
    setIsGameRunning(false);
  };

  // Close/exit the game overlay and return to home
  const exitGame = () => {
    if (gameIntervalRef.current) {
      clearInterval(gameIntervalRef.current);
    }
    setIsGameRunning(false);
    setGameState(prev => ({
      ...prev,
      isGameActive: false,
      showStartButton: false
    }));
    navigate('/');
  };

  // Add extra time to the current game (e.g., per-stage bonuses)
  const addGameTime = (milliseconds) => {
    if (!milliseconds || milliseconds <= 0) return;
    setGameTimer(prev => Math.max(0, prev + milliseconds));
  };

  // Get current game progress
  const getGameProgress = () => {
    return gameSystemTracker.getCurrentState();
  };

  // Get click progress
  const getClickProgress = () => {
    return {
      current: logoClickCount,
      required: gameSystemTracker.requiredLogoClicks,
      remaining: Math.max(0, gameSystemTracker.requiredLogoClicks - logoClickCount),
      percentage: (logoClickCount / gameSystemTracker.requiredLogoClicks) * 100
    };
  };


  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameIntervalRef.current) {
        clearInterval(gameIntervalRef.current);
      }
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);

  const value = {
    // Game state
    gameState,
    logoClickCount,
    gameScore,
    gameTimer,
    isGameRunning,
    
    // Actions
    handleLogoClick,
    startGame,
    beginGame,
    completeGame,
    failGame,
    updateScore,
    proceedToNextGame,
    closeResultModal,
    closeCooldownModal,
    closeRewardModal,
    claimReward,
    resetProgress,
    exitGame,
    addGameTime,
    
    // Getters
    getGameProgress,
    getClickProgress
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
