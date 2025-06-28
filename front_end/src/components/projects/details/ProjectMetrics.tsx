import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  BarChart3, 
  Target, 
  TrendingUp,
  Activity,
  Zap,
  Database,
  Server,
  Trophy,
  Gauge
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectMetricsProps {
  project: {
    ml_models?: Array<{
      id: string;
      name: string;
      model_type: string;
      framework: string;
      version: string;
      training_data_size: string;
      deployment_status: string;
      description?: string;
      evaluation_metrics?: Array<{
        id: string;
        metric_name: string;
        metric_value: number;
        metric_type: string;
      }>;
    }>;
    achievements?: Array<{
      id: string;
      achievement_title: string;
    }>;
  };
}

export default function ProjectMetrics({ project }: ProjectMetricsProps) {
  if (!project.ml_models?.length && !project.achievements?.length) {
    return null;
  }

  const getMetricIcon = (metricName: string) => {
    const name = metricName.toLowerCase();
    if (name.includes('accuracy')) return Target;
    if (name.includes('precision')) return BarChart3;
    if (name.includes('recall')) return TrendingUp;
    if (name.includes('f1')) return Activity;
    return Gauge;
  };

  const getMetricColor = (value: number, metricName: string) => {
    // Convert to percentage if it's a decimal
    const percentage = value <= 1 ? value * 100 : value;
    
    if (percentage >= 90) return 'text-primary border-primary/40 bg-primary/10';
    if (percentage >= 80) return 'text-secondary border-secondary/40 bg-secondary/10';
    if (percentage >= 70) return 'text-accent-indigo border-accent-indigo/40 bg-accent-indigo/10';
    return 'text-highlight border-highlight/40 bg-highlight/10';
  };

  const formatMetricValue = (value: number, metricName: string) => {
    // Convert to percentage if it's a decimal
    if (value <= 1) {
      return `${(value * 100).toFixed(1)}%`;
    }
    return value.toFixed(3);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ML Models Metrics */}
        {project.ml_models?.map((model, modelIndex) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + modelIndex * 0.1 }}
            className="relative group"
          >
            {/* Enhanced Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent-indigo/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:from-primary/20 group-hover:via-secondary/10 group-hover:to-accent-indigo/20 transition-all duration-500" />
            
            <Card className="relative bg-card/80 border border-primary/30 backdrop-blur-md cyberpunk-card group-hover:bg-card/95 group-hover:border-primary/50 group-hover:backdrop-blur-xl transition-all duration-500">
              <CardHeader className="pb-4 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary/40 group-hover:to-secondary/40 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-500">
                      <Brain className="w-5 h-5 text-primary group-hover:text-primary/90 group-hover:scale-110 transition-all duration-500" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-foreground group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-500">{model.name}</CardTitle>
                      <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-all duration-500">{model.model_type}</p>
                    </div>
                  </div>
                  <Badge className="cyberpunk-badge bg-primary/20 text-primary border-primary/40 group-hover:bg-primary/30 group-hover:border-primary/60 group-hover:shadow-lg transition-all duration-500">
                    v{model.version}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="group-hover:bg-background/5 transition-all duration-500">
                {/* Model Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="cyberpunk-info-card hover:bg-background/20 transition-all duration-300">
                    <div className="flex items-center space-x-2 mb-1">
                      <Server className="w-3 h-3 text-secondary group-hover:scale-110 transition-all duration-300" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide group-hover:text-foreground/80 transition-all duration-300">Framework</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-300">{model.framework}</p>
                  </div>
                  <div className="cyberpunk-info-card hover:bg-background/20 transition-all duration-300">
                    <div className="flex items-center space-x-2 mb-1">
                      <Database className="w-3 h-3 text-accent-indigo group-hover:scale-110 transition-all duration-300" />
                      <span className="text-xs text-muted-foreground uppercase tracking-wide group-hover:text-foreground/80 transition-all duration-300">Data Size</span>
                    </div>
                    <p className="font-semibold text-foreground text-sm group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-300">{model.training_data_size}</p>
                  </div>
                </div>

                {/* Metrics Grid */}
                {model.evaluation_metrics && model.evaluation_metrics.length > 0 && (
                  <div>
                    <h4 className="flex items-center space-x-2 text-sm font-semibold text-foreground mb-4 group-hover:text-foreground/95 transition-all duration-500">
                      <BarChart3 className="w-4 h-4 text-primary group-hover:scale-110 transition-all duration-500" />
                      <span>Performance Metrics</span>
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {model.evaluation_metrics.map((metric, metricIndex) => {
                        const MetricIcon = getMetricIcon(metric.metric_name);
                        const colorClass = getMetricColor(metric.metric_value, metric.metric_name);
                        
                        return (
                          <motion.div
                            key={metric.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.2 + metricIndex * 0.1 }}
                            className={cn(
                              "relative p-4 rounded-lg border backdrop-blur-sm group/metric cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl hover:backdrop-blur-lg",
                              colorClass
                            )}
                          >
                            {/* Enhanced Animated background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-current/5 to-current/15 rounded-lg opacity-0 group-hover/metric:opacity-100 transition-all duration-300" />
                            
                            <div className="relative">
                              <div className="flex items-center justify-between mb-2">
                                <MetricIcon className="w-4 h-4 group-hover/metric:scale-125 transition-all duration-300" />
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ duration: 0.5, delay: 0.3 + metricIndex * 0.1 }}
                                  className="text-lg font-bold font-mono group-hover/metric:text-xl group-hover/metric:drop-shadow-sm transition-all duration-300"
                                >
                                  {formatMetricValue(metric.metric_value, metric.metric_name)}
                                </motion.div>
                              </div>
                              <p className="text-xs font-medium capitalize group-hover/metric:text-sm group-hover/metric:font-semibold transition-all duration-300">{metric.metric_name}</p>
                              
                              {/* Enhanced Progress bar */}
                              <div className="mt-2 bg-current/20 rounded-full h-1 overflow-hidden group-hover/metric:h-1.5 transition-all duration-300">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${metric.metric_value <= 1 ? metric.metric_value * 100 : Math.min(metric.metric_value, 100)}%` }}
                                  transition={{ duration: 1, delay: 0.5 + metricIndex * 0.1 }}
                                  className="h-full bg-current rounded-full group-hover/metric:shadow-sm transition-all duration-300"
                                />
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Deployment Status */}
                <div className="mt-4 pt-4 border-t border-primary/20 group-hover:border-primary/40 transition-all duration-500">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-secondary group-hover:scale-110 transition-all duration-500" />
                    <span className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-all duration-500">Status:</span>
                    <Badge className={cn(
                      "cyberpunk-badge text-xs group-hover:scale-105 transition-all duration-500",
                      model.deployment_status.toLowerCase() === 'production' 
                        ? 'bg-primary/20 text-primary border-primary/40 group-hover:bg-primary/30 group-hover:border-primary/60 group-hover:shadow-lg'
                        : 'bg-secondary/20 text-secondary border-secondary/40 group-hover:bg-secondary/30 group-hover:border-secondary/60 group-hover:shadow-lg'
                    )}>
                      {model.deployment_status}
                    </Badge>
                  </div>
                </div>
              </CardContent>

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
            </Card>
          </motion.div>
        ))}

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative group"
          >
            {/* Enhanced Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-indigo/10 via-highlight/5 to-soft/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:from-accent-indigo/20 group-hover:via-highlight/10 group-hover:to-soft/20 transition-all duration-500" />
            
            <Card className="relative bg-card/80 border border-accent-indigo/30 backdrop-blur-md cyberpunk-card h-full group-hover:bg-card/95 group-hover:border-accent-indigo/50 group-hover:backdrop-blur-xl transition-all duration-500">
              <CardHeader className="pb-4 group-hover:bg-background/10 transition-all duration-500">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-indigo/20 to-highlight/20 border border-accent-indigo/40 rounded-lg flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-accent-indigo/40 group-hover:to-highlight/40 group-hover:border-accent-indigo/60 group-hover:shadow-lg group-hover:shadow-accent-indigo/25 transition-all duration-500">
                    <Trophy className="w-5 h-5 text-accent-indigo group-hover:text-accent-indigo/90 group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <div>
                    <CardTitle className="text-lg text-foreground group-hover:text-foreground/95 group-hover:drop-shadow-sm transition-all duration-500">Key Achievements</CardTitle>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/70 transition-all duration-500">Project milestones & impacts</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="group-hover:bg-background/5 transition-all duration-500">
                <div className="space-y-3">
                  {project.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-accent-indigo/10 to-highlight/10 border border-accent-indigo/20 group/achievement hover:border-accent-indigo/50 hover:bg-gradient-to-r hover:from-accent-indigo/20 hover:to-highlight/20 hover:backdrop-blur-lg hover:scale-105 transition-all duration-300"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-accent-indigo/20 to-highlight/20 border border-accent-indigo/40 rounded-full flex items-center justify-center group-hover/achievement:shadow-xl group-hover/achievement:shadow-accent-indigo/30 group-hover/achievement:scale-110 transition-all duration-300">
                        <Trophy className="w-4 h-4 text-accent-indigo group-hover/achievement:scale-125 transition-all duration-300" />
                      </div>
                      <p className="font-medium text-foreground group-hover/achievement:text-accent-indigo group-hover/achievement:font-semibold group-hover/achievement:drop-shadow-sm transition-all duration-300">
                        {achievement.achievement_title}
                      </p>
                    </motion.div>
                  ))}
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
  );
} 