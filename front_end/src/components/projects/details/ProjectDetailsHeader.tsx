import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  MapPin,
  Users,
  BookOpen,
  Layers,
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
    documentation_url?: string;
    research_paper_url?: string;
    start_date: string;
    end_date?: string;
    role?: string;
    team_size?: number;
    duration?: string;
    domain?: string[];
    industry?: string[];
    company?: {
      name: string;
      location: string;
    };
  };
}

export default function ProjectDetailsHeader({ project }: ProjectDetailsHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-primary/20 text-primary border-primary/40';
      case 'Development': return 'bg-secondary/20 text-secondary border-secondary/40';
      case 'Research': return 'bg-accent-indigo/20 text-accent-indigo border-accent-indigo/40';
      default: return 'bg-muted/20 text-muted-foreground border-muted/40';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative mb-8"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/3 to-accent-indigo/5 rounded-xl blur-xl opacity-60" />

      <div className="relative bg-card/90 border border-primary/20 rounded-xl backdrop-blur-sm overflow-hidden">
        <div className="relative p-6 md:p-8">

          {/* Status + Type row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-4"
          >
            <Badge className={`cyberpunk-badge text-xs font-semibold ${getStatusColor(project.status)}`}>
              {project.status}
            </Badge>
            <Badge className="cyberpunk-badge text-xs bg-secondary/20 text-secondary border-secondary/40">
              {project.project_type}
            </Badge>
            {project.domain?.map((d) => (
              <Badge key={d} className="cyberpunk-badge text-xs bg-accent-indigo/15 text-accent-indigo border-accent-indigo/30">
                {d}
              </Badge>
            ))}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-secondary to-accent-indigo bg-clip-text text-transparent leading-tight"
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground mb-6 leading-relaxed max-w-4xl"
          >
            {project.short_description}
          </motion.p>

          {/* Industry tags */}
          {project.industry && project.industry.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <Layers className="w-3.5 h-3.5 text-muted-foreground" />
              {project.industry.map((ind) => (
                <span key={ind} className="text-xs text-muted-foreground bg-muted/20 border border-muted/30 rounded px-2 py-0.5">
                  {ind}
                </span>
              ))}
            </motion.div>
          )}

          {/* Metadata grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
              {/* Company */}
              <div className="bg-gradient-to-br from-secondary/10 to-accent-indigo/10 border border-secondary/30 rounded-lg p-3 hover:border-secondary/60 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 group/company">
                <div className="flex items-start space-x-2">
                  <Building2 className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0 group-hover/company:scale-110 transition-all" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Company</p>
                    <p className="text-xs font-bold text-foreground truncate">{project.company?.name || 'Personal'}</p>
                    {project.company?.location && (
                      <div className="flex items-center space-x-1 text-muted-foreground mt-0.5">
                        <MapPin className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="text-xs truncate">{project.company.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="bg-gradient-to-br from-primary/10 to-highlight/10 border border-primary/30 rounded-lg p-3 hover:border-primary/60 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 group/role">
                <div className="flex items-start space-x-2">
                  <User className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0 group-hover/role:scale-110 transition-all" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Role</p>
                    <p className="text-xs font-bold text-foreground truncate">{project.role || 'Developer'}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gradient-to-br from-highlight/10 to-muted/10 border border-highlight/30 rounded-lg p-3 hover:border-highlight/60 hover:scale-105 hover:shadow-lg hover:shadow-highlight/20 transition-all duration-300 group/timeline">
                <div className="flex items-start space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-highlight mt-0.5 flex-shrink-0 group-hover/timeline:scale-110 transition-all" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Timeline</p>
                    <p className="text-xs font-bold text-foreground">
                      {formatDate(project.start_date)}
                      {project.end_date ? ` – ${formatDate(project.end_date)}` : ' – Present'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Duration */}
              {project.duration && (
                <div className="bg-gradient-to-br from-soft/10 to-accent-indigo/10 border border-soft/30 rounded-lg p-3 hover:border-soft/60 hover:scale-105 hover:shadow-lg hover:shadow-soft/20 transition-all duration-300 group/dur">
                  <div className="flex items-start space-x-2">
                    <Clock className="w-3.5 h-3.5 text-soft mt-0.5 flex-shrink-0 group-hover/dur:scale-110 transition-all" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Duration</p>
                      <p className="text-xs font-bold text-foreground">{project.duration}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Team Size */}
              {project.team_size && (
                <div className="bg-gradient-to-br from-accent-indigo/10 to-secondary/10 border border-accent-indigo/30 rounded-lg p-3 hover:border-accent-indigo/60 hover:scale-105 hover:shadow-lg hover:shadow-accent-indigo/20 transition-all duration-300 group/team">
                  <div className="flex items-start space-x-2">
                    <Users className="w-3.5 h-3.5 text-accent-indigo mt-0.5 flex-shrink-0 group-hover/team:scale-110 transition-all" />
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Team</p>
                      <p className="text-xs font-bold text-foreground">{project.team_size} members</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Type */}
              <div className="bg-gradient-to-br from-muted/10 to-primary/10 border border-muted/30 rounded-lg p-3 hover:border-muted/60 hover:scale-105 hover:shadow-lg hover:shadow-muted/20 transition-all duration-300 group/type">
                <div className="flex items-start space-x-2">
                  <Zap className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0 group-hover/type:scale-110 transition-all" />
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">Type</p>
                    <p className="text-xs font-bold text-foreground">{project.project_type}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3"
          >
            {project.live_url && (
              <Button asChild className="bg-primary/20 border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/25">
                <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
            {project.github_url && (
              <Button asChild variant="outline" className="bg-secondary/20 border border-secondary/40 text-secondary hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-secondary/25">
                <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
            {project.documentation_url && (
              <Button asChild variant="outline" className="bg-accent-indigo/20 border border-accent-indigo/40 text-accent-indigo hover:bg-accent-indigo hover:text-background hover:border-accent-indigo transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-accent-indigo/25">
                <a href={project.documentation_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Documentation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
            {project.research_paper_url && (
              <Button asChild variant="outline" className="bg-highlight/20 border border-highlight/40 text-highlight hover:bg-highlight hover:text-background hover:border-highlight transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-highlight/25">
                <a href={project.research_paper_url} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4" />
                  <span>Research Paper</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </Button>
            )}
          </motion.div>
        </div>

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
