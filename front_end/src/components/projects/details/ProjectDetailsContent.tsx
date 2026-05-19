import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  TrendingUp,
  Target,
  Zap,
  DollarSign,
  Scale,
  BarChart3,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  GitBranch,
  Workflow,
  Database,
  Code,
  Cloud,
  Layers,
  BarChart2,
  Server,
  Activity,
  Shield,
  RefreshCw,
  FlaskConical,
  HardDrive,
  Bell,
  Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProjectHighlight, Dataset, DeploymentConfig, OperationsConfig } from '@/data';

// ─── Highlight Category Config ───────────────────────────────────────────────

const highlightConfig: Record<string, { color: string; icon: React.ElementType }> = {
  Accuracy: { color: 'from-primary/20 to-primary/5 border-primary/40 text-primary', icon: Target },
  Performance: { color: 'from-secondary/20 to-secondary/5 border-secondary/40 text-secondary', icon: Zap },
  Business: { color: 'from-accent-indigo/20 to-accent-indigo/5 border-accent-indigo/40 text-accent-indigo', icon: TrendingUp },
  Scale: { color: 'from-highlight/20 to-highlight/5 border-highlight/40 text-highlight', icon: Scale },
  Cost: { color: 'from-soft/20 to-soft/5 border-soft/40 text-soft', icon: DollarSign },
  Efficiency: { color: 'from-secondary/20 to-secondary/5 border-secondary/40 text-secondary', icon: BarChart3 },
};

const defaultHighlight = { color: 'from-primary/20 to-primary/5 border-primary/40 text-primary', icon: Target };

// ─── Tech Stack Category Config ───────────────────────────────────────────────

const techCategories = [
  { key: 'technologies' as const, label: 'Core Technologies', icon: Code, color: 'text-primary border-primary/40 bg-primary/10' },
  { key: 'frameworks' as const, label: 'Frameworks', icon: Layers, color: 'text-secondary border-secondary/40 bg-secondary/10' },
  { key: 'libraries' as const, label: 'Libraries', icon: Database, color: 'text-accent-indigo border-accent-indigo/40 bg-accent-indigo/10' },
  { key: 'cloud_services' as const, label: 'Cloud Services', icon: Cloud, color: 'text-highlight border-highlight/40 bg-highlight/10' },
  { key: 'dashboard_tools' as const, label: 'Dashboards & Viz', icon: BarChart2, color: 'text-soft border-soft/40 bg-soft/10' },
];

// ─── Highlights Section ───────────────────────────────────────────────────────

function HighlightsSection({ highlights }: { highlights: ProjectHighlight[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mb-8"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center">
          <Target className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Key Metrics</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {highlights.map((h, i) => {
          const { color, icon: Icon } = highlightConfig[h.category || ''] || defaultHighlight;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
              className={cn(
                'relative group bg-gradient-to-br border rounded-xl p-4 cursor-default',
                'hover:scale-105 hover:shadow-xl transition-all duration-300',
                color
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative">
                <Icon className="w-4 h-4 mb-2 opacity-70" />
                <p className="text-2xl md:text-3xl font-bold font-mono mb-1 leading-none">{h.value}</p>
                <p className="text-xs opacity-80 font-medium leading-tight">{h.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Problem + Business Impact Section ───────────────────────────────────────

function ProblemImpactSection({ problemStatement, businessImpact }: { problemStatement?: string; businessImpact?: string[] }) {
  if (!problemStatement && !businessImpact?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Problem Statement */}
        {problemStatement && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-destructive/8 via-highlight/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-highlight/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-highlight/50 transition-all duration-500">
              <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-highlight/20 to-destructive/20 border border-highlight/40 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-highlight" />
                  </div>
                  <CardTitle className="text-base text-foreground">Problem Statement</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="group-hover:bg-background/5 transition-all duration-500">
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-all duration-500">
                  {problemStatement}
                </p>
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-highlight/60" />
                <div className="w-0.5 h-full bg-highlight/60" />
              </div>
            </Card>
          </div>
        )}

        {/* Business Impact */}
        {businessImpact && businessImpact.length > 0 && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-secondary/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-primary/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-primary/50 transition-all duration-500">
              <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="text-base text-foreground">Business Impact</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="group-hover:bg-background/5 transition-all duration-500">
                <ul className="space-y-2.5">
                  {businessImpact.map((impact, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.07 }}
                      className="flex items-start space-x-2.5 group/item"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-all duration-300" />
                      <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-all duration-500">
                        {impact}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-primary/60" />
                <div className="w-0.5 h-full bg-primary/60" />
              </div>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Architecture + Workflow Section ─────────────────────────────────────────

function ArchitectureSection({ overview, steps }: { overview?: string; steps?: string[] }) {
  if (!overview && !steps?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="mb-8"
    >
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-8 h-8 bg-gradient-to-br from-secondary/20 to-accent-indigo/20 border border-secondary/40 rounded-lg flex items-center justify-center">
          <GitBranch className="w-4 h-4 text-secondary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Architecture & Workflow</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Architecture Overview */}
        {overview && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-accent-indigo/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-secondary/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-secondary/50 transition-all duration-500">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-4 h-4 text-secondary" />
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">System Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-all duration-500">
                  {overview}
                </p>
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-secondary/60" />
                <div className="w-0.5 h-full bg-secondary/60" />
              </div>
            </Card>
          </div>
        )}

        {/* Workflow Steps */}
        {steps && steps.length > 0 && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/10 via-highlight/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-accent-indigo/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-accent-indigo/50 transition-all duration-500">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Workflow className="w-4 h-4 text-accent-indigo" />
                  <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Pipeline Steps</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {steps.map((step, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                      className="flex items-start space-x-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-accent-indigo/20 border border-accent-indigo/40 text-accent-indigo text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-all duration-500">
                        {step}
                      </span>
                    </motion.li>
                  ))}
                </ol>
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-accent-indigo/60" />
                <div className="w-0.5 h-full bg-accent-indigo/60" />
              </div>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Datasets + Tech Stack Section ───────────────────────────────────────────

function DatasetsTechStackSection({
  datasets,
  technologies,
  frameworks,
  libraries,
  cloud_services,
  dashboard_tools,
}: {
  datasets?: Dataset[];
  technologies?: string[];
  frameworks?: string[];
  libraries?: string[];
  cloud_services?: string[];
  dashboard_tools?: string[];
}) {
  const hasTech = technologies?.length || frameworks?.length || libraries?.length || cloud_services?.length || dashboard_tools?.length;
  if (!datasets?.length && !hasTech) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Datasets */}
        {datasets && datasets.length > 0 && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/10 via-secondary/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-accent-indigo/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-accent-indigo/50 transition-all duration-500">
              <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-accent-indigo/20 to-highlight/20 border border-accent-indigo/40 rounded-lg flex items-center justify-center">
                    <Database className="w-4 h-4 text-accent-indigo" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-foreground">Datasets</CardTitle>
                    <p className="text-xs text-muted-foreground">{datasets.length} dataset{datasets.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 group-hover:bg-background/5 transition-all duration-500">
                {datasets.map((ds, i) => (
                  <div key={i} className="p-3 rounded-lg bg-accent-indigo/5 border border-accent-indigo/20 hover:border-accent-indigo/40 hover:bg-accent-indigo/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-foreground">{ds.name}</span>
                      {ds.type && (
                        <Badge className={cn('cyberpunk-badge text-xs',
                          ds.type === 'Public' ? 'bg-primary/20 text-primary border-primary/40' :
                          ds.type === 'Custom' ? 'bg-secondary/20 text-secondary border-secondary/40' :
                          'bg-accent-indigo/20 text-accent-indigo border-accent-indigo/40'
                        )}>
                          {ds.type}
                        </Badge>
                      )}
                    </div>
                    {ds.description && (
                      <p className="text-xs text-muted-foreground mb-1.5 leading-relaxed">{ds.description}</p>
                    )}
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {ds.source && (
                        <span className="text-xs text-muted-foreground">
                          Source: <span className="text-accent-indigo font-medium">{ds.source}</span>
                        </span>
                      )}
                      {ds.size && (
                        <span className="text-xs text-muted-foreground">
                          Size: <span className="text-highlight font-medium">{ds.size}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-accent-indigo/60" />
                <div className="w-0.5 h-full bg-accent-indigo/60" />
              </div>
            </Card>
          </div>
        )}

        {/* Tech Stack */}
        {hasTech ? (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 via-primary/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-secondary/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-secondary/50 transition-all duration-500">
              <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-secondary/20 to-primary/20 border border-secondary/40 rounded-lg flex items-center justify-center">
                    <Code className="w-4 h-4 text-secondary" />
                  </div>
                  <CardTitle className="text-base text-foreground">Tech Stack</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 group-hover:bg-background/5 transition-all duration-500">
                {techCategories.map(({ key, label, icon: Icon, color }) => {
                  const items: string[] = key === 'technologies' ? (technologies || [])
                    : key === 'frameworks' ? (frameworks || [])
                    : key === 'libraries' ? (libraries || [])
                    : key === 'cloud_services' ? (cloud_services || [])
                    : (dashboard_tools || []);
                  if (!items.length) return null;
                  return (
                    <div key={key}>
                      <p className={cn('text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5', color.split(' ')[0])}>
                        <Icon className="w-3 h-3" />
                        {label}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {items.map((item) => (
                          <span key={item} className={cn('text-xs rounded px-2 py-1 border font-medium', color)}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-secondary/60" />
                <div className="w-0.5 h-full bg-secondary/60" />
              </div>
            </Card>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

// ─── Deployment + MLOps Section ───────────────────────────────────────────────

function DeploymentOpsSection({ deployment, operations }: { deployment?: DeploymentConfig; operations?: OperationsConfig }) {
  if (!deployment && !operations) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="mb-8"
    >
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-8 h-8 bg-gradient-to-br from-highlight/20 to-soft/20 border border-highlight/40 rounded-lg flex items-center justify-center">
          <Server className="w-4 h-4 text-highlight" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Deployment & MLOps</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Deployment */}
        {deployment && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-highlight/10 via-soft/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-highlight/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-highlight/50 transition-all duration-500">
              <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-highlight/20 to-soft/20 border border-highlight/40 rounded-lg flex items-center justify-center">
                    <Cloud className="w-4 h-4 text-highlight" />
                  </div>
                  <CardTitle className="text-base text-foreground">Deployment</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 group-hover:bg-background/5 transition-all duration-500">
                <div className="grid grid-cols-2 gap-3">
                  {deployment.deployment_type && (
                    <InfoChip label="Type" value={deployment.deployment_type} color="text-highlight border-highlight/40 bg-highlight/10" />
                  )}
                  {deployment.cloud_provider && (
                    <InfoChip label="Cloud" value={deployment.cloud_provider} color="text-primary border-primary/40 bg-primary/10" />
                  )}
                  {deployment.edge_device && (
                    <InfoChip label="Edge Device" value={deployment.edge_device} color="text-secondary border-secondary/40 bg-secondary/10" />
                  )}
                  {deployment.hosting_platform && (
                    <InfoChip label="Platform" value={deployment.hosting_platform} color="text-accent-indigo border-accent-indigo/40 bg-accent-indigo/10" />
                  )}
                  {deployment.api_framework && (
                    <InfoChip label="API" value={deployment.api_framework} color="text-soft border-soft/40 bg-soft/10" />
                  )}
                  {deployment.inference_latency && (
                    <InfoChip label="Latency" value={deployment.inference_latency} color="text-highlight border-highlight/40 bg-highlight/10" />
                  )}
                </div>

                {deployment.runtime && deployment.runtime.length > 0 && (
                  <TagGroup label="Runtime" tags={deployment.runtime} color="text-highlight border-highlight/30 bg-highlight/10" Icon={Cpu} />
                )}
                {deployment.ci_cd_tools && deployment.ci_cd_tools.length > 0 && (
                  <TagGroup label="CI/CD" tags={deployment.ci_cd_tools} color="text-secondary border-secondary/30 bg-secondary/10" Icon={GitBranch} />
                )}
                {deployment.scalability && deployment.scalability.length > 0 && (
                  <TagGroup label="Scalability" tags={deployment.scalability} color="text-primary border-primary/30 bg-primary/10" Icon={Scale} />
                )}
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-highlight/60" />
                <div className="w-0.5 h-full bg-highlight/60" />
              </div>
            </Card>
          </div>
        )}

        {/* MLOps */}
        {operations && (
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-soft/10 via-primary/5 to-transparent rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
            <Card className="relative bg-card/80 border border-soft/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-soft/50 transition-all duration-500">
              <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-soft/20 to-primary/20 border border-soft/40 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-soft" />
                  </div>
                  <CardTitle className="text-base text-foreground">MLOps</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 group-hover:bg-background/5 transition-all duration-500">
                {operations.monitoring && operations.monitoring.length > 0 && (
                  <TagGroup label="Monitoring" tags={operations.monitoring} color="text-primary border-primary/30 bg-primary/10" Icon={Activity} />
                )}
                {operations.logging && operations.logging.length > 0 && (
                  <TagGroup label="Logging" tags={operations.logging} color="text-secondary border-secondary/30 bg-secondary/10" Icon={HardDrive} />
                )}
                {operations.alerting && operations.alerting.length > 0 && (
                  <TagGroup label="Alerting" tags={operations.alerting} color="text-highlight border-highlight/30 bg-highlight/10" Icon={Bell} />
                )}
                {operations.retraining_strategy && (
                  <div className="p-3 rounded-lg bg-soft/5 border border-soft/20">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                      <RefreshCw className="w-3 h-3 text-soft" />Retraining Strategy
                    </p>
                    <p className="text-xs text-foreground/80 leading-relaxed">{operations.retraining_strategy}</p>
                  </div>
                )}
                {operations.experiment_tracking && operations.experiment_tracking.length > 0 && (
                  <TagGroup label="Experiment Tracking" tags={operations.experiment_tracking} color="text-accent-indigo border-accent-indigo/30 bg-accent-indigo/10" Icon={FlaskConical} />
                )}
                {operations.data_versioning && operations.data_versioning.length > 0 && (
                  <TagGroup label="Data Versioning" tags={operations.data_versioning} color="text-soft border-soft/30 bg-soft/10" Icon={Shield} />
                )}
              </CardContent>
              <div className="absolute top-0 left-0 w-5 h-5">
                <div className="w-full h-0.5 bg-soft/60" />
                <div className="w-0.5 h-full bg-soft/60" />
              </div>
            </Card>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Shared helper sub-components ────────────────────────────────────────────

function InfoChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={cn('rounded-lg border p-2.5 transition-all duration-300 hover:scale-105', color)}>
      <p className="text-xs opacity-70 mb-0.5">{label}</p>
      <p className="text-xs font-semibold leading-tight">{value}</p>
    </div>
  );
}

function TagGroup({ label, tags, color, Icon }: { label: string; tags: string[]; color: string; Icon: React.ElementType }) {
  return (
    <div>
      <p className={cn('text-xs font-medium uppercase tracking-wide mb-1.5 flex items-center gap-1.5 opacity-80', color.split(' ')[0])}>
        <Icon className="w-3 h-3" />
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span key={tag} className={cn('text-xs rounded px-2 py-0.5 border font-medium', color)}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

interface ProjectDetailsContentProps {
  project: {
    highlights?: ProjectHighlight[];
    problem_statement?: string;
    business_impact?: string[];
    architecture_overview?: string;
    workflow_steps?: string[];
    datasets?: Dataset[];
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
    <>
      {project.highlights && project.highlights.length > 0 && (
        <HighlightsSection highlights={project.highlights} />
      )}
      <ProblemImpactSection
        problemStatement={project.problem_statement}
        businessImpact={project.business_impact}
      />
      <ArchitectureSection
        overview={project.architecture_overview}
        steps={project.workflow_steps}
      />
      <DatasetsTechStackSection
        datasets={project.datasets}
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
    </>
  );
}
