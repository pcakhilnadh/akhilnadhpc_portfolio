import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

interface CertificationSkeletonProps {
  count?: number;
}

export default function CertificationSkeleton({ count = 6 }: CertificationSkeletonProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative group"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent-foreground/5 to-primary/10 rounded-xl blur-lg opacity-50" />
          
          {/* Main skeleton card */}
          <div className="relative bg-card/80 border border-primary/20 rounded-xl p-6 backdrop-blur-sm">
            {/* Header skeleton */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>

            {/* Content skeleton */}
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20">
                  <Skeleton className="w-4 h-4 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 p-3 rounded-lg bg-muted/20">
                  <Skeleton className="w-4 h-4 rounded" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>

              {/* Skills skeleton */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-4 h-4 rounded" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>
              </div>
            </div>

            {/* Footer skeleton */}
            <div className="mt-6 pt-4 border-t border-primary/20">
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
} 