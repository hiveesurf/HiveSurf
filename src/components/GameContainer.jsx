import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import GameTimer from './GameTimer';
import GameScore from './GameScore';
import GameInstructions from './GameInstructions';
import CooldownModal from './CooldownModal';
import GameResultModal from './GameResultModal';
import FinalRewardModal from './FinalRewardModal';

// Import game components
import LogoClickFrenzy from './games/LogoClickFrenzy';
import ScrollPatternMaster from './games/ScrollPatternMaster';
import ColorMemoryRush from './games/ColorMemoryRush';

const GameContainer = () => {
  const {
    gameState,
    gameScore,
    gameTimer,
    isGameRunning,
    completeGame,
    failGame,
    updateScore,
    proceedToNextGame,
    closeResultModal,
    closeCooldownModal,
    closeRewardModal,
    claimReward,
    beginGame,
    exitGame
  } = useGame();

  const [showInstructions, setShowInstructions] = useState(false);

  // Body scroll lock: only when any overlay is visible
  useEffect(() => {
    const anyOverlay = gameState.isGameActive || gameState.showCooldownModal || gameState.showResultModal; // reward toast does not lock scroll
    if (anyOverlay) {
      const prev = document.body.style.overflow;
      document.body.dataset.prevOverflow = prev || '';
      document.body.style.overflow = 'hidden';
    } else {
      if (document.body.dataset.prevOverflow !== undefined) {
        document.body.style.overflow = document.body.dataset.prevOverflow;
        delete document.body.dataset.prevOverflow;
      } else {
        document.body.style.overflow = '';
      }
    }
    return () => {
      // Restore on unmount
      if (document.body.dataset.prevOverflow !== undefined) {
        document.body.style.overflow = document.body.dataset.prevOverflow;
        delete document.body.dataset.prevOverflow;
      } else {
        document.body.style.overflow = '';
      }
    };
  }, [gameState.isGameActive, gameState.showCooldownModal, gameState.showResultModal]);

  // Show instructions when game starts (after start button is clicked)
  // Removed to avoid second popup after timer starts
  // useEffect(() => {
  //   if (gameState.isGameActive && gameState.currentGame > 0 && isGameRunning) {
  //     setShowInstructions(true);
  //     const timer = setTimeout(() => {
  //       setShowInstructions(false);
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [gameState.isGameActive, gameState.currentGame, isGameRunning]);

  // Render current game component
  const renderCurrentGame = () => {
    if (!gameState.isGameActive) return null;

    const gameProps = {
      onComplete: completeGame,
      onFail: failGame,
      onScoreUpdate: updateScore,
      gameTimer,
      gameScore,
      isGameRunning
    };

    switch (gameState.currentGame) {
      case 1:
        return <LogoClickFrenzy {...gameProps} />;
      case 2:
        return <ScrollPatternMaster {...gameProps} />;
      case 3:
        return <ColorMemoryRush {...gameProps} />;
      default:
        return null;
    }
  };

  // Get game instructions
  const getGameInstructions = () => {
    switch (gameState.currentGame) {
      case 1:
        return {
          title: "Logo Click Frenzy",
          description: "Click as many bouncing logos as you can in 10 seconds! Need 50+ points to win.",
          instructions: [
            "3-5 logos appear and bounce around",
            "Click logos to earn 10 points each",
            "Reach 50+ points before time runs out",
            "Use quick, precise clicks"
          ]
        };
      case 2:
        return {
          title: "Scroll Pattern Master",
          description: "Match the scrolling arrow patterns in 5 seconds! Complete 3-4 sequences.",
          instructions: [
            "Watch the arrow sequence shown",
            "Scroll in the same directions (wheel or trackpad)",
            "Complete all sequences without mistakes",
            "Faster input helps finish in time"
          ]
        };
      case 3:
        return {
          title: "Color Memory Rush",
          description: "Memorize and click the colored squares in the correct order in 5 seconds! Complete 2-3 sequences.",
          instructions: [
            "Squares will light up in a sequence",
            "Click squares in the exact same order",
            "Sequences get slightly harder",
            "Complete them all to win"
          ]
        };
      default:
        return null;
    }
  };

  if (!gameState.isGameActive && !gameState.showCooldownModal && !gameState.showRewardModal && !gameState.showResultModal) {
    return null;
  }

  return (
    <>
      {/* Game Overlay */}
      <AnimatePresence>
        {gameState.isGameActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-[10000] flex items-center justify-center"
            style={{ backdropFilter: 'blur(10px)' }}
          >
            {/* Game UI */}
            <div className="relative w-full h-full max-w-4xl mx-auto p-4">
              {/* Close Button */}
              <div className="absolute top-4 right-4 z-20">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={exitGame}
                  className="bg-gray-800/70 hover:bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600"
                >
                  Close ✕
                </motion.button>
              </div>
              {/* Timer */}
              {isGameRunning && (
                <div className="absolute top-4 left-4 z-10">
                  <GameTimer 
                    timeRemaining={gameTimer} 
                    totalTime={gameState.currentGame === 1 ? 10000 : 5000}
                    isRunning={isGameRunning}
                  />
                </div>
              )}

              {/* Score */}
              <div className="absolute top-4 right-4 z-10">
                <GameScore 
                  score={gameScore}
                  currentGame={gameState.currentGame}
                />
              </div>

              {/* Game Area */}
              <div className="w-full h-full flex items-center justify-center">
                {renderCurrentGame()}
              </div>

              {/* Start Button Overlay */}
              <AnimatePresence>
                {gameState.showStartButton && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20"
                  >
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 50, opacity: 0 }}
                      className="bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-blue-500/30 text-center"
                    >
                      <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Game {gameState.currentGame} Ready!
                      </h2>
                      <p className="text-blue-200 text-lg mb-6">
                        {getGameInstructions()?.description}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={beginGame}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2 mx-auto"
                      >
                        <span className="text-lg">🎮</span>
                        Start Game!
                      </motion.button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Instructions Overlay */}
              {/* Removed instructions overlay to ensure only one Start touchpoint */}
              {/* <AnimatePresence>
                {showInstructions && (
                  <GameInstructions
                    instructions={getGameInstructions()}
                    onClose={() => setShowInstructions(false)}
                  />
                )}
              </AnimatePresence> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cooldown Modal */}
      <AnimatePresence>
        {gameState.showCooldownModal && (
          <CooldownModal
            cooldownTime={gameState.cooldownTimeFormatted}
            onClose={closeCooldownModal}
            canClose={!gameState.isInCooldown}
          />
        )}
      </AnimatePresence>

      {/* Result Modal */}
      <AnimatePresence>
        {gameState.showResultModal && (
          <GameResultModal
            type={gameState.resultType}
            data={gameState.resultData}
            onClose={closeResultModal}
            onProceed={proceedToNextGame}
          />
        )}
      </AnimatePresence>

      {/* Reward Modal */}
      <AnimatePresence>
        {gameState.showRewardModal && (
          <FinalRewardModal
            onClose={closeRewardModal}
            onClaimReward={claimReward}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GameContainer;
