import { useState } from "react";
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
  const { theme } = useTheme();

  const getButtonClasses = () => {
    const baseClasses = "flex items-center gap-3 px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-300 border";
    
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
    <section id="hero" className="h-full flex flex-col justify-center matrix-bg relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-8 flex flex-col justify-center md:pl-8 lg:pl-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {personal_info.full_name}
                </motion.h1>
                <motion.h2 
                  className="text-2xl md:text-3xl font-medium text-primary leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {personal_info.tagline}
                </motion.h2>
              </div>
              
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl text-justify"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {personal_info.short_summary}
              </motion.p>
            </motion.div>
            
            {/* Experience Badge and Contact Button */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/30 shadow-lg backdrop-blur-sm">
                <span className="text-primary font-mono font-semibold text-lg">
                  {personal_info.total_years_of_experience || '0'} Years of Experience
                </span>
              </div>
              <Button 
                size="lg"
                className={getButtonClasses()}
                onClick={() => setIsContactModalOpen(true)}
              >
                <Mail size={20} />
                Contact Me
              </Button>
            </motion.div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-8 border-primary/30 shadow-xl shadow-primary/20 flex items-center justify-center bg-muted">
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
                <div className={`${personal_info.profile_image ? 'hidden' : ''} w-full h-full flex items-center justify-center text-6xl font-bold text-primary`}>
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





