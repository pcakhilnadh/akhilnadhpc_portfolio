import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useAboutData from '@/hooks/useAboutData';
import { UserProfileCard, BiographyCard, SkillsCard } from '@/components/about/index';
import { Skeleton } from '@/components/ui/skeleton';

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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-6xl mx-auto py-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                About <span className="text-primary">Me</span>
              </h2>
              <p className="text-muted-foreground">
                {error || 'Failed to load about data. Please try again later.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 h-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto py-12"
        >
          <h2 className="text-4xl font-bold text-center mb-16">
            About <span className="text-primary">Me</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User Profile Card */}
            <div className="lg:col-span-1">
              <UserProfileCard 
                personalInfo={aboutData.personal_info}
                familyInfo={aboutData.family_info}
                hobbies={aboutData.hobbies}
              />
            </div>
            
            {/* Right Column - Biography and Skills */}
            <div className="lg:col-span-2 space-y-8">
              <BiographyCard 
                longDescriptiveSummary={aboutData.personal_info.long_descriptive_summary || ''}
              />
              
              <SkillsCard skills={aboutData.skills} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 