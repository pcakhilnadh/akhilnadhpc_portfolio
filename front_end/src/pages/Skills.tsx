import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useSkillsData from '@/hooks/useSkillsData';
import { Skeleton } from '@/components/ui/skeleton';
import { CommonBg } from '@/components/common';
import PageHeader from '@/components/common/PageHeader';
import { PageMeta } from '@/components/common';
import Skills from '@/components/skills/Skills';

interface SkillsProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function SkillsPage({ setNavbarWelcomeText }: SkillsProps) {
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
    <>
      <PageMeta
        title="Technical Skills - Akhil Nadh PC | Lead Data Scientist"
        description="Explore the technical skills of Akhil Nadh PC, including programming languages, machine learning frameworks, cloud platforms, and data analysis tools."
        keywords="technical skills, data science skills, python, tensorflow, pytorch, AWS, GCP, SQL"
      />
      <div className="p-4 sm:p-6 h-full overflow-y-auto">
        <PageHeader 
          title="My Technical Arsenal"
          subtitle="A showcase of my skills and expertise."
        />
        <div className="mt-8">
          <Skills />
        </div>
      </div>
    </>
  );
} 