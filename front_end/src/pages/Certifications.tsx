import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useCertificationsData from '@/hooks/useCertificationsData';
import { PageHeader, CommonBg } from '@/components/common';
import { CertificationsGrid, CertificationSkeleton } from '@/components/certifications';
import { PageMeta } from '@/components/common';

interface CertificationsProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Certifications({ setNavbarWelcomeText }: CertificationsProps) {
  const { certificationsData, welcomeText, loading, error } = useCertificationsData();

  // Update navbar welcome text when certifications data loads
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
          <div className="max-w-7xl mx-auto py-8 lg:py-12">
            <PageHeader 
              title="Certifications"
            />
            <CertificationSkeleton count={6} />
          </div>
        </div>
      </div>
    );
  }

  if (error || !certificationsData) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-4 relative">
        <CommonBg />
        <div className="container mx-auto h-full overflow-y-auto relative z-10">
          <div className="max-w-7xl mx-auto py-8 lg:py-12">
            <PageHeader 
              title="Certifications"
            />
            <div className="text-center py-16">
              <p className="text-muted-foreground">Failed to load certifications data. Please try again later.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageMeta
        title="Professional Certifications - Akhil Nadh PC"
        description="View the list of professional certifications earned by Akhil Nadh PC in fields like data science, machine learning, and cloud computing."
        keywords="certifications, data science certification, machine learning certification, Akhil Nadh PC"
      />
      <div className="h-full flex items-center justify-center bg-background relative overflow-hidden">
        <CommonBg />

        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto py-8 lg:py-12"
          >
            {/* Page Header */}
            <PageHeader 
              title="Certifications"
            />
            
            {/* Certifications Grid */}
            <CertificationsGrid certifications={certificationsData.certifications} />
          </motion.div>
        </div>
      </div>
    </>
  );
} 