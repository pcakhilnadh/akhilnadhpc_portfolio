import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useCertificationsData from '@/hooks/useCertificationsData';
import { PageHeader } from '@/components/common';
import { CertificationsGrid, CertificationSkeleton } from '@/components/certifications';

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
      <div className="h-full flex items-center justify-center bg-background p-4">
        <div className="container mx-auto h-full overflow-y-auto">
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
      <div className="h-full flex items-center justify-center bg-background p-4">
        <div className="container mx-auto h-full overflow-y-auto">
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
    <div className="h-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Subtle Sky Background Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent-foreground/5" />
      
      {/* Additional ambient background elements */}
      <div className="absolute inset-0 opacity-30">
        {/* Large background orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`bg-orb-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${200 + Math.random() * 300}px`,
              height: `${200 + Math.random() * 300}px`,
              left: `${Math.random() * 120 - 10}%`,
              top: `${Math.random() * 120 - 10}%`,
              background: `radial-gradient(circle, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent-foreground) / 0.05) 50%, transparent 100%)`,
              filter: 'blur(6px)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 40 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

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
  );
} 