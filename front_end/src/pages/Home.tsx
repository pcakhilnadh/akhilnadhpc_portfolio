import React, { useEffect, useState } from 'react';
import { Hero } from '@/components/home/index';
import { UserProfile } from '@/types/data';
import { cn } from '@/lib/utils';
import { FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
  
  const handleViewResume = () => {
    window.open('/resume', '_blank');
  };

  return (
    <div className={cn(
      "w-full relative",
      isMobileLandscape 
        ? "min-h-full overflow-y-auto" 
        : "h-full"
    )}>
      <Hero personalData={personalData} />
      
      {/* Floating Resume Button */}
      <div className="fixed bottom-20 right-6 z-50">
        <Button
          onClick={handleViewResume}
          variant="outline"
          className={cn(
            "bg-background text-foreground border-2 border-foreground",
            "hover:bg-foreground hover:text-background",
            "px-4 py-2 rounded-md",
            "transition-all duration-200",
            "shadow-sm hover:shadow-md"
          )}
          size="default"
        >
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>View Resume</span>
            <ExternalLink className="h-3 w-3" />
          </div>
        </Button>
      </div>
    </div>
  );
} 