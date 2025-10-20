import { useState, useCallback } from 'react';
import { useGame } from '../context/GameContext';

const useLogoClickTracker = () => {
  const { handleLogoClick, getClickProgress } = useGame();
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle logo click with animation
  const handleClick = useCallback(() => {
    // Trigger animation
    setIsAnimating(true);
    
    // Call the game context handler
    handleLogoClick();
    
    // Reset animation after a short delay
    setTimeout(() => {
      setIsAnimating(false);
    }, 200);
  }, [handleLogoClick]);

  // Get animation props for the logo
  const getAnimationProps = () => {
    if (!isAnimating) return {};

    return {
      animate: {
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0]
      },
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    };
  };

  // Get click progress data
  const clickProgress = getClickProgress();

  return {
    handleClick,
    getAnimationProps,
    clickProgress,
    isAnimating
  };
};

export default useLogoClickTracker;
