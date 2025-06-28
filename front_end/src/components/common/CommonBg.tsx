import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CommonBg: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [isWalking, setIsWalking] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Set initial window size
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate robot movement towards cursor
  useEffect(() => {
    if (!windowSize.width || !windowSize.height) {
      return;
    }

    // Only start moving if mouse has actually moved
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      return;
    }

    let animationId: number;
    let isAnimating = false;

    const moveRobot = () => {
      if (isAnimating) return;
      isAnimating = true;

      const targetX = mousePosition.x;
      const targetY = mousePosition.y;
      
      // Robot dimensions
      const robotWidth = 67;
      const robotHeight = 100;
      const headOffsetX = 33.5; // Center of robot (67/2)
      const headOffsetY = 16.5; // Head position (100/6)
      
      // Calculate desired robot body position so head reaches cursor
      const desiredBodyX = targetX - headOffsetX;
      const desiredBodyY = targetY - headOffsetY;
      
      // Calculate screen boundaries for robot body (keep robot fully visible)
      const minX = -(windowSize.width - 100); // Can move left from initial position
      const maxX = 0; // Initial position is already at right edge
      const minY = -(windowSize.height - 100); // Can move up from initial position  
      const maxY = 0; // Initial position is already at bottom edge
      
      // Constrain desired position to screen boundaries
      const constrainedBodyX = Math.max(minX, Math.min(maxX, desiredBodyX - (windowSize.width - 100)));
      const constrainedBodyY = Math.max(minY, Math.min(maxY, desiredBodyY - (windowSize.height - 100)));
      
      // Calculate current robot body position
      const currentBodyX = robotPosition.x;
      const currentBodyY = robotPosition.y;
      
      // Calculate distance to target position
      const deltaX = constrainedBodyX - currentBodyX;
      const deltaY = constrainedBodyY - currentBodyY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      
      // Only move if we're far enough from target (smaller threshold for precision)
      if (distance > 2) {
        setIsWalking(true);
        
        // Calculate movement direction
        const angle = Math.atan2(deltaY, deltaX);
        const speed = Math.min(3, distance * 0.15); // Proportional speed, max 3px/frame
        
        // Move towards constrained target position
        const moveX = Math.cos(angle) * speed;
        const moveY = Math.sin(angle) * speed;
        
        setRobotPosition(prev => ({
          x: Math.max(minX, Math.min(maxX, prev.x + moveX)),
          y: Math.max(minY, Math.min(maxY, prev.y + moveY))
        }));
        
        // Continue animation
        isAnimating = false;
        animationId = requestAnimationFrame(moveRobot);
      } else {
        setIsWalking(false);
        isAnimating = false;
      }
    };

    // Start animation
    animationId = requestAnimationFrame(moveRobot);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [mousePosition, windowSize]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/98 to-background/95" />
      
      {/* 3D Wireframe Ninja Robot */}
      <motion.div
        className="absolute bottom-8 right-8"
        animate={{
          x: robotPosition.x,
          y: robotPosition.y,
        }}
        transition={{
          type: "tween",
          duration: 0.1
        }}
      >
        <motion.svg 
          width="67" 
          height="100" 
          viewBox="0 0 200 300" 
          className="opacity-40"
          animate={{
            scaleX: (() => {
              if (!windowSize.width) return 1;
              const robotBodyScreenX = (windowSize.width - 100) + robotPosition.x;
              const headScreenX = robotBodyScreenX + 33.5;
              const deltaX = mousePosition.x - headScreenX;
              return deltaX < 0 ? -1 : 1; // Flip robot to face movement direction
            })(),
          }}
          transition={{
            type: "tween",
            duration: 0.3
          }}
        >
          {/* Main body wireframe */}
          <g fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
            
            {/* Head - Ninja mask with robotic elements (rotates to face cursor) */}
            <motion.g
              animate={{
                rotate: (() => {
                  if (!windowSize.width || !mousePosition.x) return 0;
                  // Calculate current head position in screen coordinates
                  const robotBodyScreenX = (windowSize.width - 100) + robotPosition.x;
                  const robotBodyScreenY = (windowSize.height - 100) + robotPosition.y;
                  const headScreenX = robotBodyScreenX + 33.5; // Center of robot (67/2)
                  const headScreenY = robotBodyScreenY + 16.5; // Head position (100/6)
                  
                  const deltaX = mousePosition.x - headScreenX;
                  const deltaY = mousePosition.y - headScreenY;
                  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                  // Limit rotation to reasonable range for ninja head movement
                  return Math.max(-90, Math.min(90, angle));
                })(),
              }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 80
              }}
              style={{ transformOrigin: "100px 50px" }}
            >
              <ellipse cx="100" cy="50" rx="25" ry="30" />
              {/* Ninja hood outline */}
              <path d="M 75 35 Q 100 15 125 35 L 125 65 Q 100 55 75 65 Z" />
              
              {/* Enhanced Robot visor/eyes that also track cursor */}
              <motion.g
                animate={{
                  x: (() => {
                    if (!windowSize.width || !mousePosition.x) return 0;
                    const robotBodyScreenX = (windowSize.width - 100) + robotPosition.x;
                    const headScreenX = robotBodyScreenX + 33.5;
                    const deltaX = mousePosition.x - headScreenX;
                    // Eye movement within visor (limited range)
                    return Math.max(-2, Math.min(2, deltaX / 200));
                  })(),
                  y: (() => {
                    if (!windowSize.height || !mousePosition.y) return 0;
                    const robotBodyScreenY = (windowSize.height - 100) + robotPosition.y;
                    const headScreenY = robotBodyScreenY + 16.5;
                    const deltaY = mousePosition.y - headScreenY;
                    // Eye movement within visor (limited range)
                    return Math.max(-1, Math.min(1, deltaY / 200));
                  })(),
                }}
                transition={{
                  type: "spring",
                  damping: 20,
                  stiffness: 150
                }}
              >
                <rect x="88" y="42" width="8" height="6" rx="2" />
                <rect x="104" y="42" width="8" height="6" rx="2" />
                
                {/* Eye pupils that track cursor */}
                <motion.circle cx="92" cy="45" r="1.5" fill="currentColor" className="text-muted-foreground/80" />
                <motion.circle cx="108" cy="45" r="1.5" fill="currentColor" className="text-muted-foreground/80" />
                
                {/* Eye glow effect */}
                <motion.circle 
                  cx="92" 
                  cy="45" 
                  r="2" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  className="text-muted-foreground/40"
                  animate={{
                    r: [2, 2.5, 2],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.circle 
                  cx="108" 
                  cy="45" 
                  r="2" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  className="text-muted-foreground/40"
                  animate={{
                    r: [2, 2.5, 2],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
              </motion.g>
              
              {/* Mouth piece/respirator */}
              <rect x="92" y="55" width="16" height="8" rx="4" />
              
              {/* Direction indicator line (shows where robot is looking) */}
                             <motion.line
                 x1="100"
                 y1="50"
                 x2={(() => {
                   if (!windowSize.width || !mousePosition.x) return 120;
                   const robotBodyScreenX = (windowSize.width - 100) + robotPosition.x;
                   const robotBodyScreenY = (windowSize.height - 100) + robotPosition.y;
                   const headScreenX = robotBodyScreenX + 33.5;
                   const headScreenY = robotBodyScreenY + 16.5;
                   const deltaX = mousePosition.x - headScreenX;
                   const deltaY = mousePosition.y - headScreenY;
                   const angle = Math.atan2(deltaY, deltaX);
                   return 100 + Math.cos(angle) * 20;
                 })()}
                 y2={(() => {
                   if (!windowSize.height || !mousePosition.y) return 50;
                   const robotBodyScreenX = (windowSize.width - 100) + robotPosition.x;
                   const robotBodyScreenY = (windowSize.height - 100) + robotPosition.y;
                   const headScreenX = robotBodyScreenX + 33.5;
                   const headScreenY = robotBodyScreenY + 16.5;
                   const deltaX = mousePosition.x - headScreenX;
                   const deltaY = mousePosition.y - headScreenY;
                   const angle = Math.atan2(deltaY, deltaX);
                   return 50 + Math.sin(angle) * 20;
                 })()}
                 stroke="currentColor"
                 strokeWidth="1"
                 strokeDasharray="2,2"
                 className="text-muted-foreground/30"
                 opacity="0.6"
               />
            </motion.g>
            
            {/* Neck - robotic joint */}
            <line x1="100" y1="80" x2="100" y2="95" />
            <circle cx="100" cy="87" r="5" />
            
            {/* Torso - ninja robe with armor plates (bobs when walking) */}
            <motion.g
              animate={{
                y: isWalking ? [0, -2, 0] : 0,
              }}
              transition={{
                duration: isWalking ? 0.6 : 0,
                repeat: isWalking ? Infinity : 0,
                ease: "easeInOut"
              }}
            >
              <rect x="75" y="95" width="50" height="80" rx="8" />
              {/* Armor chest plate */}
              <rect x="85" y="105" width="30" height="25" rx="3" />
              {/* Belt/utility belt */}
              <rect x="70" y="140" width="60" height="8" rx="2" />
              {/* Belt pouches */}
              <rect x="78" y="148" width="8" height="12" rx="1" />
              <rect x="90" y="148" width="8" height="12" rx="1" />
              <rect x="102" y="148" width="8" height="12" rx="1" />
              <rect x="114" y="148" width="8" height="12" rx="1" />
            </motion.g>
            
            {/* Left Arm (swings when walking) */}
            <motion.g
              animate={{
                rotate: isWalking ? [0, 20, -20, 0] : 0,
              }}
              transition={{
                duration: isWalking ? 0.8 : 0,
                repeat: isWalking ? Infinity : 0,
                ease: "easeInOut",
                delay: isWalking ? 0.4 : 0 // Opposite to right leg
              }}
              style={{ transformOrigin: "75px 110px" }}
            >
              {/* Upper arm */}
              <line x1="75" y1="110" x2="50" y2="130" />
              <ellipse cx="62" cy="120" rx="8" ry="15" transform="rotate(-25 62 120)" />
              {/* Elbow joint */}
              <circle cx="50" cy="130" r="4" />
              {/* Forearm */}
              <line x1="50" y1="130" x2="30" y2="165" />
              <ellipse cx="40" cy="147" rx="6" ry="12" transform="rotate(-35 40 147)" />
              {/* Hand - robotic fingers */}
              <circle cx="30" cy="165" r="6" />
              <line x1="25" y1="165" x2="20" y2="170" />
              <line x1="30" y1="160" x2="28" y2="155" />
              <line x1="35" y1="165" x2="40" y2="170" />
            </motion.g>
            
            {/* Right Arm - holding ninja sword (swings when walking) */}
            <motion.g
              animate={{
                rotate: isWalking ? [0, -20, 20, 0] : 0,
              }}
              transition={{
                duration: isWalking ? 0.8 : 0,
                repeat: isWalking ? Infinity : 0,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "125px 110px" }}
            >
              {/* Upper arm */}
              <line x1="125" y1="110" x2="150" y2="130" />
              <ellipse cx="138" cy="120" rx="8" ry="15" transform="rotate(25 138 120)" />
              {/* Elbow joint */}
              <circle cx="150" cy="130" r="4" />
              {/* Forearm */}
              <line x1="150" y1="130" x2="170" y2="165" />
              <ellipse cx="160" cy="147" rx="6" ry="12" transform="rotate(35 160 147)" />
              {/* Hand holding sword */}
              <circle cx="170" cy="165" r="6" />
              {/* Ninja sword (katana) */}
              <line x1="175" y1="160" x2="190" y2="100" strokeWidth="2" />
              {/* Sword guard */}
              <line x1="173" y1="155" x2="177" y2="155" strokeWidth="2" />
              {/* Sword handle */}
              <line x1="170" y1="160" x2="175" y2="170" strokeWidth="3" />
            </motion.g>
            
            {/* Waist/Hip joint */}
            <circle cx="100" cy="175" r="6" />
            
            {/* Left Leg (walking animation) */}
            <motion.g
              animate={{
                rotate: isWalking ? [0, 15, -15, 0] : 0,
              }}
              transition={{
                duration: isWalking ? 0.8 : 0,
                repeat: isWalking ? Infinity : 0,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "90px 175px" }}
            >
              {/* Thigh */}
              <line x1="90" y1="175" x2="85" y2="220" />
              <ellipse cx="87" cy="197" rx="8" ry="18" transform="rotate(-5 87 197)" />
              {/* Knee joint */}
              <circle cx="85" cy="220" r="5" />
              {/* Shin */}
              <motion.g
                animate={{
                  rotate: isWalking ? [0, -20, 30, 0] : 0,
                }}
                transition={{
                  duration: isWalking ? 0.8 : 0,
                  repeat: isWalking ? Infinity : 0,
                  ease: "easeInOut"
                }}
                style={{ transformOrigin: "85px 220px" }}
              >
                <line x1="85" y1="220" x2="80" y2="270" />
                <ellipse cx="82" cy="245" rx="6" ry="20" transform="rotate(-5 82 245)" />
                {/* Ankle joint */}
                <circle cx="80" cy="270" r="4" />
                {/* Foot - ninja boot */}
                <ellipse cx="85" cy="280" rx="12" ry="8" />
              </motion.g>
            </motion.g>
            
            {/* Right Leg (walking animation - opposite phase) */}
            <motion.g
              animate={{
                rotate: isWalking ? [0, -15, 15, 0] : 0,
              }}
              transition={{
                duration: isWalking ? 0.8 : 0,
                repeat: isWalking ? Infinity : 0,
                ease: "easeInOut",
                delay: isWalking ? 0.4 : 0 // Opposite phase
              }}
              style={{ transformOrigin: "110px 175px" }}
            >
              {/* Thigh */}
              <line x1="110" y1="175" x2="115" y2="220" />
              <ellipse cx="113" cy="197" rx="8" ry="18" transform="rotate(5 113 197)" />
              {/* Knee joint */}
              <circle cx="115" cy="220" r="5" />
              {/* Shin */}
              <motion.g
                animate={{
                  rotate: isWalking ? [0, 30, -20, 0] : 0,
                }}
                transition={{
                  duration: isWalking ? 0.8 : 0,
                  repeat: isWalking ? Infinity : 0,
                  ease: "easeInOut",
                  delay: isWalking ? 0.4 : 0
                }}
                style={{ transformOrigin: "115px 220px" }}
              >
                <line x1="115" y1="220" x2="120" y2="270" />
                <ellipse cx="118" cy="245" rx="6" ry="20" transform="rotate(5 118 245)" />
                {/* Ankle joint */}
                <circle cx="120" cy="270" r="4" />
                {/* Foot - ninja boot */}
                <ellipse cx="115" cy="280" rx="12" ry="8" />
              </motion.g>
            </motion.g>
            
            {/* Ninja cape/cloak flowing */}
            <path d="M 75 95 Q 45 120 40 160 Q 50 180 60 200 L 75 175" strokeDasharray="3,2" opacity="0.6" />
            <path d="M 125 95 Q 155 120 160 160 Q 150 180 140 200 L 125 175" strokeDasharray="3,2" opacity="0.6" />
            
            {/* Additional robotic details */}
            {/* Shoulder joints */}
            <circle cx="75" cy="110" r="6" />
            <circle cx="125" cy="110" r="6" />
            {/* Chest panel lines */}
            <line x1="85" y1="115" x2="115" y2="115" opacity="0.7" />
            <line x1="85" y1="125" x2="115" y2="125" opacity="0.7" />
            {/* Back shuriken holder */}
            <circle cx="110" cy="100" r="8" opacity="0.5" />
            <line x1="105" y1="95" x2="115" y2="105" opacity="0.5" />
            <line x1="115" y1="95" x2="105" y2="105" opacity="0.5" />
            
          </g>
          
          {/* Glowing energy effects */}
          <motion.g
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Energy core in chest */}
            <circle cx="100" cy="115" r="8" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/40" />
            <circle cx="100" cy="115" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground/60" />
            
            {/* Visor glow */}
            <rect x="88" y="42" width="8" height="6" rx="2" fill="currentColor" className="text-muted-foreground/30" />
            <rect x="104" y="42" width="8" height="6" rx="2" fill="currentColor" className="text-muted-foreground/30" />
                     </motion.g>
        </motion.svg>
      </motion.div>

      {/* Subtle environmental elements */}
      {/* Floating geometric shapes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            rotate: [0, 360],
            x: windowSize.width ? (mousePosition.x / windowSize.width - 0.5) * (60 + i * 20) : 0,
            y: windowSize.height ? (mousePosition.y / windowSize.height - 0.5) * (40 + i * 10) : 0,
          }}
          transition={{
            rotate: {
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: "linear"
            },
            x: {
              type: "spring",
              damping: 30 + i * 2,
              stiffness: 80 + i * 10
            },
            y: {
              type: "spring",
              damping: 30 + i * 2,
              stiffness: 80 + i * 10
            }
          }}
        >
          <svg width={8 + i} height={8 + i} viewBox="0 0 16 16" className="opacity-15">
            {i % 3 === 0 && (
              <rect x="4" y="4" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            )}
            {i % 3 === 1 && (
              <circle cx="8" cy="8" r="4" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            )}
            {i % 3 === 2 && (
              <polygon points="8,2 14,12 2,12" fill="none" stroke="currentColor" strokeWidth="1" className="text-muted-foreground" />
            )}
          </svg>
        </motion.div>
      ))}

      {/* Background grid */}
      <motion.div
        className="absolute inset-0 opacity-3"
        animate={{
          x: windowSize.width ? (mousePosition.x / windowSize.width - 0.5) * 40 : 0,
          y: windowSize.height ? (mousePosition.y / windowSize.height - 0.5) * 20 : 0,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 100
        }}
      >
        <svg width="100%" height="100%" className="text-muted-foreground">
          <defs>
            <pattern id="ninjaGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.3" opacity="0.4"/>
              <circle cx="30" cy="30" r="1" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ninjaGrid)" />
        </svg>
      </motion.div>

      {/* Subtle energy particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1 h-1 bg-muted-foreground/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.5, 1.5, 0.5],
            x: windowSize.width ? (mousePosition.x / windowSize.width - 0.5) * (20 + Math.random() * 40) : 0,
            y: windowSize.height ? (mousePosition.y / windowSize.height - 0.5) * (10 + Math.random() * 30) : 0,
          }}
          transition={{
            opacity: {
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            scale: {
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            },
            x: {
              type: "spring",
              damping: 20 + Math.random() * 10,
              stiffness: 50 + Math.random() * 30
            },
            y: {
              type: "spring",
              damping: 20 + Math.random() * 10,
              stiffness: 50 + Math.random() * 30
            }
          }}
        />
      ))}
    </div>
  );
};

export default CommonBg; 