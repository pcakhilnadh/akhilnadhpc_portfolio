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
    <div className="h-full w-full overflow-y-auto">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Simple Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-green-400">Projects</span>
          </h1>
          
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-3 border-green-500/30 border-t-green-400 rounded-full animate-spin mb-4" />
            <p className="text-green-400 text-lg">Loading projects...</p>
          </div>
        ) : error || !projectsData ? (
          <div className="text-center py-20">
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-400 mb-4">⚠️ Error loading projects</p>
              <p className="text-muted-foreground text-sm mb-4">
                {error || 'Failed to load projects data. Please try again later.'}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2 rounded hover:bg-red-500/30 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ProjectList projects={projectsData.projects} />
          </motion.div>
        )}
        
        {/* Add some bottom padding to ensure last item is fully visible */}
        <div className="h-8" />
      </div>
    </div>
  );
} 