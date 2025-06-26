import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useTimelineData from '@/hooks/useTimelineData';
import { Skeleton } from '@/components/ui/skeleton';

interface TimelineProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Timeline({ setNavbarWelcomeText }: TimelineProps) {
  const { timelineData, welcomeText, loading, error } = useTimelineData();

  // Update navbar welcome text when timeline data loads
  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-4">
        <div className="container mx-auto h-full overflow-y-auto">
          <div className="max-w-5xl mx-auto py-8 lg:py-12">
            <Skeleton className="h-8 sm:h-12 w-40 sm:w-48 mx-auto mb-8 lg:mb-12" />
            <div className="space-y-6 lg:space-y-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-28 sm:h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !timelineData) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-4">
        <div className="container mx-auto h-full overflow-y-auto">
          <div className="max-w-5xl mx-auto py-8 lg:py-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                <span className="text-primary">Experience</span> Timeline
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {error || 'Failed to load timeline data. Please try again later.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 h-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto py-8 lg:py-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
            <span className="text-primary">Experience</span> Timeline
          </h2>
          
          <div className="space-y-6 lg:space-y-8">
            {timelineData.experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass p-4 sm:p-6 lg:p-8 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-primary mb-1 sm:mb-2">
                      {exp.title}
                    </h3>
                    <h4 className="text-base sm:text-lg text-foreground font-medium">
                      {exp.company}
                    </h4>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="text-xs sm:text-sm text-muted-foreground font-mono bg-muted/50 px-2 sm:px-3 py-1 rounded-full">
                      {exp.start_date} - {exp.end_date || 'Present'}
                    </span>
                  </div>
                </div>
                
                {exp.company_url && (
                  <div className="mt-3 sm:mt-4">
                    <a
                      href={exp.company_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-xs sm:text-sm font-medium transition-colors duration-200"
                    >
                      Visit Company Website →
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 