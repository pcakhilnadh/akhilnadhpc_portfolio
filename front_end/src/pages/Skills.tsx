import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useSkillsData from '@/hooks/useSkillsData';
import { Skeleton } from '@/components/ui/skeleton';
import { CommonBg } from '@/components/common';

interface SkillsProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Skills({ setNavbarWelcomeText }: SkillsProps) {
  const { skillsData, welcomeText, loading, error } = useSkillsData();

  // Update navbar welcome text when skills data loads
  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-4xl mx-auto py-12">
            <Skeleton className="h-12 w-48 mx-auto mb-12" />
            <div className="grid md:grid-cols-2 gap-8">
              {[...Array(12)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !skillsData) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-4xl mx-auto py-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-primary">Skills</span> & Technologies
              </h2>
              <p className="text-muted-foreground">
                {error || 'Failed to load skills data. Please try again later.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-background relative">
      <CommonBg />
      <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto py-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary">Skills</span> & Technologies
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillsData.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass p-6 rounded-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-mono text-foreground text-lg">{skill.name}</span>
                  <span className="text-primary font-mono font-bold">{Math.round(skill.rating * 20)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${Math.round(skill.rating * 20)}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-primary h-3 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 