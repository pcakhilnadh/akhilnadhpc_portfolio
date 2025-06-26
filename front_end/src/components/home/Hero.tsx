import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Mail, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserProfile } from "@/types/data";
import { ContactModal } from "@/components/common/index";
import { useTheme } from "@/hooks/useTheme";

interface HeroProps {
  personalData: UserProfile;
}

export default function Hero({ personalData }: HeroProps) {
  const { personal_info } = personalData;
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);
  const { theme } = useTheme();

  // Check for mobile landscape mode
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

  const getButtonClasses = () => {
    const baseClasses = "flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-semibold shadow-lg transition-all duration-300 border w-full sm:w-auto justify-center sm:justify-start";
    
    if (theme === 'dark') {
      return cn(
        baseClasses,
        "bg-primary text-primary-foreground",
        "hover:bg-green-600 hover:shadow-green-500/25",
        "hover:scale-105 hover:shadow-xl",
        "active:scale-95",
        "border-green-500/30 hover:border-green-400/50"
      );
    } else {
      return cn(
        baseClasses,
        "bg-green-600 text-white",
        "hover:bg-green-700 hover:shadow-green-600/20",
        "hover:scale-105 hover:shadow-xl",
        "active:scale-95",
        "border-green-600/30 hover:border-green-500/50"
      );
    }
  };

  const scrollToProjects = () => {
    window.location.hash = "projects";
  };

  return (
    <section 
      id="hero" 
      className={cn(
        "w-full matrix-bg relative",
        isMobileLandscape 
          ? "min-h-screen py-4 overflow-y-auto" 
          : "h-full flex items-center justify-center"
      )}
    >
      <div className={cn(
        "container mx-auto px-4 sm:px-6 lg:px-8",
        isMobileLandscape 
          ? "min-h-full flex items-start py-4" 
          : "h-full flex items-center"
      )}>
        <div className={cn(
          "w-full flex items-center justify-between",
          isMobileLandscape 
            ? "flex-row gap-4" 
            : "flex-col lg:flex-row gap-8 lg:gap-12"
        )}>
          
          {/* Content Section */}
          <div className={cn(
            "flex flex-col justify-center",
            isMobileLandscape 
              ? "w-2/3 space-y-3 text-left order-1" 
              : "w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
          )}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className={cn(
                isMobileLandscape ? "space-y-2" : "space-y-4 lg:space-y-6"
              )}
            >
              <div className={cn(
                isMobileLandscape ? "space-y-1" : "space-y-3 lg:space-y-4"
              )}>
                <motion.h1 
                  className={cn(
                    "font-bold text-foreground leading-tight",
                    isMobileLandscape 
                      ? "text-xl sm:text-2xl md:text-3xl" 
                      : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  )}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {personal_info.full_name}
                </motion.h1>
                <motion.h2 
                  className={cn(
                    "font-medium text-primary leading-relaxed",
                    isMobileLandscape 
                      ? "text-sm sm:text-base" 
                      : "text-lg sm:text-xl md:text-2xl lg:text-3xl"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {personal_info.tagline}
                </motion.h2>
              </div>
              
              <motion.p 
                className={cn(
                  "text-muted-foreground leading-relaxed text-justify lg:text-left",
                  isMobileLandscape 
                    ? "text-xs sm:text-sm max-w-none" 
                    : "text-sm sm:text-base lg:text-lg xl:text-xl max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {isMobileLandscape 
                  ? personal_info.short_summary?.slice(0, 150) + "..." 
                  : personal_info.short_summary
                }
              </motion.p>
            </motion.div>
            
            {/* Experience Badge and Contact Button */}
            <motion.div
              className={cn(
                "flex items-center",
                isMobileLandscape 
                  ? "gap-2 flex-row flex-wrap" 
                  : "flex-col sm:flex-row flex-wrap gap-4 lg:gap-6"
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className={cn(
                "inline-flex items-center rounded-full bg-primary/10 border border-primary/30 shadow-lg backdrop-blur-sm",
                isMobileLandscape 
                  ? "px-2 py-1" 
                  : "px-4 sm:px-6 py-2 sm:py-3"
              )}>
                <span className={cn(
                  "text-primary font-mono font-semibold",
                  isMobileLandscape 
                    ? "text-xs" 
                    : "text-sm sm:text-base lg:text-lg"
                )}>
                  {personal_info.total_years_of_experience || '0'} Years
                </span>
              </div>
              <Button 
                size={isMobileLandscape ? "sm" : "lg"}
                className={cn(
                  getButtonClasses(),
                  isMobileLandscape && "px-3 py-1.5 text-xs gap-1"
                )}
                onClick={() => setIsContactModalOpen(true)}
              >
                <Mail size={isMobileLandscape ? 12 : 16} className="sm:w-5 sm:h-5" />
                Contact
              </Button>
            </motion.div>
          </div>

          {/* Image Section */}
          <div className={cn(
            "flex justify-center",
            isMobileLandscape 
              ? "w-1/3 order-2" 
              : "w-full lg:w-1/2 order-1 lg:order-2"
          )}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <div className={cn(
                "rounded-full overflow-hidden border-primary/30 shadow-xl shadow-primary/20 flex items-center justify-center bg-muted",
                isMobileLandscape 
                  ? "w-24 h-24 sm:w-32 sm:h-32 border-2" 
                  : "w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 border-4 sm:border-6 lg:border-8"
              )}>
                {personal_info.profile_image ? (
                  <img 
                    src={personal_info.profile_image} 
                    alt={personal_info.full_name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div className={cn(
                  "w-full h-full flex items-center justify-center font-bold text-primary",
                  personal_info.profile_image ? 'hidden' : '',
                  isMobileLandscape 
                    ? "text-lg" 
                    : "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                )}>
                  {personal_info.full_name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        personalData={personalData}
      />
    </section>
  );
}





