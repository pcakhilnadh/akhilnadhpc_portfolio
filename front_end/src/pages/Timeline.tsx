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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12">
            <Skeleton className="h-12 w-48 mx-auto mb-12" />
            <div className="space-y-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !timelineData) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-primary">Experience</span> Timeline
              </h2>
              <p className="text-muted-foreground">
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
          className="max-w-4xl mx-auto py-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary">Experience</span> Timeline
          </h2>
          
          <div className="space-y-8">
            {timelineData.experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass p-8 rounded-lg"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-primary">{exp.title}</h3>
                  <span className="text-muted-foreground font-mono">{exp.period}</span>
                </div>
                <h4 className="text-lg text-foreground mb-3">{exp.company}</h4>
                <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-primary mb-2">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-primary mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                      {exp.achievements.map((achievement: string, i: number) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
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