import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HorizontalLayoutProps {
  children: React.ReactNode;
}

export default function HorizontalLayout({ children }: HorizontalLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolling, setIsScrolling] = useState(false);

  const routes = ['/', '/about', '/timeline', '/skills', '/projects', '/certifications'];
  const currentIndex = routes.indexOf(location.pathname);

  const handleNextPage = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    }
  };

  const getNextPageLabel = () => {
    const nextRoute = routes[currentIndex + 1];
    switch (nextRoute) {
      case '/about': return 'About Me';
      case '/timeline': return 'Timeline';
      case '/skills': return 'Skills';
      case '/projects': return 'Projects';
      case '/certifications': return 'Certifications';
      default: return 'Next';
    }
  };

  useEffect(() => {
    let scrollTimeout: number;

    const handleWheel = (e: WheelEvent) => {
      // Prevent multiple rapid scroll events
      if (isScrolling) return;
      
      // Check if the scroll is significant enough to trigger navigation
      if (Math.abs(e.deltaY) < 50) return;
      
      // Check if we're at the top or bottom of the page content
      const target = e.target as HTMLElement;
      const scrollableElement = target.closest('.overflow-y-auto') as HTMLElement;
      
      if (scrollableElement) {
        const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
        
        // If scrolling down and we're at the bottom, navigate to next page
        if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 10) {
          e.preventDefault();
          setIsScrolling(true);
          if (currentIndex < routes.length - 1) {
            navigate(routes[currentIndex + 1]);
          }
        }
        // If scrolling up and we're at the top, navigate to previous page
        else if (e.deltaY < 0 && scrollTop <= 10) {
          e.preventDefault();
          setIsScrolling(true);
          if (currentIndex > 0) {
            navigate(routes[currentIndex - 1]);
          }
        }
        // Otherwise, allow normal vertical scrolling within the page
        else {
          return; // Don't prevent default, allow normal scrolling
        }
      } else {
        // If no scrollable element found, allow horizontal navigation
        e.preventDefault();
        setIsScrolling(true);
        
        if (e.deltaY > 0 && currentIndex < routes.length - 1) {
          navigate(routes[currentIndex + 1]);
        } else if (e.deltaY < 0 && currentIndex > 0) {
          navigate(routes[currentIndex - 1]);
        }
      }
      
      // Reset scrolling state after animation
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowRight' && currentIndex < routes.length - 1) {
        setIsScrolling(true);
        navigate(routes[currentIndex + 1]);
        setTimeout(() => setIsScrolling(false), 600);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setIsScrolling(true);
        navigate(routes[currentIndex - 1]);
        setTimeout(() => setIsScrolling(false), 600);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      window.removeEventListener('keydown', handleKeyDown);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [currentIndex, navigate, routes, isScrolling]);

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-hidden relative"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="h-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Floating Arrow Button - Removed as requested */}
    </div>
  );
} 