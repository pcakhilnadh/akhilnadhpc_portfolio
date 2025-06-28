import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Building2, 
  User, 
  Clock, 
  ExternalLink, 
  Github, 
  FileText,
  Zap,
  Play,
  Globe,
  MapPin
} from 'lucide-react';

interface ProjectDetailsHeaderProps {
  project: {
    id: string;
    title: string;
    short_description: string;
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
    duration?: string;
  };
}

export default function ProjectDetailsHeader({ project }: ProjectDetailsHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/3 to-accent-indigo/5 rounded-xl blur-xl opacity-60" />
      
      {/* Main header container */}
      <div className="relative bg-card/90 border border-primary/20 rounded-xl backdrop-blur-sm overflow-hidden">

        {/* Content */}
        <div className="relative p-8">
          {/* Project title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent-indigo bg-clip-text text-transparent leading-tight"
          >
            {project.title}
          </motion.h1>

          {/* Project description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-4xl"
          >
            {project.short_description}
          </motion.p>

          {/* Project metadata - Compact 3-column layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Company */}
              <div className="bg-gradient-to-br from-secondary/10 to-accent-indigo/10 border border-secondary/30 rounded-lg p-4 backdrop-blur-sm hover:border-secondary/60 hover:bg-gradient-to-br hover:from-secondary/20 hover:to-accent-indigo/20 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 group/company">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-secondary/20 to-accent-indigo/20 border border-secondary/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/company:bg-gradient-to-br group-hover/company:from-secondary/40 group-hover/company:to-accent-indigo/40 group-hover/company:border-secondary/60 group-hover/company:scale-110 transition-all duration-300">
                    <Building2 className="w-4 h-4 text-secondary group-hover/company:scale-110 transition-all duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 group-hover/company:text-foreground/80 transition-all duration-300">Company</p>
                    <p className="text-sm font-bold text-foreground truncate group-hover/company:text-foreground/95 group-hover/company:drop-shadow-sm transition-all duration-300">
                      {project.company?.name || 'Personal Project'}
                    </p>
                    {project.company?.location && (
                      <div className="flex items-center space-x-1 text-muted-foreground mt-0.5 group-hover/company:text-foreground/70 transition-all duration-300">
                        <MapPin className="w-3 h-3 flex-shrink-0 group-hover/company:scale-110 transition-all duration-300" />
                        <span className="text-xs truncate">{project.company.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="bg-gradient-to-br from-primary/10 to-highlight/10 border border-primary/30 rounded-lg p-4 backdrop-blur-sm hover:border-primary/60 hover:bg-gradient-to-br hover:from-primary/20 hover:to-highlight/20 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group/role">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-highlight/20 border border-primary/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/role:bg-gradient-to-br group-hover/role:from-primary/40 group-hover/role:to-highlight/40 group-hover/role:border-primary/60 group-hover/role:scale-110 transition-all duration-300">
                    <User className="w-4 h-4 text-primary group-hover/role:scale-110 transition-all duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 group-hover/role:text-foreground/80 transition-all duration-300">Role</p>
                    <p className="text-sm font-bold text-foreground truncate group-hover/role:text-foreground/95 group-hover/role:drop-shadow-sm transition-all duration-300">
                      {project.role || 'Developer'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gradient-to-br from-highlight/10 to-muted/10 border border-highlight/30 rounded-lg p-4 backdrop-blur-sm hover:border-highlight/60 hover:bg-gradient-to-br hover:from-highlight/20 hover:to-muted/20 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg hover:shadow-highlight/20 transition-all duration-300 group/timeline">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-highlight/20 to-muted/20 border border-highlight/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/timeline:bg-gradient-to-br group-hover/timeline:from-highlight/40 group-hover/timeline:to-muted/40 group-hover/timeline:border-highlight/60 group-hover/timeline:scale-110 transition-all duration-300">
                    <Calendar className="w-4 h-4 text-highlight group-hover/timeline:scale-110 transition-all duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 group-hover/timeline:text-foreground/80 transition-all duration-300">Timeline</p>
                    <div className="flex items-center space-x-1">
                      <p className="text-sm font-bold text-foreground group-hover/timeline:text-foreground/95 group-hover/timeline:drop-shadow-sm transition-all duration-300">
                        {formatDate(project.start_date)}
                      </p>
                      {project.end_date && (
                        <>
                          <span className="text-muted-foreground text-xs group-hover/timeline:text-foreground/70 transition-all duration-300">→</span>
                          <p className="text-sm font-bold text-foreground group-hover/timeline:text-foreground/95 group-hover/timeline:drop-shadow-sm transition-all duration-300">
                            {formatDate(project.end_date)}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-gradient-to-br from-accent-indigo/10 to-secondary/10 border border-accent-indigo/30 rounded-lg p-4 backdrop-blur-sm hover:border-accent-indigo/60 hover:bg-gradient-to-br hover:from-accent-indigo/20 hover:to-secondary/20 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg hover:shadow-accent-indigo/20 transition-all duration-300 group/status">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-accent-indigo/20 to-secondary/20 border border-accent-indigo/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/status:bg-gradient-to-br group-hover/status:from-accent-indigo/40 group-hover/status:to-secondary/40 group-hover/status:border-accent-indigo/60 group-hover/status:scale-110 transition-all duration-300">
                    <Play className="w-4 h-4 text-accent-indigo group-hover/status:scale-110 transition-all duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 group-hover/status:text-foreground/80 transition-all duration-300">Status</p>
                    <p className="text-sm font-bold text-foreground truncate group-hover/status:text-foreground/95 group-hover/status:drop-shadow-sm transition-all duration-300">{project.status}</p>
                  </div>
                </div>
              </div>

              {/* Type */}
              <div className="bg-gradient-to-br from-muted/10 to-primary/10 border border-muted/30 rounded-lg p-4 backdrop-blur-sm hover:border-muted/60 hover:bg-gradient-to-br hover:from-muted/20 hover:to-primary/20 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg hover:shadow-muted/20 transition-all duration-300 group/type">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-muted/20 to-primary/20 border border-muted/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/type:bg-gradient-to-br group-hover/type:from-muted/40 group-hover/type:to-primary/40 group-hover/type:border-muted/60 group-hover/type:scale-110 transition-all duration-300">
                    <Zap className="w-4 h-4 text-muted-foreground group-hover/type:scale-110 transition-all duration-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 group-hover/type:text-foreground/80 transition-all duration-300">Type</p>
                    <p className="text-sm font-bold text-foreground truncate group-hover/type:text-foreground/95 group-hover/type:drop-shadow-sm transition-all duration-300">{project.project_type.toUpperCase()}</p>
                  </div>
                </div>
              </div>

              {/* Duration - if available */}
              {project.duration && (
                <div className="bg-gradient-to-br from-soft/10 to-accent-indigo/10 border border-soft/30 rounded-lg p-4 backdrop-blur-sm hover:border-soft/60 hover:bg-gradient-to-br hover:from-soft/20 hover:to-accent-indigo/20 hover:backdrop-blur-lg hover:scale-105 hover:shadow-lg hover:shadow-soft/20 transition-all duration-300 group/duration">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-soft/20 to-accent-indigo/20 border border-soft/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/duration:bg-gradient-to-br group-hover/duration:from-soft/40 group-hover/duration:to-accent-indigo/40 group-hover/duration:border-soft/60 group-hover/duration:scale-110 transition-all duration-300">
                      <Clock className="w-4 h-4 text-soft group-hover/duration:scale-110 transition-all duration-300" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 group-hover/duration:text-foreground/80 transition-all duration-300">Duration</p>
                      <p className="text-sm font-bold text-foreground truncate group-hover/duration:text-foreground/95 group-hover/duration:drop-shadow-sm transition-all duration-300">{project.duration}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action buttons - Theme-aware */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {project.live_url && (
              <Button
                asChild
                className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/25"
              >
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}

            {project.github_url && (
              <Button
                asChild
                variant="outline"
                className="bg-secondary/20 border border-secondary/40 text-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondary/25"
              >
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}

            {project.notion_url && (
              <Button
                asChild
                variant="outline"
                className="bg-accent-indigo/20 border border-accent-indigo/40 text-accent-indigo hover:bg-accent-indigo hover:text-background hover:border-accent-indigo transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-accent-indigo/25"
              >
                <a
                  href={project.notion_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>

        {/* Simple corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4">
          <div className="w-full h-0.5 bg-primary/40" />
          <div className="w-0.5 h-full bg-primary/40" />
        </div>
        <div className="absolute top-0 right-0 w-4 h-4">
          <div className="w-full h-0.5 bg-secondary/40" />
          <div className="w-0.5 h-full ml-auto bg-secondary/40" />
        </div>
      </div>
    </motion.div>
  );
} 