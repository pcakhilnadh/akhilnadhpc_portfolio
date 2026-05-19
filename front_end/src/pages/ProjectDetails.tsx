import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { CommonBg, PageMeta } from '@/components/common';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProjectDetailsHeader, ProjectMetrics, ProjectDetailsContent } from '@/components/projects/details';
import { getProjectById, getWorkExperienceById, Project } from '@/data';

interface ProjectDetailsProps {
  setNavbarWelcomeText: (text: string) => void;
}

interface ResolvedProject extends Project {
  resolvedCompany?: { name: string; location: string };
}

export default function ProjectDetails({ setNavbarWelcomeText }: ProjectDetailsProps) {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ResolvedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setNavbarWelcomeText('project_details.exe');
  }, [setNavbarWelcomeText]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleGoBack = () => navigate('/projects');

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

  if (error || !project) {
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

  if (project) {
    setNavbarWelcomeText(`project: ${project.title}`);
  }

  const allSkills = [
    ...(project.skills || []),
    ...(project.domain || []),
  ];

  return (
    <>
      <PageMeta
        title={`${project.title} - Project Details | Expert Data Scientist & Machine Learning Engineer`}
        description={`Detailed view of the project: ${project.short_description}. See the technologies used, outcomes, and achievements by an Expert Data Scientist.`}
        keywords={
          allSkills.join(', ') || 'data science, machine learning, expert data scientist, machine learning engineer'
        }
      />

      <div className="p-4 sm:p-6 h-full overflow-y-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto py-8"
        >
          {/* ── Sticky Back Button ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="sticky top-4 z-50 mb-6"
          >
            <div className="relative inline-block">
              <div className={cn(
                'absolute inset-0 bg-background/80 backdrop-blur-lg rounded-lg border shadow-xl transition-all duration-500',
                isScrolled
                  ? 'opacity-95 border-primary/40 shadow-2xl shadow-primary/10'
                  : 'opacity-0 border-primary/20 shadow-lg'
              )} />
              <div className={cn(
                'absolute inset-0 bg-gradient-to-r from-primary/15 via-secondary/8 to-accent-indigo/15 rounded-lg blur-lg transition-all duration-500',
                isScrolled ? 'opacity-80 scale-110' : 'opacity-0 scale-100'
              )} />
              <Button
                onClick={handleGoBack}
                variant="outline"
                className={cn(
                  'relative backdrop-blur-sm border text-foreground transition-all duration-500 group font-medium',
                  'hover:scale-105 hover:shadow-2xl',
                  isScrolled
                    ? 'bg-background/60 border-primary/50 text-primary shadow-xl shadow-primary/20 hover:bg-primary/20 hover:border-primary/70'
                    : 'bg-background/30 border-primary/30 shadow-lg hover:bg-primary/15 hover:border-primary/50 hover:text-primary'
                )}
              >
                <ArrowLeft className={cn(
                  'w-4 h-4 mr-2 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-primary',
                  isScrolled && 'text-primary'
                )} />
                <span className="font-medium">Back to Projects</span>
                <div className={cn(
                  'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-accent-indigo transition-all duration-500',
                  isScrolled
                    ? 'w-full opacity-100'
                    : 'w-0 group-hover:w-full opacity-0 group-hover:opacity-100'
                )} />
              </Button>
            </div>
          </motion.div>

          {/* ── Header ── */}
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
            }}
          />

          {/* ── Project Overview (long description) ── */}
          {project.long_description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative mb-8 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent-indigo/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative bg-card/80 border border-primary/30 backdrop-blur-md cyberpunk-card rounded-xl overflow-hidden group-hover:bg-card/95 group-hover:border-primary/50 transition-all duration-500">
                <div className="p-6 md:p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-foreground">Project Overview</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-base group-hover:text-foreground/85 transition-all duration-500">
                    {project.long_description}
                  </p>
                </div>
                <div className="absolute top-0 left-0 w-5 h-5">
                  <div className="w-full h-0.5 bg-primary" />
                  <div className="w-0.5 h-full bg-primary" />
                </div>
                <div className="absolute top-0 right-0 w-5 h-5">
                  <div className="w-full h-0.5 bg-secondary" />
                  <div className="w-0.5 h-full ml-auto bg-secondary" />
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Content: Highlights, Problem, Architecture, Datasets, TechStack, Deployment, MLOps ── */}
          <ProjectDetailsContent
            project={{
              highlights: project.highlights,
              problem_statement: project.problem_statement,
              business_impact: project.business_impact,
              architecture_overview: project.architecture_overview,
              workflow_steps: project.workflow_steps,
              datasets: project.datasets,
              technologies: project.technologies,
              frameworks: project.frameworks,
              libraries: project.libraries,
              cloud_services: project.cloud_services,
              dashboard_tools: project.dashboard_tools,
              deployment: project.deployment,
              operations: project.operations,
            }}
          />

          {/* ── ML Models ── */}
          {project.models && project.models.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <ProjectMetrics models={project.models} />
            </motion.div>
          )}

          <div className="h-16" />
        </motion.div>
      </div>
    </>
  );
}
