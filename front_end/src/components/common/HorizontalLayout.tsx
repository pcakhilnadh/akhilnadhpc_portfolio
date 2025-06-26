import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const routes = ['/', '/about', '/timeline', '/projects', '/certifications'];
  const currentIndex = routes.indexOf(location.pathname);

  // Check if device is mobile and orientation
  useEffect(() => {
    const checkMobileAndOrientation = () => {
      // Better mobile detection that considers both width and user agent
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrowWidth = window.innerWidth < 768;
      const isShortHeight = window.innerHeight < 600; // Increased threshold for better detection
      
      // Consider device mobile if:
      // 1. User agent indicates mobile device, OR
      // 2. Has touch capability AND (narrow width OR short height in any orientation)
      const isMobileDevice = isMobileUA || (hasTouch && (isNarrowWidth || isShortHeight));
      const isLandscapeMode = window.innerWidth > window.innerHeight;
      
      setIsMobile(isMobileDevice);
      setIsLandscape(isLandscapeMode);
    };
    
    checkMobileAndOrientation();
    window.addEventListener('resize', checkMobileAndOrientation);
    window.addEventListener('orientationchange', checkMobileAndOrientation);
    
    return () => {
      window.removeEventListener('resize', checkMobileAndOrientation);
      window.removeEventListener('orientationchange', checkMobileAndOrientation);
    };
  }, []);

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
      case '/projects': return 'Projects';
      case '/certifications': return 'Certifications';
      default: return 'Next';
    }
  };

  // Touch handlers for mobile swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // Minimum swipe distance
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < routes.length - 1) {
      // Swipe left = next page
      navigate(routes[currentIndex + 1]);
    } else if (isRightSwipe && currentIndex > 0) {
      // Swipe right = previous page
      navigate(routes[currentIndex - 1]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && currentIndex < routes.length - 1) {
        navigate(routes[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        navigate(routes[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, navigate, routes]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
} 