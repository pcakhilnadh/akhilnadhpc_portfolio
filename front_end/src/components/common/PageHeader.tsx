import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

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
  const splitTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length > 1) {
      return {
        firstPart: words.slice(0, words.length - 1).join(' '),
        lastPart: words[words.length - 1]
      };
    }
    return { firstPart: title, lastPart: '' };
  };

  const { firstPart, lastPart } = splitTitle(title);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("text-center mb-8 sm:mb-12", className)}
    >
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-2">
        {firstPart} <span className="text-primary">{lastPart}</span>
      </h1>
      {subtitle && (
        <p className="text-base sm:text-lg text-muted-foreground font-mono">
          {subtitle}
        </p>
      )}

      {/* Cyberpunk Background Effects */}
      <div className="relative">
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
                boxShadow: `var(--glow-primary)`,
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