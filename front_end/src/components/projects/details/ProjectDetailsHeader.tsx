import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Calendar, Building2, User, Clock,
  ExternalLink, Github, FileText, Globe, MapPin,
  Users, BookOpen, Layers, Target, Zap, TrendingUp,
  Scale, DollarSign, BarChart3, Tag, Hash,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectHighlight } from '@/data';

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
    company?: { name: string; location: string };
    highlights?: ProjectHighlight[];
  };
}

const STATUS_CONFIG: Record<string, { color: string; dot: string; label: string }> = {
  Completed: { color: 'bg-primary/10 text-primary border-primary/25', dot: 'bg-primary', label: 'Completed' },
  Development: { color: 'bg-secondary/10 text-secondary border-secondary/25', dot: 'bg-secondary animate-pulse', label: 'In Development' },
  Research: { color: 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/25', dot: 'bg-accent-indigo', label: 'Research' },
  Ideation: { color: 'bg-soft/10 text-soft border-soft/25', dot: 'bg-soft', label: 'Ideation' },
};

const HIGHLIGHT_CONFIG: Record<string, { text: string; bg: string; border: string; icon: React.ElementType }> = {
  Accuracy:   { text: 'text-primary',      bg: 'bg-primary/10',      border: 'border-primary/20 hover:border-primary/45',      icon: Target    },
  Performance:{ text: 'text-secondary',    bg: 'bg-secondary/10',    border: 'border-secondary/20 hover:border-secondary/45',  icon: Zap       },
  Business:   { text: 'text-accent-indigo',bg: 'bg-accent-indigo/10',border: 'border-accent-indigo/20 hover:border-accent-indigo/45', icon: TrendingUp },
  Scale:      { text: 'text-highlight',    bg: 'bg-highlight/10',    border: 'border-highlight/20 hover:border-highlight/45',  icon: Scale     },
  Cost:       { text: 'text-soft',         bg: 'bg-soft/10',         border: 'border-soft/20 hover:border-soft/45',            icon: DollarSign},
  Efficiency: { text: 'text-secondary',    bg: 'bg-secondary/10',    border: 'border-secondary/20 hover:border-secondary/45', icon: BarChart3  },
};
const DEFAULT_HL = HIGHLIGHT_CONFIG.Accuracy;

export default function ProjectDetailsHeader({ project }: ProjectDetailsHeaderProps) {
  const {
    title, short_description, project_type, status,
    github_url, live_url, documentation_url, research_paper_url,
    start_date, end_date, role, team_size, duration,
    domain, industry, company, highlights,
  } = project;

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });

  const statusCfg = STATUS_CONFIG[status] || { color: 'bg-muted/10 text-muted-foreground border-muted/25', dot: 'bg-muted-foreground', label: status };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="pt-4 pb-8"
    >
      {/* Badges row: Status | Type | Domains — each visually distinct */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.06 }}
        className="flex flex-wrap items-center gap-2 mb-5"
      >
        {/* Status — colored pill with animated dot */}
        <div className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border',
          statusCfg.color
        )}>
          <span className={cn('w-2 h-2 rounded-full flex-shrink-0', statusCfg.dot)} />
          {statusCfg.label}
        </div>

        {/* Separator */}
        <span className="h-4 w-px bg-border/50 flex-shrink-0 mx-0.5" />

        {/* Project Type — neutral muted with icon */}
        <div className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium bg-muted/15 border border-border/40 text-muted-foreground">
          <Tag className="w-3 h-3 opacity-60" />
          {project_type}
        </div>

        {/* Domain tags — grouped, visually lighter */}
        {domain && domain.length > 0 && (
          <>
            <span className="h-4 w-px bg-border/50 flex-shrink-0 mx-0.5" />
            <div className="flex flex-wrap items-center gap-1.5">
              <Hash className="w-3 h-3 text-muted-foreground/35 flex-shrink-0" />
              {domain.map((d) => (
                <span
                  key={d}
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary/10 text-secondary/80 border border-secondary/20"
                >
                  {d}
                </span>
              ))}
            </div>
          </>
        )}
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-3xl md:text-4xl xl:text-5xl font-bold mb-3 leading-[1.1] tracking-tight"
      >
        <span className="bg-gradient-to-r from-primary via-secondary to-accent-indigo bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h1>

      {/* Short description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed mb-4"
      >
        {short_description}
      </motion.p>

      {/* Industry tags */}
      {industry && industry.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="flex flex-wrap items-center gap-1.5 mb-6"
        >
          <Layers className="w-3 h-3 text-muted-foreground/40" />
          {industry.map((ind) => (
            <span key={ind} className="text-xs text-muted-foreground/60 bg-muted/8 border border-muted/20 rounded-full px-2.5 py-0.5">
              {ind}
            </span>
          ))}
        </motion.div>
      )}

      {/* Key Metrics — most prominent element after title */}
      {highlights && highlights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
        >
          {highlights.map((h, i) => {
            const cfg = HIGHLIGHT_CONFIG[h.category || ''] || DEFAULT_HL;
            const Icon = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.28 + i * 0.07 }}
                className={cn(
                  'relative rounded-xl border p-4 cursor-default group',
                  'hover:scale-[1.03] hover:shadow-lg transition-all duration-250',
                  cfg.bg, cfg.border
                )}
              >
                <Icon className={cn('w-3.5 h-3.5 mb-2.5 opacity-50', cfg.text)} />
                <p className={cn('text-2xl sm:text-3xl font-bold font-mono mb-1 leading-none tabular-nums', cfg.text)}>
                  {h.value}
                </p>
                <p className="text-xs text-muted-foreground/65 leading-snug">{h.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border/50 to-transparent mb-5" />

      {/* Metadata pills */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.36 }}
        className="flex flex-wrap gap-2 mb-5"
      >
        <div className="flex items-center gap-1.5 bg-muted/8 border border-border/40 rounded-lg px-3 py-1.5 text-xs">
          <Building2 className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
          <span className="text-muted-foreground/55">Company</span>
          <span className="font-medium text-foreground">{company?.name || 'Personal'}</span>
          {company?.location && (
            <span className="flex items-center gap-0.5 text-muted-foreground/45">
              <MapPin className="w-2.5 h-2.5" />
              {company.location}
            </span>
          )}
        </div>

        {role && (
          <div className="flex items-center gap-1.5 bg-muted/8 border border-border/40 rounded-lg px-3 py-1.5 text-xs">
            <User className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
            <span className="text-muted-foreground/55">Role</span>
            <span className="font-medium text-foreground">{role}</span>
          </div>
        )}

        <div className="flex items-center gap-1.5 bg-muted/8 border border-border/40 rounded-lg px-3 py-1.5 text-xs">
          <Calendar className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
          <span className="text-muted-foreground/55">Timeline</span>
          <span className="font-medium text-foreground">
            {fmt(start_date)} – {end_date ? fmt(end_date) : 'Present'}
          </span>
        </div>

        {duration && (
          <div className="flex items-center gap-1.5 bg-muted/8 border border-border/40 rounded-lg px-3 py-1.5 text-xs">
            <Clock className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
            <span className="font-medium text-foreground">{duration}</span>
          </div>
        )}

        {team_size && (
          <div className="flex items-center gap-1.5 bg-muted/8 border border-border/40 rounded-lg px-3 py-1.5 text-xs">
            <Users className="w-3 h-3 text-muted-foreground/50 flex-shrink-0" />
            <span className="font-medium text-foreground">{team_size} members</span>
          </div>
        )}
      </motion.div>

      {/* Action buttons */}
      {(live_url || github_url || documentation_url || research_paper_url) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
          className="flex flex-wrap gap-2"
        >
          {live_url && (
            <Button asChild size="sm" className="h-8 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={live_url} target="_blank" rel="noopener noreferrer">
                <Globe className="w-3.5 h-3.5" />
                Live Demo
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </Button>
          )}
          {github_url && (
            <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 border-border/55 hover:border-foreground/40">
              <a href={github_url} target="_blank" rel="noopener noreferrer">
                <Github className="w-3.5 h-3.5" />
                Source Code
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </Button>
          )}
          {documentation_url && (
            <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 border-border/55 hover:border-foreground/40">
              <a href={documentation_url} target="_blank" rel="noopener noreferrer">
                <FileText className="w-3.5 h-3.5" />
                Docs
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </Button>
          )}
          {research_paper_url && (
            <Button asChild size="sm" variant="outline" className="h-8 gap-1.5 border-border/55 hover:border-foreground/40">
              <a href={research_paper_url} target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-3.5 h-3.5" />
                Research Paper
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
