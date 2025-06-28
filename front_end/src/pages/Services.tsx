import React, { useEffect, useState } from 'react';
import { ServicesHero, ServicesGrid } from '@/components/services';
import { CommonBg } from '@/components/common';
import { cn } from '@/lib/utils';

interface ServicesProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Services({ setNavbarWelcomeText }: ServicesProps) {
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    setNavbarWelcomeText('my_services.exe');
  }, [setNavbarWelcomeText]);

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
      "w-full relative",
      isMobileLandscape 
        ? "min-h-full overflow-y-auto" 
        : "h-full overflow-y-auto"
    )}>
      <CommonBg />
      <div className="min-h-full relative z-10">
        {/* Hero Section */}
        <ServicesHero />
        
        {/* Services Grid Section */}
        <div id="services-grid" className="container mx-auto px-4 py-16">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-secondary bg-clip-text text-transparent mb-4">
              What I Offer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From AI-powered solutions to complete digital transformations, 
              I deliver cutting-edge services tailored to your business needs.
            </p>
          </div>
          
          <ServicesGrid />
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-16" />
      </div>
    </div>
  );
} 