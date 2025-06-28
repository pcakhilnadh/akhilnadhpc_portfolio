import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle, FileText, Code, Cloud, GitBranch, Monitor, Layers } from 'lucide-react';
import { CommonBg, PageHeader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import useConfig from '@/hooks/useConfig';
import { ProjectDetailsHeader, ProjectMetrics } from '@/components/projects/details';

interface ProjectDetailsProps {
  setNavbarWelcomeText: (text: string) => void;
}

interface ProjectDetailsData {
  success: boolean;
  message: string;
  project: {
    id: string;
    title: string;
    short_description: string;
    long_description: string;
    project_type: string;
    status: string;
    github_url?: string;
    live_url?: string;
    notion_url?: string;
    start_date: string;
    end_date?: string;
    role?: string;
    company?: {
      name: string;
      location: string;
    };
    ml_models?: Array<{
      id: string;
      name: string;
      model_type: string;
      framework: string;
      version: string;
      training_data_size: string;
      deployment_status: string;
      description: string;
      evaluation_metrics?: Array<{
        id: string;
        metric_name: string;
        metric_value: number;
        metric_type: string;
      }>;
      use_cases?: any;
      training_parameters?: any;
    }>;
    skills?: Array<{
      id: string;
      name: string;
      rating: number;
    }>;
    achievements?: Array<{
      id: string;
      achievement_title: string;
    }>;
    hosting_platform?: string;
    cicd_pipeline?: string;
    monitoring_tracking?: string;
    duration?: string;
  };
}

export default function ProjectDetails({ setNavbarWelcomeText }: ProjectDetailsProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { config } = useConfig();
  
  const [projectData, setProjectData] = useState<ProjectDetailsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setNavbarWelcomeText('project_details.exe');
  }, [setNavbarWelcomeText]);

  // Track scroll position for enhanced sticky button effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100); // Activate enhanced effect after 100px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      if (!config || !projectId) {
        setError('Configuration not loaded or project ID missing');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${config.api_base_url}/projects/${projectId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: config.username }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ProjectDetailsData = await response.json();
        setProjectData(data);
      } catch (err) {
        console.error('Error fetching project details:', err);
        setError(err instanceof Error ? err.message : 'Failed to load project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [config, projectId]);

  const handleGoBack = () => {
    navigate('/projects');
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-6xl mx-auto py-12">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-lg blur-lg animate-pulse" />
                <div className="relative bg-card/80 border border-primary/40 rounded-lg p-8 backdrop-blur-sm">
                  <Loader2 className="w-12 h-12 text-primary animate-spin mb-4 mx-auto" />
                  <p className="text-primary text-lg font-mono">Decrypting project data...</p>
                  <div className="mt-4 flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !projectData?.success) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-6xl mx-auto py-12">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-destructive/20 rounded-lg blur-lg" />
                <div className="relative bg-card/80 border border-destructive/40 rounded-lg p-8 backdrop-blur-sm text-center">
                  <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                  <h3 className="text-destructive text-lg font-mono mb-2">Access Denied</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    {error || 'Failed to decrypt project data'}
                  </p>
                  <Button 
                    onClick={handleGoBack}
                    className="bg-destructive/20 border border-destructive/40 text-destructive hover:bg-destructive/30"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Return to Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-background relative">
      <CommonBg />
      <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-8"
        >
          {/* Sticky Back Button with Scroll-Enhanced Glossy Effect */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="sticky top-4 z-50 mb-6"
          >
            <div className="relative">
              {/* Enhanced glossy backdrop blur effect - activates on scroll */}
              <div className={cn(
                "absolute inset-0 bg-background/80 backdrop-blur-lg rounded-lg border shadow-xl transition-all duration-500",
                isScrolled 
                  ? "opacity-95 border-primary/40 shadow-2xl shadow-primary/10" 
                  : "opacity-0 border-primary/20 shadow-lg"
              )} />
              
              {/* Enhanced glow effect - more prominent on scroll */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/8 to-accent-indigo/15 rounded-lg blur-lg transition-all duration-500",
                isScrolled ? "opacity-80 scale-110" : "opacity-0 scale-100"
              )} />
              
              {/* Subtle animated border */}
              <div className={cn(
                "absolute inset-0 rounded-lg transition-all duration-500",
                "bg-gradient-to-r from-primary/20 via-secondary/10 to-accent-indigo/20",
                "animate-pulse",
                isScrolled ? "opacity-30" : "opacity-0"
              )} style={{ 
                background: isScrolled 
                  ? 'linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-primary))' 
                  : 'none',
                backgroundSize: '200% 100%',
                animation: isScrolled ? 'gradient-shift 3s ease infinite' : 'none',
                padding: '1px',
                borderRadius: '0.5rem'
              }}>
                <div className="h-full w-full bg-background/20 rounded-lg" />
              </div>
              
              <Button
                onClick={handleGoBack}
                variant="outline"
                className={cn(
                  "relative backdrop-blur-sm border text-foreground transition-all duration-500 group font-medium",
                  "hover:scale-105 hover:shadow-2xl",
                  isScrolled 
                    ? "bg-background/60 border-primary/50 text-primary shadow-xl shadow-primary/20 hover:bg-primary/20 hover:border-primary/70" 
                    : "bg-background/30 border-primary/30 shadow-lg hover:bg-primary/15 hover:border-primary/50 hover:text-primary"
                )}
              >
                <ArrowLeft className={cn(
                  "w-4 h-4 mr-2 transition-all duration-300",
                  "group-hover:-translate-x-1 group-hover:text-primary",
                  isScrolled && "text-primary"
                )} />
                <span className="font-medium relative">
                  Back to Projects
                  {/* Floating text effect on scroll */}
                  {isScrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      className="absolute inset-0 text-primary/60 blur-sm"
                    >
                      Back to Projects
                    </motion.div>
                  )}
                </span>
                
                {/* Enhanced animated underline */}
                <div className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent-indigo transition-all duration-500",
                  isScrolled 
                    ? "w-full opacity-100" 
                    : "w-0 group-hover:w-full opacity-0 group-hover:opacity-100"
                )} />
                
                {/* Pulse effect when scrolled */}
                {isScrolled && (
                  <motion.div
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg"
                  />
                )}
              </Button>
            </div>
          </motion.div>

          {/* Project Header */}
          <ProjectDetailsHeader project={projectData.project} />

          {/* Project Overview */}
          {projectData.project.long_description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-8 group"
            >
              {/* Enhanced Glow effect that intensifies on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent-indigo/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:from-primary/20 group-hover:via-secondary/10 group-hover:to-accent-indigo/20 transition-all duration-500" />
              
              <div className="relative bg-card/80 border border-primary/30 backdrop-blur-md cyberpunk-card rounded-xl overflow-hidden group-hover:bg-card/95 group-hover:border-primary/50 group-hover:backdrop-blur-xl transition-all duration-500">
                <div className="p-8 group-hover:bg-background/10 transition-all duration-500">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/40 group-hover:to-secondary/40 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-500">
                      <FileText className="w-5 h-5 text-primary group-hover:text-primary/90 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-500">Project Overview</h2>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-muted-foreground leading-relaxed text-lg group-hover:text-foreground/85 group-hover:drop-shadow-sm transition-all duration-500">
                      {projectData.project.long_description}
                    </p>
                  </div>
                </div>
                
                {/* Enhanced Corner decorations */}
                <div className="absolute top-0 left-0 w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500">
                  <div className="w-full h-0.5 bg-primary shadow-sm shadow-primary/50 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-primary/70 transition-all duration-500" />
                  <div className="w-0.5 h-full bg-primary shadow-sm shadow-primary/50 group-hover:w-1 group-hover:shadow-lg group-hover:shadow-primary/70 transition-all duration-500" />
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500">
                  <div className="w-full h-0.5 bg-secondary shadow-sm shadow-secondary/50 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-secondary/70 transition-all duration-500" />
                  <div className="w-0.5 h-full ml-auto bg-secondary shadow-sm shadow-secondary/50 group-hover:w-1 group-hover:shadow-lg group-hover:shadow-secondary/70 transition-all duration-500" />
                </div>
                
                {/* Hover highlight overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          )}

          {/* Technologies and Infrastructure Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Tech Stack */}
              {projectData.project.skills && projectData.project.skills.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative group"
                >
                  {/* Enhanced Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-accent-indigo/5 to-highlight/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:from-secondary/20 group-hover:via-accent-indigo/10 group-hover:to-highlight/20 transition-all duration-500" />
                  
                  <Card className="relative bg-card/80 border border-secondary/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-secondary/50 group-hover:backdrop-blur-xl transition-all duration-500">
                    <CardHeader className="group-hover:bg-background/10 transition-all duration-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-accent-indigo/20 border border-secondary/40 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-secondary/40 group-hover:to-accent-indigo/40 group-hover:border-secondary/60 group-hover:shadow-lg group-hover:shadow-secondary/25 transition-all duration-500">
                          <Code className="w-5 h-5 text-secondary group-hover:text-secondary/90 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-foreground group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-500">Technologies Used</CardTitle>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-all duration-500">{projectData.project.skills.length} technologies</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="group-hover:bg-background/5 transition-all duration-500">
                      <div className="flex flex-wrap gap-3">
                        {projectData.project.skills
                          .sort((a, b) => b.rating - a.rating)
                          .map((skill, index) => (
                          <motion.div
                            key={skill.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                            className="group/skill"
                          >
                            <div className="cyberpunk-badge bg-gradient-to-r from-secondary/20 to-accent-indigo/20 border border-secondary/40 text-secondary hover:border-secondary/70 hover:shadow-xl hover:shadow-secondary/30 transition-all duration-300 hover:scale-110 cursor-default group-hover:bg-gradient-to-r group-hover:from-secondary/30 group-hover:to-accent-indigo/30 group-hover:border-secondary/60 group-hover:text-secondary/95">
                              <div className="flex items-center space-x-2">
                                <Code className="w-3 h-3 group-hover:scale-105 transition-all duration-300" />
                                <span className="font-medium group-hover:font-semibold transition-all duration-300">{skill.name}</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                    
                    {/* Enhanced Corner decorations */}
                    <div className="absolute top-0 left-0 w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500">
                      <div className="w-full h-0.5 bg-secondary shadow-sm shadow-secondary/50 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-secondary/70 transition-all duration-500" />
                      <div className="w-0.5 h-full bg-secondary shadow-sm shadow-secondary/50 group-hover:w-1 group-hover:shadow-lg group-hover:shadow-secondary/70 transition-all duration-500" />
                    </div>
                    <div className="absolute top-0 right-0 w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500">
                      <div className="w-full h-0.5 bg-accent-indigo shadow-sm shadow-accent-indigo/50 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-accent-indigo/70 transition-all duration-500" />
                      <div className="w-0.5 h-full ml-auto bg-accent-indigo shadow-sm shadow-accent-indigo/50 group-hover:w-1 group-hover:shadow-lg group-hover:shadow-accent-indigo/70 transition-all duration-500" />
                    </div>
                    
                    {/* Hover highlight overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent-indigo/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                  </Card>
                </motion.div>
              )}

              {/* Infrastructure & DevOps */}
              {(projectData.project.hosting_platform || projectData.project.cicd_pipeline || projectData.project.monitoring_tracking) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="relative xl:col-span-2 group"
                >
                  {/* Enhanced Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/10 via-highlight/5 to-soft/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:from-accent-indigo/20 group-hover:via-highlight/10 group-hover:to-soft/20 transition-all duration-500" />
                  
                  <Card className="relative bg-card/80 border border-accent-indigo/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-accent-indigo/50 group-hover:backdrop-blur-xl transition-all duration-500">
                    <CardHeader className="group-hover:bg-background/10 transition-all duration-500">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-accent-indigo/20 to-highlight/20 border border-accent-indigo/40 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent-indigo/40 group-hover:to-highlight/40 group-hover:border-accent-indigo/60 group-hover:shadow-lg group-hover:shadow-accent-indigo/25 transition-all duration-500">
                          <Layers className="w-5 h-5 text-accent-indigo group-hover:text-accent-indigo/90 group-hover:scale-110 transition-all duration-500" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-foreground group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-500">Infrastructure</CardTitle>
                          <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-all duration-500">DevOps & Deployment</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="group-hover:bg-background/5 transition-all duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Hosting Platform */}
                        {projectData.project.hosting_platform && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.7 }}
                            className="cyberpunk-info-card group/item text-center hover:bg-background/20 transition-all duration-300"
                          >
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-accent-indigo/20 to-highlight/20 border border-accent-indigo/40 rounded-lg flex items-center justify-center group-hover/item:shadow-xl group-hover/item:shadow-accent-indigo/30 group-hover/item:scale-105 transition-all duration-300">
                                <Cloud className="w-6 h-6 text-accent-indigo group-hover/item:scale-110 transition-all duration-300" />
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide block mb-2 group-hover:text-foreground/80 transition-all duration-300">Hosting</span>
                                <Badge className="cyberpunk-badge bg-accent-indigo/20 text-accent-indigo border-accent-indigo/40 text-sm group-hover/item:bg-accent-indigo/30 group-hover/item:border-accent-indigo/60 group-hover/item:shadow-lg transition-all duration-300">
                                  {projectData.project.hosting_platform.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* CI/CD Pipeline */}
                        {projectData.project.cicd_pipeline && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.8 }}
                            className="cyberpunk-info-card group/item text-center hover:bg-background/20 transition-all duration-300"
                          >
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-highlight/20 to-soft/20 border border-highlight/40 rounded-lg flex items-center justify-center group-hover/item:shadow-xl group-hover/item:shadow-highlight/30 group-hover/item:scale-105 transition-all duration-300">
                                <GitBranch className="w-6 h-6 text-highlight group-hover/item:scale-110 transition-all duration-300" />
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide block mb-2 group-hover:text-foreground/80 transition-all duration-300">CI/CD</span>
                                <Badge className="cyberpunk-badge bg-highlight/20 text-highlight border-highlight/40 text-sm group-hover/item:bg-highlight/30 group-hover/item:border-highlight/60 group-hover/item:shadow-lg transition-all duration-300">
                                  {projectData.project.cicd_pipeline.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Monitoring */}
                        {projectData.project.monitoring_tracking && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.9 }}
                            className="cyberpunk-info-card group/item text-center hover:bg-background/20 transition-all duration-300"
                          >
                            <div className="flex flex-col items-center space-y-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-soft/20 to-primary/20 border border-soft/40 rounded-lg flex items-center justify-center group-hover/item:shadow-xl group-hover/item:shadow-soft/30 group-hover/item:scale-105 transition-all duration-300">
                                <Monitor className="w-6 h-6 text-soft group-hover/item:scale-110 transition-all duration-300" />
                              </div>
                              <div>
                                <span className="text-xs text-muted-foreground uppercase tracking-wide block mb-2 group-hover:text-foreground/80 transition-all duration-300">Monitoring</span>
                                <Badge className="cyberpunk-badge bg-soft/20 text-soft border-soft/40 text-sm group-hover/item:bg-soft/30 group-hover/item:border-soft/60 group-hover/item:shadow-lg transition-all duration-300">
                                  {projectData.project.monitoring_tracking.replace('-', ' ').toUpperCase()}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </CardContent>
                    
                    {/* Enhanced Corner decorations */}
                    <div className="absolute top-0 left-0 w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500">
                      <div className="w-full h-0.5 bg-accent-indigo shadow-sm shadow-accent-indigo/50 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-accent-indigo/70 transition-all duration-500" />
                      <div className="w-0.5 h-full bg-accent-indigo shadow-sm shadow-accent-indigo/50 group-hover:w-1 group-hover:shadow-lg group-hover:shadow-accent-indigo/70 transition-all duration-500" />
                    </div>
                    <div className="absolute top-0 right-0 w-6 h-6 group-hover:w-8 group-hover:h-8 transition-all duration-500">
                      <div className="w-full h-0.5 bg-highlight shadow-sm shadow-highlight/50 group-hover:h-1 group-hover:shadow-lg group-hover:shadow-highlight/70 transition-all duration-500" />
                      <div className="w-0.5 h-full ml-auto bg-highlight shadow-sm shadow-highlight/50 group-hover:w-1 group-hover:shadow-lg group-hover:shadow-highlight/70 transition-all duration-500" />
                    </div>
                    
                    {/* Hover highlight overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/5 via-transparent to-highlight/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
                  </Card>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Project Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <ProjectMetrics project={projectData.project} />
          </motion.div>



          {/* Bottom spacing */}
          <div className="h-16" />
        </motion.div>
      </div>
    </div>
  );
} 