import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/home/index';
import { UserProfile } from '@/types/data';
import { cn } from '@/lib/utils';

interface HomeProps {
  personalData: UserProfile;
  welcomeText: string;
  setNavbarWelcomeText: (text: string) => void;
}

export default function Home({ personalData, welcomeText, setNavbarWelcomeText }: HomeProps) {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);

  // Check for mobile landscape mode with short height
  useEffect(() => {
    const checkMobileLandscape = () => {
      // Better mobile detection that considers both width and user agent
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrowWidth = window.innerWidth < 768;
      const isShortHeight = window.innerHeight < 600; // Increased threshold for better detection
      
      // Consider device mobile if:
      // 1. User agent indicates mobile device, OR
      // 2. Has touch capability AND (narrow width OR short height in any orientation)
      const isMobile = isMobileUA || (hasTouch && (isNarrowWidth || isShortHeight));
      const isLandscape = window.innerWidth > window.innerHeight;
      
      setIsMobileLandscape(isMobile && (isLandscape || isShortHeight));
    };

    checkMobileLandscape();
    window.addEventListener('resize', checkMobileLandscape);
    window.addEventListener('orientationchange', checkMobileLandscape);

    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      window.removeEventListener('orientationchange', checkMobileLandscape);
    };
  }, []);
  
  return (
    <div className={cn(
      "w-full",
      isMobileLandscape 
        ? "min-h-full overflow-y-auto" 
        : "h-full"
    )}>
      <Hero personalData={personalData} />
    </div>
  );
} 