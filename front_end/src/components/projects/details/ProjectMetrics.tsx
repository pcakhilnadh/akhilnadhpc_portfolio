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
  Cpu,
  Gauge,
  ChevronRight,
  Settings,
  MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MLModel } from '@/data';

interface ProjectMetricsProps {
  models: MLModel[];
}

const metricColors: Record<string, string> = {
  accuracy: 'text-primary border-primary/40 bg-primary/10',
  precision: 'text-secondary border-secondary/40 bg-secondary/10',
  recall: 'text-accent-indigo border-accent-indigo/40 bg-accent-indigo/10',
  f1_score: 'text-highlight border-highlight/40 bg-highlight/10',
  default: 'text-soft border-soft/40 bg-soft/10',
};

const trainingTypeBadgeColor: Record<string, string> = {
  'Fine-tuned': 'bg-primary/20 text-primary border-primary/40',
  'Transfer Learning': 'bg-secondary/20 text-secondary border-secondary/40',
  'Custom Trained': 'bg-accent-indigo/20 text-accent-indigo border-accent-indigo/40',
  'Pretrained': 'bg-soft/20 text-soft border-soft/40',
};

const inferenceLocationColor: Record<string, string> = {
  'Edge': 'bg-highlight/20 text-highlight border-highlight/40',
  'Cloud': 'bg-primary/20 text-primary border-primary/40',
  'Hybrid': 'bg-secondary/20 text-secondary border-secondary/40',
};

function formatMetricValue(value: number | string): string {
  if (typeof value === 'string') return value;
  if (value <= 1) return `${(value * 100).toFixed(1)}%`;
  return value.toFixed(3);
}

function getMetricPercentage(value: number): number {
  return value <= 1 ? value * 100 : Math.min(value, 100);
}

export default function ProjectMetrics({ models }: ProjectMetricsProps) {
  if (!models.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      {/* Section heading */}
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">ML Models</h2>
        <Badge className="cyberpunk-badge bg-primary/20 text-primary border-primary/40 text-xs">{models.length} model{models.length !== 1 ? 's' : ''}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {models.map((model, modelIndex) => {
          const metrics = model.metrics || {};
          const hasNumericMetrics = metrics.accuracy != null || metrics.precision != null || metrics.recall != null || metrics.f1_score != null;
          const customMetrics = metrics.custom_metrics || {};

          return (
            <motion.div
              key={`${model.component_name}-${modelIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + modelIndex * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent-indigo/10 rounded-xl blur-lg opacity-60 group-hover:opacity-100 group-hover:from-primary/20 group-hover:via-secondary/10 group-hover:to-accent-indigo/20 transition-all duration-500" />

              <Card className="relative bg-card/80 border border-primary/30 backdrop-blur-md cyberpunk-card group-hover:bg-card/95 group-hover:border-primary/50 transition-all duration-500 h-full">
                {/* Card Header */}
                <CardHeader className="pb-3 group-hover:bg-background/10 transition-all duration-500">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3 flex-1 min-w-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/40 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:from-primary/40 group-hover:to-secondary/40 group-hover:border-primary/60 group-hover:shadow-lg group-hover:shadow-primary/25 transition-all duration-500">
                        <Brain className="w-5 h-5 text-primary group-hover:scale-110 transition-all duration-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{model.component_name}</p>
                        <CardTitle className="text-base text-foreground leading-tight">{model.model_name}</CardTitle>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      <Badge className={cn('cyberpunk-badge text-xs', trainingTypeBadgeColor[model.training_type || ''] || 'bg-muted/20 text-muted-foreground border-muted/40')}>
                        {model.training_type || 'Pretrained'}
                      </Badge>
                      {model.inference_location && (
                        <Badge className={cn('cyberpunk-badge text-xs', inferenceLocationColor[model.inference_location] || 'bg-muted/20 text-muted-foreground border-muted/40')}>
                          {model.inference_location}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="group-hover:bg-background/5 transition-all duration-500 space-y-4">
                  {/* Type + Framework row */}
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-secondary/15 text-secondary border border-secondary/30 rounded px-2 py-1">
                      <Cpu className="w-3 h-3" />
                      {model.model_type}
                    </span>
                    {model.framework && (
                      <span className="inline-flex items-center gap-1.5 text-xs bg-accent-indigo/15 text-accent-indigo border border-accent-indigo/30 rounded px-2 py-1">
                        <Server className="w-3 h-3" />
                        {model.framework}
                      </span>
                    )}
                  </div>

                  {/* Purpose */}
                  {model.purpose && (
                    <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3">
                      {model.purpose}
                    </p>
                  )}

                  {/* Numeric performance metrics */}
                  {hasNumericMetrics && (
                    <div>
                      <h4 className="flex items-center space-x-1.5 text-xs font-semibold text-foreground mb-3 uppercase tracking-wide">
                        <BarChart3 className="w-3.5 h-3.5 text-primary" />
                        <span>Performance</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {(['accuracy', 'precision', 'recall', 'f1_score'] as const).map((key) => {
                          const val = metrics[key];
                          if (val == null) return null;
                          const colorClass = metricColors[key] || metricColors.default;
                          const pct = getMetricPercentage(val);
                          return (
                            <motion.div
                              key={key}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.4, delay: 0.3 + modelIndex * 0.05 }}
                              className={cn('relative p-3 rounded-lg border cursor-default transition-all duration-300 hover:scale-105 hover:shadow-lg', colorClass)}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <p className="text-xs font-medium capitalize">{key.replace('_', ' ')}</p>
                                <span className="text-sm font-bold font-mono">{formatMetricValue(val)}</span>
                              </div>
                              <div className="bg-current/20 rounded-full h-1 overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${pct}%` }}
                                  transition={{ duration: 1, delay: 0.5 + modelIndex * 0.1 }}
                                  className="h-full bg-current rounded-full"
                                />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Latency */}
                  {metrics.latency && (
                    <div className="flex items-center gap-2 text-xs">
                      <Gauge className="w-3.5 h-3.5 text-highlight" />
                      <span className="text-muted-foreground">Latency:</span>
                      <span className="font-semibold text-highlight">{metrics.latency}</span>
                    </div>
                  )}

                  {/* Custom metrics */}
                  {Object.keys(customMetrics).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(customMetrics).map(([k, v]) => (
                        <span key={k} className="text-xs bg-soft/15 text-soft border border-soft/30 rounded px-2 py-1">
                          {k}: <span className="font-semibold">{typeof v === 'number' && v <= 1 ? `${(v * 100).toFixed(1)}%` : v}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Optimization */}
                  {model.optimization && model.optimization.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Zap className="w-3 h-3" />Optimizations
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {model.optimization.map((opt) => (
                          <span key={opt} className="text-xs bg-highlight/15 text-highlight border border-highlight/30 rounded px-2 py-0.5">
                            {opt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Training config summary */}
                  {model.training_config && (
                    <div className="border-t border-primary/20 pt-3">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                        <Settings className="w-3 h-3" />Training Config
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        {model.training_config.platform && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary/60" />
                            <span>Platform:</span>
                            <span className="font-medium text-foreground">{model.training_config.platform}</span>
                          </div>
                        )}
                        {model.training_config.gpu && model.training_config.gpu.length > 0 && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary/60" />
                            <span>GPU:</span>
                            <span className="font-medium text-foreground">{model.training_config.gpu[0]}</span>
                          </div>
                        )}
                        {model.training_config.epochs != null && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary/60" />
                            <span>Epochs:</span>
                            <span className="font-medium text-foreground">{model.training_config.epochs}</span>
                          </div>
                        )}
                        {model.training_config.batch_size != null && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary/60" />
                            <span>Batch:</span>
                            <span className="font-medium text-foreground">{model.training_config.batch_size}</span>
                          </div>
                        )}
                        {model.training_config.optimizer && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary/60" />
                            <span>Optimizer:</span>
                            <span className="font-medium text-foreground">{model.training_config.optimizer}</span>
                          </div>
                        )}
                        {model.training_config.learning_rate != null && (
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <ChevronRight className="w-3 h-3 text-primary/60" />
                            <span>LR:</span>
                            <span className="font-medium text-foreground">{model.training_config.learning_rate}</span>
                          </div>
                        )}
                      </div>
                      {model.training_config.notes && (
                        <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-secondary/30 pl-2">
                          {model.training_config.notes}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>

                {/* Corner decorations */}
                <div className="absolute top-0 left-0 w-5 h-5">
                  <div className="w-full h-0.5 bg-primary shadow-sm shadow-primary/50" />
                  <div className="w-0.5 h-full bg-primary shadow-sm shadow-primary/50" />
                </div>
                <div className="absolute top-0 right-0 w-5 h-5">
                  <div className="w-full h-0.5 bg-secondary shadow-sm shadow-secondary/50" />
                  <div className="w-0.5 h-full ml-auto bg-secondary shadow-sm shadow-secondary/50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </Card>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
