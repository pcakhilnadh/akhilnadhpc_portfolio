import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAboutData from '@/hooks/useAboutData';
import { UserProfileCard, BiographyCard, SkillsCard } from '@/components/about/index';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader, CommonBg, PageMeta } from '@/components/common';

interface AboutProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function About({ setNavbarWelcomeText }: AboutProps) {
  const { aboutData, welcomeText, loading, error } = useAboutData();

  // Update navbar welcome text when about data loads
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
          <div className="max-w-6xl mx-auto py-12">
            <Skeleton className="h-12 w-48 mx-auto mb-16" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Skeleton className="h-96" />
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !aboutData) {
    return (
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-6xl mx-auto py-12">
            <PageHeader 
              title="About Me"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="About Akhil Nadh PC | Lead Data Scientist"
        description="Learn more about Akhil Nadh PC, a Lead Data Scientist. Discover his background, skills, professional journey, and personal interests."
        keywords="About Akhil Nadh PC, biography, skills, data science career"
      />
      <div className="h-full flex items-center justify-center bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto py-12"
          >
            <PageHeader 
              title="About Me"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - User Profile Card */}
              <div className="lg:col-span-1">
                <UserProfileCard 
                  personalInfo={aboutData.personal_info}
                  familyInfo={aboutData.family_info}
                  hobbies={aboutData.hobbies}
                  variant="dark"
                />
              </div>
              
              {/* Right Column - Biography and Skills */}
              <div className="lg:col-span-2 space-y-8">
                <BiographyCard 
                  longDescriptiveSummary={aboutData.personal_info.long_descriptive_summary || ''}
                />
                
                <SkillsCard />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
} 