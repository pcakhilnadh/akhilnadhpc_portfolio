import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import {
  Brain, Cpu, Server, Zap, Settings, ChevronRight, Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MLModel } from '@/data';

interface ProjectMetricsProps {
  models: MLModel[];
}

const TRAINING_TYPE_COLOR: Record<string, string> = {
  'Fine-tuned':       'bg-primary/10 text-primary border-primary/25',
  'Transfer Learning':'bg-secondary/10 text-secondary border-secondary/25',
  'Custom Trained':   'bg-accent-indigo/10 text-accent-indigo border-accent-indigo/25',
  'Pretrained':       'bg-muted/20 text-muted-foreground border-muted/30',
};

const INFERENCE_COLOR: Record<string, string> = {
  Edge:   'bg-highlight/10 text-highlight border-highlight/25',
  Cloud:  'bg-primary/10 text-primary border-primary/25',
  Hybrid: 'bg-secondary/10 text-secondary border-secondary/25',
};

const METRIC_STYLES = {
  accuracy:  { label: 'Accuracy',  color: 'text-primary bg-primary/10 border-primary/20'               },
  precision: { label: 'Precision', color: 'text-secondary bg-secondary/10 border-secondary/20'         },
  recall:    { label: 'Recall',    color: 'text-accent-indigo bg-accent-indigo/10 border-accent-indigo/20' },
  f1_score:  { label: 'F1 Score',  color: 'text-highlight bg-highlight/10 border-highlight/20'          },
} as const;

function fmtVal(v: number): string {
  return v <= 1 ? `${(v * 100).toFixed(1)}%` : v.toFixed(3);
}

export default function ProjectMetrics({ models }: ProjectMetricsProps) {
  if (!models.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {models.map((model, idx) => {
        const metrics = model.metrics || {};
        const numericKeys = (['accuracy', 'precision', 'recall', 'f1_score'] as const).filter((k) => metrics[k] != null);
        const customEntries = Object.entries(metrics.custom_metrics || {});

        return (
          <motion.div
            key={`${model.component_name}-${idx}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.4 }}
            className="rounded-xl border border-border/40 bg-card/50 hover:border-primary/28 hover:bg-card/70 transition-all duration-300 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 p-5 pb-4 border-b border-border/25">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground/55 mb-0.5">{model.component_name}</p>
                  <p className="text-sm font-bold text-foreground leading-tight">{model.model_name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1 flex-shrink-0">
                <Badge className={cn('text-xs font-medium border', TRAINING_TYPE_COLOR[model.training_type || ''] || 'bg-muted/20 text-muted-foreground border-muted/30')}>
                  {model.training_type || 'Pretrained'}
                </Badge>
                {model.inference_location && (
                  <Badge className={cn('text-xs font-medium border', INFERENCE_COLOR[model.inference_location] || 'bg-muted/20 text-muted-foreground border-muted/30')}>
                    {model.inference_location}
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Type + Framework chips */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs bg-secondary/8 text-secondary/80 border border-secondary/20 rounded-md px-2 py-1">
                  <Cpu className="w-3 h-3" />
                  {model.model_type}
                </span>
                {model.framework && (
                  <span className="inline-flex items-center gap-1.5 text-xs bg-accent-indigo/8 text-accent-indigo/80 border border-accent-indigo/20 rounded-md px-2 py-1">
                    <Server className="w-3 h-3" />
                    {model.framework}
                  </span>
                )}
              </div>

              {/* Purpose */}
              {model.purpose && (
                <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-3">
                  {model.purpose}
                </p>
              )}

              {/* Numeric metrics */}
              {numericKeys.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {numericKeys.map((key) => {
                    const val = metrics[key]!;
                    const { label, color } = METRIC_STYLES[key];
                    const pct = val <= 1 ? val * 100 : Math.min(val, 100);
                    return (
                      <div key={key} className={cn('rounded-lg border p-3', color)}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs opacity-65">{label}</span>
                          <span className="text-sm font-bold font-mono tabular-nums">{fmtVal(val)}</span>
                        </div>
                        <div className="h-1 bg-current/15 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 + idx * 0.1 }}
                            className="h-full bg-current rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Latency */}
              {metrics.latency && (
                <div className="flex items-center gap-2 text-xs">
                  <Gauge className="w-3.5 h-3.5 text-highlight/65" />
                  <span className="text-muted-foreground/55">Latency:</span>
                  <span className="font-semibold text-highlight">{metrics.latency}</span>
                </div>
              )}

              {/* Custom metrics */}
              {customEntries.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {customEntries.map(([k, v]) => (
                    <span key={k} className="text-xs bg-soft/8 text-soft/80 border border-soft/20 rounded px-2 py-0.5">
                      {k}: <span className="font-semibold">
                        {typeof v === 'number' && v <= 1 ? `${(v * 100).toFixed(1)}%` : v}
                      </span>
                    </span>
                  ))}
                </div>
              )}

              {/* Optimizations */}
              {model.optimization && model.optimization.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap className="w-3 h-3" />Optimizations
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {model.optimization.map((opt) => (
                      <span key={opt} className="text-xs bg-highlight/8 text-highlight/80 border border-highlight/20 rounded px-2 py-0.5">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Training config */}
              {model.training_config && (
                <div className="border-t border-border/25 pt-3">
                  <p className="text-xs text-muted-foreground/50 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Settings className="w-3 h-3" />Training Config
                  </p>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {([
                      ['Platform',     model.training_config.platform],
                      ['GPU',          model.training_config.gpu?.[0]],
                      ['Epochs',       model.training_config.epochs?.toString()],
                      ['Batch Size',   model.training_config.batch_size?.toString()],
                      ['Optimizer',    model.training_config.optimizer],
                      ['Learning Rate',model.training_config.learning_rate?.toString()],
                    ] as [string, string | undefined][]).filter(([, v]) => v).map(([label, value]) => (
                      <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <ChevronRight className="w-3 h-3 text-primary/35 flex-shrink-0" />
                        <span className="opacity-55">{label}:</span>
                        <span className="font-medium text-foreground/75">{value}</span>
                      </div>
                    ))}
                  </div>
                  {model.training_config.notes && (
                    <p className="mt-2 text-xs text-muted-foreground/55 italic border-l-2 border-secondary/20 pl-2">
                      {model.training_config.notes}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
