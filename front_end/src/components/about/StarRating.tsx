import React from 'react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  rating: number; // Rating out of 5
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export default function StarRating({ rating, maxStars = 5, size = 'sm', delay = 0 }: StarRatingProps) {
  const stars = Array.from({ length: maxStars }, (_, index) => {
    const starValue = index + 1;
    const isFilled = rating >= starValue;
    const isPartial = rating > index && rating < starValue;
    const fillPercentage = isPartial ? (rating - index) * 100 : 0;

    return {
      index,
      isFilled,
      isPartial,
      fillPercentage
    };
  });

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <div className="flex items-center space-x-0.5">
      {stars.map(({ index, isFilled, isPartial, fillPercentage }) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.3, 
            delay: delay + (index * 0.1),
            type: "spring",
            stiffness: 300
          }}
          className="relative"
        >
          <svg
            className={`${sizeClasses[size]} text-muted-foreground/30`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          
          {(isFilled || isPartial) && (
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: isPartial ? `${fillPercentage}%` : '100%' }}
              transition={{ 
                duration: 0.5, 
                delay: delay + (index * 0.1) + 0.2,
                ease: "easeOut"
              }}
              className="absolute inset-0 overflow-hidden"
            >
              <svg
                className={`${sizeClasses[size]} text-primary`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      ))}
      <span className="ml-2 text-xs text-muted-foreground font-mono">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
} 