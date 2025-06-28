import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, MapPin, Users, Zap, Globe, GitBranch, Activity, Terminal, Building2, Clock, Code, Trophy, Rocket, Database, Server, Brain, Target, Settings, Cloud, GitMerge, Lock } from 'lucide-react';
import { Project } from '@/types/data';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-4xl w-full h-[80vh] bg-background/95 border border-primary/40 backdrop-blur-sm p-0 rounded-lg flex flex-col">
            {/* Header - Fixed height */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 border-b border-primary/40 p-4 rounded-t-lg h-16 flex items-center flex-shrink-0">
              <div className="flex items-center justify-between w-full min-w-0">
                {/* Window Control Buttons */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 bg-destructive rounded-full hover:bg-destructive/80 transition-colors duration-200"
                  />
                  <div className="w-3 h-3 bg-accent rounded-full opacity-50" />
                  <div className="w-3 h-3 bg-primary rounded-full opacity-50" />
                </div>
                
                {/* Project Title */}
                <div className="flex items-center space-x-3 min-w-0 flex-1 mx-4">
                  <span className="text-primary font-mono font-bold text-lg truncate">{project.title}</span>
                  {project.project_type && (
                    <Badge
                      className={`font-mono text-xs px-2 py-1 border flex-shrink-0 ${
                        project.project_type === 'production'
                          ? 'bg-tertiary/20 text-tertiary border-tertiary/40'
                          : project.project_type === 'development'
                          ? 'bg-secondary/20 text-secondary border-secondary/40'
                          : project.project_type === 'poc'
                          ? 'bg-accent/20 text-accent border-accent/40'
                          : project.project_type === 'mvp'
                          ? 'bg-secondary/20 text-secondary border-secondary/40'
                          : 'bg-muted/20 text-muted-foreground border-muted/40'
                      }`}
                    >
                      {project.project_type.toUpperCase()}
                    </Badge>
                  )}
                </div>
                
                {/* External Link Icon */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary/20 border border-primary/40 rounded hover:bg-primary/30 hover:border-primary transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4 text-primary" />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-accent/20 border border-accent/40 rounded hover:bg-accent/30 hover:border-accent transition-all duration-300"
                    >
                      <Github className="h-4 w-4 text-secondary" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Content Area - Fill remaining space */}
            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="overview" className="h-full flex flex-col">
                {/* Tab Navigation - Fixed height */}
                <div className="border-b border-primary/20 bg-background/20 h-12 flex-shrink-0">
                  <TabsList className="bg-transparent border-none p-0 h-full w-full">
                    <TabsTrigger 
                      value="overview" 
                      className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary text-muted-foreground font-mono text-sm px-4 py-2 rounded-none border-r border-primary/20 h-full flex-1 flex items-center justify-center space-x-2"
                    >
                      <Terminal className="h-4 w-4" />
                      <span>Overview</span>
                    </TabsTrigger>
                    {project.company ? (
                      <div
                        className="flex-1 h-full flex items-center justify-center space-x-2 font-mono text-sm px-4 py-2 text-muted-foreground cursor-not-allowed"
                        title="Details Hidden for Professional projects"
                      >
                        <Lock className="h-4 w-4" />
                        <span>Details</span>
                      </div>
                    ) : (
                      <TabsTrigger 
                        value="details" 
                        className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary text-muted-foreground font-mono text-sm px-4 py-2 rounded-none h-full flex-1 flex items-center justify-center space-x-2"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Details</span>
                      </TabsTrigger>
                    )}
                  </TabsList>
                </div>

                {/* Tab Content - Scrollable area */}
                <div className="flex-1">
                  {/* Overview Tab */}
                  <TabsContent value="overview" className="p-0 m-0 h-[calc(80vh-112px)] overflow-y-auto scrollbar-thin scrollbar-thumb-primary/50 scrollbar-track-transparent">
                    <div className="p-5 space-y-4">
                      {/* Description */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-primary/5 border border-primary/20 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <Terminal className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-primary font-mono font-semibold text-sm mb-2">Description</h3>
                            <p className="text-muted-foreground font-mono text-xs leading-relaxed">
                              {project.short_description}
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {/* Company Info */}
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-accent/5 border border-accent/20 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <Building2 className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-secondary font-mono font-semibold text-sm mb-2">Company</h3>
                              <div className="space-y-1">
                                {project.company && (
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-foreground">{project.company.name}</span>
                                    {project.company.location && (
                                      <div className="text-muted-foreground">{project.company.location}</div>
                                    )}
                                  </div>
                                )}
                                {project.role && (
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-muted-foreground">Role:</span> <span className="text-foreground">{project.role}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Timeline */}
                        <motion.div 
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                          className="bg-secondary/5 border border-secondary/20 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <Clock className="h-4 w-4 text-secondary-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-secondary-foreground font-mono font-semibold text-sm mb-2">Timeline</h3>
                              <div className="space-y-1">
                                {project.duration && (
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary-foreground">Duration:</span> <span className="text-foreground">{project.duration}</span>
                                  </div>
                                )}
                                <div className="text-muted-foreground font-mono text-xs">
                                  <span className="text-secondary-foreground">Period:</span> <span className="text-foreground">{project.start_date} {project.end_date && `→ ${project.end_date}`}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Tech Stack */}
                      {project.skills && project.skills.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="bg-muted/5 border border-muted/20 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <Code className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-muted-foreground font-mono font-semibold text-sm mb-3">Tech Stack</h3>
                              <div className="flex flex-wrap gap-2">
                                {project.skills.map((skill, index) => (
                                  <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + index * 0.03 }}
                                  >
                                    <Badge className="bg-muted/20 text-muted-foreground border border-muted/40 font-mono text-xs hover:bg-muted/30 transition-colors">
                                      {skill.name}
                                    </Badge>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Deployment Row */}
                      {(project.hosting_platform || project.cicd_pipeline) && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {/* Deployment Platform */}
                          {project.hosting_platform && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 }}
                              className="bg-primary/5 border border-primary/20 rounded-lg p-4"
                            >
                              <div className="flex items-start space-x-3">
                                <Cloud className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-primary font-mono font-semibold text-sm mb-2">Hosting</h3>
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-foreground">{project.hosting_platform}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}

                          {/* CI/CD Pipeline */}
                          {project.cicd_pipeline && (
                            <motion.div 
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 }}
                              className="bg-accent/5 border border-accent/20 rounded-lg p-4"
                            >
                              <div className="flex items-start space-x-3">
                                <GitMerge className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-secondary font-mono font-semibold text-sm mb-2">CI/CD</h3>
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-foreground">{project.cicd_pipeline}</span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}

                      {/* Achievements */}
                      {project.achievements && project.achievements.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                          className="bg-secondary/5 border border-secondary/20 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <Trophy className="h-4 w-4 text-secondary-foreground mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-secondary-foreground font-mono font-semibold text-sm mb-3">Achievements</h3>
                              <div className="space-y-3">
                                {project.achievements.map((achievement, index) => (
                                  <motion.div 
                                    key={achievement.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.1 }}
                                    className="border-l-2 border-secondary-foreground/60 pl-3"
                                  >
                                    <div className="text-secondary-foreground font-mono font-semibold text-xs mb-1">
                                      {achievement.achievement_title}
                                    </div>
                                    <div className="text-muted-foreground font-mono text-xs mb-2 leading-relaxed opacity-90">
                                      {achievement.achievement_description}
                                    </div>
                                    {achievement.impact_metrics && (
                                      <div className="bg-secondary/10 border border-secondary/30 rounded px-2 py-1 inline-block">
                                        <span className="text-secondary-foreground font-mono text-xs">
                                          📊 {achievement.impact_metrics}
                                        </span>
                                      </div>
                                    )}
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>

                  {/* Details Tab */}
                  <TabsContent value="details" className="p-0 m-0 h-[calc(80vh-112px)] overflow-y-auto scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent">
                    <div className="p-5 space-y-4">
                      {/* Project Links */}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-primary/5 border border-primary/20 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-3">
                          <Globe className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-primary font-mono font-semibold text-sm mb-3">Project Links</h3>
                            <div className="flex flex-wrap gap-3">
                              {project.github_url && (
                                <motion.a
                                  href={project.github_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 bg-primary/20 border border-primary/40 rounded-lg px-3 py-2 hover:bg-primary/30 transition-all duration-300 group"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <Github className="h-4 w-4 text-primary" />
                                  <span className="text-primary font-mono text-xs">Source Code</span>
                                </motion.a>
                              )}
                              {project.live_url && (
                                <motion.a
                                  href={project.live_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 bg-accent/20 border border-accent/40 rounded-lg px-3 py-2 hover:bg-accent/30 transition-all duration-300 group"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <ExternalLink className="h-4 w-4 text-secondary" />
                                  <span className="text-secondary font-mono text-xs">Live Demo</span>
                                </motion.a>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* ML Model Information */}
                      {project.ml_models && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="bg-accent/5 border border-accent/20 rounded-lg p-4"
                        >
                          <div className="flex items-start space-x-3">
                            <Brain className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h3 className="text-secondary font-mono font-semibold text-sm mb-3">ML Model</h3>
                              
                              {/* Model Basic Info */}
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary">Model:</span> <span className="text-foreground">{project.ml_models.name}</span>
                                  </div>
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary">Type:</span> <span className="text-foreground">{project.ml_models.model_type}</span>
                                  </div>
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary">Framework:</span> <span className="text-foreground">{project.ml_models.framework}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary">Accuracy:</span> <span className="text-foreground">{(project.ml_models.accuracy * 100).toFixed(1)}%</span>
                                  </div>
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary">Data Size:</span> <span className="text-foreground">{project.ml_models.training_data_size}</span>
                                  </div>
                                  <div className="text-muted-foreground font-mono text-xs">
                                    <span className="text-secondary">Status:</span> <span className="text-foreground">{project.ml_models.deployment_status}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Use Cases */}
                              {project.ml_models.use_cases && project.ml_models.use_cases.length > 0 && (
                                <div className="mb-4">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Target className="h-3 w-3 text-secondary" />
                                    <h4 className="text-secondary font-mono font-semibold text-xs">Use Cases</h4>
                                  </div>
                                  <div className="space-y-2">
                                    {project.ml_models.use_cases.map((useCase, index) => (
                                      <motion.div 
                                        key={useCase.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="bg-accent/10 border border-accent/30 rounded p-2"
                                      >
                                        <div className="text-foreground font-mono font-semibold text-xs mb-1">
                                          {useCase.use_case_name}
                                        </div>
                                        <div className="text-muted-foreground font-mono text-xs leading-relaxed opacity-90">
                                          {useCase.business_impact}
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Training Parameters */}
                              {project.ml_models.training_parameters && project.ml_models.training_parameters.length > 0 && (
                                <div>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Settings className="h-3 w-3 text-secondary" />
                                    <h4 className="text-secondary font-mono font-semibold text-xs">Parameters</h4>
                                  </div>
                                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    {project.ml_models.training_parameters.map((param, index) => (
                                      <motion.div 
                                        key={param.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.05 }}
                                        className="bg-accent/5 border border-accent/20 rounded p-2"
                                      >
                                        <div className="text-muted-foreground font-mono text-xs">
                                          <span className="text-accent-foreground">{param.parameter_name}:</span> <span className="text-foreground">{param.parameter_value}</span>
                                        </div>
                                        <div className="text-accent-foreground/50 text-xs opacity-70">
                                          {param.parameter_type}
                                        </div>
                                      </motion.div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal; 