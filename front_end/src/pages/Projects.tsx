import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useProjectsData from '@/hooks/useProjectsData';
import { ProjectList } from '@/components/projects';
import { PageHeader, CommonBg } from '@/components/common';
import { PageMeta } from '@/components/common';

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
    <>
      <PageMeta
        title="Data Science Projects - Akhil Nadh PC"
        description="Browse a collection of data science and machine learning projects by Akhil Nadh PC, showcasing skills in model development, data analysis, and more."
        keywords="data science projects, machine learning projects, AI projects, Akhil Nadh PC portfolio"
      />
      <div className="h-full bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-6xl mx-auto py-8">
          
          {/* Page Header */}
          <PageHeader 
            title="Projects"
          />

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-primary text-lg">Loading projects...</p>
            </div>
          ) : error || !projectsData ? (
            <div className="text-center py-20">
              <PageHeader 
                title="Error Loading Projects"
                description={error || 'Failed to load projects data. Please try again later.'}
                showUnderline={false}
              />
              <motion.button 
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-destructive/20 border border-destructive/40 text-destructive px-6 py-3 rounded-lg hover:bg-destructive/30 transition-colors mt-6"
              >
                Retry
              </motion.button>
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
      </div>
    </>
  );
} 