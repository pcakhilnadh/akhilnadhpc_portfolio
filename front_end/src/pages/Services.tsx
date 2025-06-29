import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ServicesGrid, ServicesHero } from '@/components/services';
import { PageMeta } from '@/components/common';
import { useServicesData } from '@/hooks/useServicesData';
import { cn } from '@/lib/utils';
import { getIconComponent } from '@/lib/iconMapping';

interface ServicesProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Services({ setNavbarWelcomeText }: ServicesProps) {
  const { data, loading, error } = useServicesData();
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    setNavbarWelcomeText('my_services.exe');
    const checkMobileLandscape = () => {
      setIsMobileLandscape(window.innerWidth > window.innerHeight && window.innerHeight < 768);
    };
    checkMobileLandscape();
    window.addEventListener('resize', checkMobileLandscape);
    window.addEventListener('orientationchange', checkMobileLandscape);
    return () => {
      window.removeEventListener('resize', checkMobileLandscape);
      window.removeEventListener('orientationchange', checkMobileLandscape);
    };
  }, [setNavbarWelcomeText]);

  const getSectionTitle = () => {
    if (!data?.services.length) return "What I Offer";
    
    const categories = data.categories;
    if (categories.includes('AI/ML')) {
      return "AI & Technology Solutions";
    } else if (categories.includes('Development')) {
      return "Development Services";
    } else {
      return "Professional Services";
    }
  };

  const getSectionDescription = () => {
    if (!data?.services.length) {
      return "From AI-powered solutions to complete digital transformations, I deliver cutting-edge services tailored to your business needs.";
    }
    
    const categories = data.categories;
    const totalServices = data.total_services;
    
    if (categories.includes('AI/ML') && categories.includes('Development')) {
      return `Comprehensive ${totalServices}+ AI-powered solutions and development services to transform your business with cutting-edge technology.`;
    } else if (categories.includes('AI/ML')) {
      return `Advanced ${totalServices}+ AI and machine learning solutions to automate and optimize your business processes.`;
    } else if (categories.includes('Development')) {
      return `Full-stack ${totalServices}+ development services to build robust, scalable applications for your business needs.`;
    } else {
      return `Professional ${totalServices}+ services tailored to your specific business requirements and goals.`;
    }
  };

  return (
    <>
      <PageMeta
        title="Services - AI/ML, Development, Consulting | Akhil Nadh PC"
        description="Discover the professional services offered by Akhil Nadh PC, including AI/ML model development, end-to-end software development, and expert consulting."
        keywords="AI services, machine learning consulting, software development, data science consulting, Akhil Nadh PC"
      />
      <div 
        className={cn(
          "h-full overflow-hidden",
          isMobileLandscape ? "overflow-y-auto" : ""
        )}
      >
        <ServicesHero />
        <ServicesGrid />
      </div>
    </>
  );
} 