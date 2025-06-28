import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import { Experience, Education } from '@/types/data';
import TimelineItem from './TimelineItem';
import { PageHeader } from '@/components/common';

interface TimelineProps {
  experiences: Experience[];
  education: Education[];
}

type TimelineItem = (Experience & { type: 'experience' }) | (Education & { type: 'education' });

export default function Timeline({ experiences, education }: TimelineProps) {
  // Combine experiences and education into timeline items
  const timelineItems: TimelineItem[] = [
    ...experiences.map(exp => ({ ...exp, type: 'experience' as const })),
    ...education.map(edu => ({ ...edu, type: 'education' as const }))
  ];

  // Sort by start date (most recent first)
  const sortedItems = timelineItems.sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="h-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/10" />
      
      <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto py-8 lg:py-12"
        >
          {/* Page Header */}
          <PageHeader 
            title="My Journey So Far"
          />

          {/* Cyberpunk Timeline Container */}
          <div className="relative">
            {/* Glowing Vertical Line - Hidden on mobile/tablet, visible only on large desktop */}
            <div 
              className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 rounded-full"
              style={{
                background: `linear-gradient(to bottom, transparent, var(--color-primary), var(--color-secondary), var(--color-accent-indigo), var(--color-soft), var(--color-primary), transparent)`,
                boxShadow: `var(--glow-primary), var(--glow-secondary)`
              }}
            />
            
            {/* Timeline Items */}
            <div className="space-y-8 lg:space-y-16 xl:space-y-20">
              {sortedItems.map((item, index) => (
                <TimelineItem
                  key={`${item.type}-${item.id}`}
                  item={item}
                  index={index}
                  isLast={index === sortedItems.length - 1}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}





