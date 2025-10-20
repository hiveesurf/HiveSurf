import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(false);

  // Calculate angle based on mouse movement direction
  const calculateMovementAngle = (currentX, currentY, lastX, lastY) => {
    const deltaX = currentX - lastX;
    const deltaY = currentY - lastY;
    // Calculate the angle of movement
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    // Since our arrow points down initially, we need to subtract 90° to align with movement direction
    // This will make the arrow point in the same direction as movement
    return angle - 90;
  };

  // Check if mouse is moving significantly
  const isSignificantMovement = (currentX, currentY, lastX, lastY) => {
    const distance = Math.sqrt(Math.pow(currentX - lastX, 2) + Math.pow(currentY - lastY, 2));
    return distance > 3; // Minimum movement threshold
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const currentMousePos = { x: e.clientX, y: e.clientY };
      
      // Only update if mouse has moved significantly
      if (isSignificantMovement(currentMousePos.x, currentMousePos.y, lastMousePosition.x, lastMousePosition.y)) {
        const movementAngle = calculateMovementAngle(
          currentMousePos.x, 
          currentMousePos.y, 
          lastMousePosition.x, 
          lastMousePosition.y
        );
        
        setArrowRotation(movementAngle);
        setIsMouseMoving(true);
        
        // Reset mouse moving state after a short delay
        setTimeout(() => {
          setIsMouseMoving(false);
        }, 100);
      }
      
      setMousePosition(currentMousePos);
      setLastMousePosition(currentMousePos);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Add event listeners to the document
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [lastMousePosition]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none"
      style={{
        zIndex: 99999,
        x: mousePosition.x - 16, // Center the arrow (32px / 2)
        y: mousePosition.y - 16,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
    >
      {/* Animated arrow only */}
      <motion.div
        animate={{
          rotate: isMouseMoving ? arrowRotation : arrowRotation,
          scale: isMouseMoving ? 1.1 : [1, 1.05, 1],
        }}
        transition={{
          rotate: { duration: 0.1, ease: "easeOut" },
          scale: { 
            duration: isMouseMoving ? 0.1 : 0.8, 
            ease: "easeInOut", 
            repeat: isMouseMoving ? 0 : Infinity, 
            repeatDelay: 1.5 
          }
        }}
      >
        {/* Arrow */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 5V19M12 19L5 12M12 19L19 12"
            stroke="#004396"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
