import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useProjectsData from '@/hooks/useProjectsData';
import { ProjectList } from '@/components/projects';

interface ProjectsProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Projects({ setNavbarWelcomeText }: ProjectsProps) {
  const { projectsData, welcomeText, loading, error } = useProjectsData();

  // Update navbar welcome text when projects data loads
  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);

  return (
    <div className="h-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 h-full overflow-y-auto">
        <div className="max-w-6xl mx-auto py-12">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12"
          >
            <span className="text-primary">Projects</span>
          </motion.h2>
          
          {loading ? (
            <div className="text-center text-muted-foreground">
              Loading projects...
            </div>
          ) : error || !projectsData ? (
            <div className="text-center text-muted-foreground">
              {error || 'Failed to load projects data. Please try again later.'}
            </div>
          ) : (
            <ProjectList projects={projectsData.projects} />
          )}
        </div>
      </div>
    </div>
  );
} 