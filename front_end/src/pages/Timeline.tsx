import React, { useEffect } from 'react';
import useTimelineData from '@/hooks/useTimelineData';
import { Skeleton } from '@/components/ui/skeleton';
import Timeline from '@/components/timeline/Timeline';
import { PageHeader, CommonBg } from '@/components/common';
import { PageMeta } from '@/components/common';

interface TimelineProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function TimelinePage({ setNavbarWelcomeText }: TimelineProps) {
  const { timelineData, welcomeText, loading, error } = useTimelineData();

  // Update navbar welcome text when timeline data loads
  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-4 relative">
        <CommonBg />
        <div className="container mx-auto h-full overflow-y-auto relative z-10">
          <div className="max-w-5xl mx-auto py-8 lg:py-12">
            <Skeleton className="h-8 sm:h-12 w-40 sm:w-48 mx-auto mb-8 lg:mb-12" />
            <div className="space-y-6 lg:space-y-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-28 sm:h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !timelineData) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-4 relative">
        <CommonBg />
        <div className="container mx-auto h-full overflow-y-auto relative z-10">
          <div className="max-w-5xl mx-auto py-8 lg:py-12">
            <PageHeader 
              title="Experience Timeline"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Career Timeline - Akhil Nadh PC"
        description="Explore the career timeline of Akhil Nadh PC, detailing his work experience, education, and professional growth as a Lead Data Scientist."
        keywords="career timeline, work experience, professional journey, Akhil Nadh PC"
      />
      <div className="h-full bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <Timeline 
            experiences={timelineData.experiences} 
            education={timelineData.education} 
          />
        </div>
      </div>
    </>
  );
} 