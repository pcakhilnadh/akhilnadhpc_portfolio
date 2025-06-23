import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import useProjectsData from '@/hooks/useProjectsData';
import { Skeleton } from '@/components/ui/skeleton';

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

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-6xl mx-auto py-12">
            <Skeleton className="h-12 w-48 mx-auto mb-12" />
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-64" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !projectsData) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-6xl mx-auto py-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-primary">Projects</span>
              </h2>
              <p className="text-muted-foreground">
                {error || 'Failed to load projects data. Please try again later.'}
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
          className="max-w-6xl mx-auto py-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary">Projects</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projectsData.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-lg hover:glow transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-primary mb-4">{project.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills?.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full font-mono"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-4">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span className="text-sm">Code</span>
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">Live</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 