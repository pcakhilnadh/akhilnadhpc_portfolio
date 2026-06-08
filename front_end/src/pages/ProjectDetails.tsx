import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, AlertCircle,
  FileText, GitBranch, Brain, Code, Server,
} from 'lucide-react';
import { CommonBg, PageMeta } from '@/components/common';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProjectDetailsHeader, ProjectDetailsContent } from '@/components/projects/details';
import { getProjectById, getWorkExperienceById, Project } from '@/data';

interface ProjectDetailsProps {
  setNavbarWelcomeText: (text: string) => void;
}

interface ResolvedProject extends Project {
  resolvedCompany?: { name: string; location: string };
}

const ALL_SECTIONS = [
  { id: 'overview', label: 'Overview', icon: FileText },
  { id: 'architecture', label: 'Architecture', icon: GitBranch },
  { id: 'models', label: 'Models', icon: Brain },
  { id: 'techstack', label: 'Tech Stack', icon: Code },
  { id: 'deployment', label: 'Deployment', icon: Server },
] as const;

type SectionId = typeof ALL_SECTIONS[number]['id'];

export default function ProjectDetails({ setNavbarWelcomeText }: ProjectDetailsProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [project, setProject] = useState<ResolvedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<SectionId>('overview');
  const [showStickyNav, setShowStickyNav] = useState(false);

  useEffect(() => {
    setNavbarWelcomeText('project_details.exe');
  }, [setNavbarWelcomeText]);

  useEffect(() => {
    if (!projectId) {
      setError('Project ID missing');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const found = getProjectById(projectId);
      if (!found) {
        setError('Project not found');
        setLoading(false);
        return;
      }
      const company = found.company ? getWorkExperienceById(found.company) : undefined;
      setProject({
        ...found,
        resolvedCompany: company
          ? { name: company.company_name, location: company.company_location }
          : undefined,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load project details');
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    setShowStickyNav(container.scrollTop > 260);
    const containerTop = container.getBoundingClientRect().top;
    const threshold = containerTop + 110;
    let current: SectionId = 'overview';
    for (const { id } of ALL_SECTIONS) {
      const el = document.getElementById(`section-${id}`);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = id;
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll, project]);

  const scrollToSection = useCallback((id: SectionId) => {
    const container = scrollContainerRef.current;
    const el = document.getElementById(`section-${id}`);
    if (!container || !el) return;
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    container.scrollTo({
      top: container.scrollTop + elTop - containerTop - 68,
      behavior: 'smooth',
    });
  }, []);

  const handleGoBack = () => navigate('/projects');

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-secondary/20 border-b-secondary animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
          </div>
          <p className="text-primary font-mono text-sm tracking-widest animate-pulse">LOADING...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="relative z-10 text-center max-w-sm mx-auto px-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 border border-destructive/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-bold text-destructive mb-2 font-mono">ACCESS DENIED</h3>
          <p className="text-muted-foreground text-sm mb-6">{error || 'Failed to decrypt project data'}</p>
          <Button onClick={handleGoBack} variant="outline" className="border-destructive/40 text-destructive hover:bg-destructive/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Projects
          </Button>
        </div>
      </div>
    );
  }

  // Side effect inside render — intentional: needs project title immediately
  setNavbarWelcomeText(`project: ${project.title}`);

  const availableSections = ALL_SECTIONS.filter(({ id }) => {
    if (id === 'overview') return true;
    if (id === 'architecture') return !!(project.architecture_overview || project.workflow_steps?.length || project.datasets?.length);
    if (id === 'models') return !!(project.models?.length);
    if (id === 'techstack') return !!(project.technologies?.length || project.frameworks?.length || project.libraries?.length || project.cloud_services?.length || project.dashboard_tools?.length);
    if (id === 'deployment') return !!(project.deployment || project.operations);
    return false;
  });

  const allSkills = [...(project.skills || []), ...(project.domain || [])];

  return (
    <>
      <PageMeta
        title={`${project.title} | Expert Data Scientist & Machine Learning Engineer`}
        description={project.short_description}
        keywords={allSkills.join(', ') || 'data science, machine learning, AI'}
      />

      <div ref={scrollContainerRef} className="h-full overflow-y-auto bg-background relative">
        <CommonBg />
        <div className="relative z-10">

          {/* Back button */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
              <Button
                onClick={handleGoBack}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground group -ml-2 gap-1.5"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                Back to Projects
              </Button>
            </motion.div>
          </div>

          {/* Hero header */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <ProjectDetailsHeader
              project={{
                id: project._id,
                title: project.title,
                short_description: project.short_description,
                project_type: project.project_type,
                status: project.status,
                github_url: project.github_url,
                live_url: project.live_url,
                documentation_url: project.documentation_url,
                research_paper_url: project.research_paper_url,
                start_date: project.start_date,
                end_date: project.end_date,
                role: project.role,
                team_size: project.team_size,
                duration: project.duration,
                domain: project.domain,
                industry: project.industry,
                company: project.resolvedCompany,
                highlights: project.highlights,
              }}
            />
          </div>

          {/* Sticky section navigator — appears after scrolling past hero */}
          <AnimatePresence>
            {showStickyNav && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className="sticky top-0 z-40 border-b border-border/40 bg-background/90 backdrop-blur-xl"
              >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                  <nav className="flex items-center gap-0.5 py-2 overflow-x-auto scrollbar-hide">
                    {availableSections.map(({ id, label, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => scrollToSection(id)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap flex-shrink-0 outline-none',
                          activeSection === id
                            ? 'bg-primary/12 text-primary border border-primary/25 shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/25'
                        )}
                      >
                        <Icon className="w-3 h-3" />
                        {label}
                      </button>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content sections */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
            <ProjectDetailsContent
              project={{
                long_description: project.long_description,
                problem_statement: project.problem_statement,
                business_impact: project.business_impact,
                architecture_overview: project.architecture_overview,
                workflow_steps: project.workflow_steps,
                datasets: project.datasets,
                models: project.models,
                technologies: project.technologies,
                frameworks: project.frameworks,
                libraries: project.libraries,
                cloud_services: project.cloud_services,
                dashboard_tools: project.dashboard_tools,
                deployment: project.deployment,
                operations: project.operations,
              }}
            />
          </div>

        </div>
      </div>
    </>
  );
}
