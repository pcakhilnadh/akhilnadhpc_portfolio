import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  showUnderline?: boolean;
  className?: string;
}

export default function PageHeader({ 
  title, 
  subtitle, 
  description, 
  showUnderline = true, 
  className = "" 
}: PageHeaderProps) {
  // Split title into words to apply two-color effect
  const splitTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length === 1) {
      // Single word - split in half
      const word = words[0];
      const mid = Math.ceil(word.length / 2);
      return [word.slice(0, mid), word.slice(mid)];
    } else if (words.length === 2) {
      // Two words - one color each
      return words;
    } else {
      // Multiple words - first word vs rest
      return [words[0], words.slice(1).join(' ')];
    }
  };

  const [firstPart, secondPart] = splitTitle(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`text-center mb-16 lg:mb-20 ${className}`}
    >
      {/* Cyberpunk Background Effects */}
      <div className="relative">
        {/* Main Title with Two-Color Cyberpunk Effect */}
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* First part with primary color */}
          <span 
            className="cyberpunk-text-primary inline-block mr-2 lg:mr-4"
            style={{
              background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--primary) / 0.9), hsl(var(--primary)))',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'gradient-shift-primary 4s ease infinite'
            }}
          >
            {firstPart}
          </span>
          
          {/* Second part with different color scheme */}
          <span 
            className="cyberpunk-text-accent inline-block"
            style={{
              color: 'hsl(var(--foreground))',
              textShadow: '0 0 20px hsl(var(--primary) / 0.4)'
            }}
          >
            {secondPart}
          </span>
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary/90 mb-4"
          >
            {subtitle}
          </motion.h2>
        )}

        {/* Animated Cyberpunk Underline */}
        {showUnderline && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="relative mx-auto mb-6"
          >
            {/* Main underline */}
            <div 
              className="w-32 h-1 mx-auto bg-gradient-to-r from-primary via-primary/80 to-primary"
              style={{
                boxShadow: '0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)',
                backgroundSize: '200% 200%',
                animation: 'gradient-pulse 3s ease infinite',
                borderRadius: '2px'
              }}
            />
          </motion.div>
        )}

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
} 