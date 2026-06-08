import React from 'react';
import { motion } from 'framer-motion';
import {
  FileText, GitBranch, Brain, Code, Server,
  AlertCircle, TrendingUp, CheckCircle2, Lightbulb,
  ChevronRight, Database, Cloud, Layers, BarChart2,
  Activity, HardDrive, Bell, RefreshCw, FlaskConical,
  Shield, Cpu, Zap, Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Dataset, DeploymentConfig, OperationsConfig, MLModel } from '@/data';
import ProjectMetrics from './ProjectMetrics';

// ─── Shared Section Components ────────────────────────────────────────────────

const SEC_COLOR = {
  primary:       { bar: 'bg-primary',       icon: 'text-primary',       line: 'from-primary/25'       },
  secondary:     { bar: 'bg-secondary',     icon: 'text-secondary',     line: 'from-secondary/25'     },
  'accent-indigo': { bar: 'bg-accent-indigo', icon: 'text-accent-indigo', line: 'from-accent-indigo/25' },
  highlight:     { bar: 'bg-highlight',     icon: 'text-highlight',     line: 'from-highlight/25'     },
  soft:          { bar: 'bg-soft',          icon: 'text-soft',          line: 'from-soft/25'          },
} as const;
type ColorKey = keyof typeof SEC_COLOR;

function SectionHeader({
  title, icon: Icon, color, badge,
}: { title: string; icon: React.ElementType; color: ColorKey; badge?: number }) {
  const c = SEC_COLOR[color];
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className={cn('h-6 w-1 rounded-full flex-shrink-0', c.bar)} />
      <Icon className={cn('w-5 h-5 flex-shrink-0', c.icon)} />
      <h2 className="text-lg font-bold text-foreground tracking-tight">{title}</h2>
      {badge !== undefined && (
        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium border', c.icon, 'bg-current/5 border-current/20')}>
          {badge}
        </span>
      )}
      <div className={cn('ml-1 h-px flex-1 bg-gradient-to-r to-transparent opacity-50', c.line)} />
    </div>
  );
}

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={`section-${id}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45 }}
      className="pt-10"
    >
      {children}
    </motion.section>
  );
}

// ─── Overview Section ─────────────────────────────────────────────────────────

function OverviewSection({
  longDescription, problemStatement, businessImpact,
}: { longDescription?: string; problemStatement?: string; businessImpact?: string[] }) {
  return (
    <Section id="overview">
      <SectionHeader title="Overview" icon={FileText} color="primary" />

      {longDescription && (
        <div className="mb-5 p-5 rounded-xl bg-muted/5 border border-border/35 hover:border-border/60 transition-colors duration-300">
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{longDescription}</p>
        </div>
      )}

      {(problemStatement || (businessImpact && businessImpact.length > 0)) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {problemStatement && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-xl border border-highlight/20 bg-highlight/5 p-5 hover:border-highlight/38 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-highlight flex-shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">Problem Statement</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{problemStatement}</p>
            </motion.div>
          )}
          {businessImpact && businessImpact.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="rounded-xl border border-primary/20 bg-primary/5 p-5 hover:border-primary/38 transition-colors duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="text-sm font-semibold text-foreground">Business Impact</h3>
              </div>
              <ul className="space-y-2">
                {businessImpact.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      )}
    </Section>
  );
}

// ─── Architecture Section ─────────────────────────────────────────────────────

function ArchitectureSection({
  overview, steps, datasets,
}: { overview?: string; steps?: string[]; datasets?: Dataset[] }) {
  if (!overview && !steps?.length && !datasets?.length) return null;

  const datasetBadge: Record<string, string> = {
    Public: 'bg-primary/10 text-primary border-primary/20',
    Custom: 'bg-secondary/10 text-secondary border-secondary/20',
    Private: 'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/20',
  };

  return (
    <Section id="architecture">
      <SectionHeader title="Architecture & Pipeline" icon={GitBranch} color="secondary" />

      {overview && (
        <div className="mb-5 p-5 rounded-xl border border-secondary/20 bg-secondary/5 hover:border-secondary/35 transition-colors duration-300">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-secondary" />
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">System Design</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{overview}</p>
        </div>
      )}

      {steps && steps.length > 0 && (
        <div className="mb-5">
          <p className="text-xs font-medium text-muted-foreground/55 uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5" />
            Pipeline Flow
          </p>
          <div className="overflow-x-auto pb-2">
            <div className="flex items-start gap-0 min-w-max">
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.3 }}
                    className="flex flex-col items-center gap-2 w-28 sm:w-32 px-1"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent-indigo/15 border border-accent-indigo/35 text-accent-indigo text-sm font-bold font-mono flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-xs text-muted-foreground text-center leading-snug">{step}</p>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="flex items-center mt-4 flex-shrink-0 text-accent-indigo/30">
                      <div className="w-4 h-px bg-current" />
                      <ChevronRight className="w-3.5 h-3.5 -ml-2" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}

      {datasets && datasets.length > 0 && (
        <div>
          <p className="text-xs font-medium text-muted-foreground/55 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            Datasets
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {datasets.map((ds, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-lg border border-border/35 bg-muted/5 p-3.5 hover:border-accent-indigo/30 hover:bg-accent-indigo/4 transition-all duration-250"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-sm font-medium text-foreground leading-tight">{ds.name}</span>
                  {ds.type && (
                    <span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0', datasetBadge[ds.type] || 'bg-muted/20 text-muted-foreground border-muted/30')}>
                      {ds.type}
                    </span>
                  )}
                </div>
                {ds.description && (
                  <p className="text-xs text-muted-foreground mb-2 leading-relaxed">{ds.description}</p>
                )}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                  {ds.source && (
                    <span className="text-xs text-muted-foreground/55">
                      Source: <span className="text-accent-indigo/75">{ds.source}</span>
                    </span>
                  )}
                  {ds.size && (
                    <span className="text-xs text-muted-foreground/55">
                      Size: <span className="text-highlight/75">{ds.size}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

// ─── Tech Stack Section ───────────────────────────────────────────────────────

const TECH_CATEGORIES = [
  { key: 'technologies' as const, label: 'Core',         icon: Cpu,      color: 'text-primary bg-primary/10 border-primary/20'               },
  { key: 'frameworks'  as const, label: 'Frameworks',   icon: Layers,   color: 'text-secondary bg-secondary/10 border-secondary/20'         },
  { key: 'libraries'   as const, label: 'Libraries',    icon: Package,  color: 'text-accent-indigo bg-accent-indigo/10 border-accent-indigo/20' },
  { key: 'cloud_services' as const, label: 'Cloud',     icon: Cloud,    color: 'text-highlight bg-highlight/10 border-highlight/20'          },
  { key: 'dashboard_tools' as const, label: 'Viz',      icon: BarChart2,color: 'text-soft bg-soft/10 border-soft/20'                        },
];

function TechStackSection({
  technologies, frameworks, libraries, cloud_services, dashboard_tools,
}: {
  technologies?: string[];
  frameworks?: string[];
  libraries?: string[];
  cloud_services?: string[];
  dashboard_tools?: string[];
}) {
  const getItems = (key: typeof TECH_CATEGORIES[number]['key']) => {
    const m: Record<string, string[] | undefined> = { technologies, frameworks, libraries, cloud_services, dashboard_tools };
    return m[key] || [];
  };
  const hasAny = TECH_CATEGORIES.some(({ key }) => getItems(key).length > 0);
  if (!hasAny) return null;

  return (
    <Section id="techstack">
      <SectionHeader title="Tech Stack" icon={Code} color="accent-indigo" />
      <div className="rounded-xl border border-border/35 bg-muted/5 overflow-hidden">
        {TECH_CATEGORIES.map(({ key, label, icon: Icon, color }, idx) => {
          const items = getItems(key);
          if (!items.length) return null;
          return (
            <div
              key={key}
              className={cn('flex flex-col sm:flex-row sm:items-start gap-3 p-4', idx !== 0 && 'border-t border-border/25')}
            >
              <div className={cn('flex items-center gap-1.5 sm:w-32 flex-shrink-0', color.split(' ')[0])}>
                <Icon className="w-3.5 h-3.5" />
                <span className="text-xs font-medium">{label}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className={cn('text-xs px-2.5 py-1 rounded-md border font-medium transition-all duration-200 hover:scale-105', color)}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Deployment + MLOps Section ───────────────────────────────────────────────

function TagChips({ items, color }: { items: string[]; color: string }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span key={item} className={cn('text-xs px-2 py-0.5 rounded border font-medium', color)}>
          {item}
        </span>
      ))}
    </div>
  );
}

function DeploymentOpsSection({
  deployment, operations,
}: { deployment?: DeploymentConfig; operations?: OperationsConfig }) {
  if (!deployment && !operations) return null;

  return (
    <Section id="deployment">
      <SectionHeader title="Deployment & MLOps" icon={Server} color="highlight" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {deployment && (
          <div className="rounded-xl border border-highlight/20 bg-highlight/5 p-5 hover:border-highlight/35 transition-colors duration-300 space-y-4">
            <div className="flex items-center gap-2">
              <Cloud className="w-4 h-4 text-highlight" />
              <h3 className="text-sm font-semibold text-foreground">Deployment</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Type',     value: deployment.deployment_type,   color: 'text-highlight border-highlight/20 bg-highlight/8'         },
                { label: 'Cloud',    value: deployment.cloud_provider,    color: 'text-primary border-primary/20 bg-primary/8'               },
                { label: 'Edge',     value: deployment.edge_device,       color: 'text-secondary border-secondary/20 bg-secondary/8'         },
                { label: 'Platform', value: deployment.hosting_platform,  color: 'text-accent-indigo border-accent-indigo/20 bg-accent-indigo/8' },
                { label: 'API',      value: deployment.api_framework,     color: 'text-soft border-soft/20 bg-soft/8'                       },
                { label: 'Latency',  value: deployment.inference_latency, color: 'text-highlight border-highlight/20 bg-highlight/8'         },
              ].filter(({ value }) => value).map(({ label, value, color }) => (
                <div key={label} className={cn('rounded-lg border p-2.5', color)}>
                  <p className="text-xs opacity-55 mb-0.5">{label}</p>
                  <p className="text-xs font-medium leading-snug">{value}</p>
                </div>
              ))}
            </div>
            {deployment.runtime && deployment.runtime.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><Cpu className="w-3 h-3" />Runtime</p>
                <TagChips items={deployment.runtime} color="text-highlight border-highlight/20 bg-highlight/8" />
              </div>
            )}
            {deployment.ci_cd_tools && deployment.ci_cd_tools.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><GitBranch className="w-3 h-3" />CI/CD</p>
                <TagChips items={deployment.ci_cd_tools} color="text-secondary border-secondary/20 bg-secondary/8" />
              </div>
            )}
            {deployment.scalability && deployment.scalability.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2">Scalability</p>
                <TagChips items={deployment.scalability} color="text-primary border-primary/20 bg-primary/8" />
              </div>
            )}
          </div>
        )}

        {operations && (
          <div className="rounded-xl border border-soft/20 bg-soft/5 p-5 hover:border-soft/35 transition-colors duration-300 space-y-4">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-soft" />
              <h3 className="text-sm font-semibold text-foreground">MLOps</h3>
            </div>
            {operations.monitoring && operations.monitoring.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><Activity className="w-3 h-3" />Monitoring</p>
                <TagChips items={operations.monitoring} color="text-primary border-primary/20 bg-primary/8" />
              </div>
            )}
            {operations.logging && operations.logging.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><HardDrive className="w-3 h-3" />Logging</p>
                <TagChips items={operations.logging} color="text-secondary border-secondary/20 bg-secondary/8" />
              </div>
            )}
            {operations.alerting && operations.alerting.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><Bell className="w-3 h-3" />Alerting</p>
                <TagChips items={operations.alerting} color="text-highlight border-highlight/20 bg-highlight/8" />
              </div>
            )}
            {operations.retraining_strategy && (
              <div className="p-3 rounded-lg bg-background/30 border border-soft/20">
                <p className="text-xs text-muted-foreground/55 mb-1.5 flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 text-soft" />Retraining Strategy
                </p>
                <p className="text-xs text-foreground/75 leading-relaxed">{operations.retraining_strategy}</p>
              </div>
            )}
            {operations.experiment_tracking && operations.experiment_tracking.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><FlaskConical className="w-3 h-3" />Experiment Tracking</p>
                <TagChips items={operations.experiment_tracking} color="text-accent-indigo border-accent-indigo/20 bg-accent-indigo/8" />
              </div>
            )}
            {operations.data_versioning && operations.data_versioning.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground/55 mb-2 flex items-center gap-1.5"><Shield className="w-3 h-3" />Data Versioning</p>
                <TagChips items={operations.data_versioning} color="text-soft border-soft/20 bg-soft/8" />
              </div>
            )}
          </div>
        )}
      </div>
    </Section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface ProjectDetailsContentProps {
  project: {
    long_description?: string;
    problem_statement?: string;
    business_impact?: string[];
    architecture_overview?: string;
    workflow_steps?: string[];
    datasets?: Dataset[];
    models?: MLModel[];
    technologies?: string[];
    frameworks?: string[];
    libraries?: string[];
    cloud_services?: string[];
    dashboard_tools?: string[];
    deployment?: DeploymentConfig;
    operations?: OperationsConfig;
  };
}

export default function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  return (
    <div>
      <OverviewSection
        longDescription={project.long_description}
        problemStatement={project.problem_statement}
        businessImpact={project.business_impact}
      />
      <ArchitectureSection
        overview={project.architecture_overview}
        steps={project.workflow_steps}
        datasets={project.datasets}
      />
      {project.models && project.models.length > 0 && (
        <Section id="models">
          <SectionHeader title="ML Models" icon={Brain} color="primary" badge={project.models.length} />
          <ProjectMetrics models={project.models} />
        </Section>
      )}
      <TechStackSection
        technologies={project.technologies}
        frameworks={project.frameworks}
        libraries={project.libraries}
        cloud_services={project.cloud_services}
        dashboard_tools={project.dashboard_tools}
      />
      <DeploymentOpsSection
        deployment={project.deployment}
        operations={project.operations}
      />
    </div>
  );
}
