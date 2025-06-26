import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useCertificationsData from '@/hooks/useCertificationsData';
import { Skeleton } from '@/components/ui/skeleton';

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
          <div className="max-w-5xl mx-auto py-8 lg:py-12">
            <Skeleton className="h-8 sm:h-12 w-40 sm:w-48 mx-auto mb-8 lg:mb-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-32 sm:h-40" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !certificationsData) {
    return (
      <div className="h-full flex items-center justify-center bg-background p-4">
        <div className="container mx-auto h-full overflow-y-auto">
          <div className="max-w-5xl mx-auto py-8 lg:py-12">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                <span className="text-primary">Certifications</span>
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                {error || 'Failed to load certifications data. Please try again later.'}
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
          className="max-w-5xl mx-auto py-8 lg:py-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 lg:mb-12">
            <span className="text-primary">Certifications</span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {certificationsData.certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-4 sm:p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-primary">
                    {cert.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-medium">Issuer:</span> {cert.issuing_organization}
                    </p>
                    
                    {cert.issue_date && (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <span className="font-medium">Issued:</span> {cert.issue_date}
                      </p>
                    )}
                    
                    {cert.expiry_date && (
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        <span className="font-medium">Expires:</span> {cert.expiry_date}
                      </p>
                    )}
                    
                    {cert.credential_id && (
                      <p className="text-xs sm:text-sm text-muted-foreground font-mono">
                        <span className="font-medium">ID:</span> {cert.credential_id}
                      </p>
                    )}
                  </div>
                  
                  {cert.credential_url && (
                    <div className="pt-2">
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-xs sm:text-sm font-medium transition-colors duration-200"
                      >
                        View Certificate →
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 