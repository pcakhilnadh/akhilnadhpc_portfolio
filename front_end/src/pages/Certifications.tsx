import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
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
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12">
            <Skeleton className="h-12 w-48 mx-auto mb-12" />
            <div className="space-y-8">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !certificationsData) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="container mx-auto px-4 h-full overflow-y-auto">
          <div className="max-w-4xl mx-auto py-12">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                <span className="text-primary">Certifications</span> & Achievements
              </h2>
              <p className="text-muted-foreground">
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
          className="max-w-4xl mx-auto py-12"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            <span className="text-primary">Certifications</span> & Achievements
          </h2>
          
          <div className="space-y-8">
            {certificationsData.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass p-8 rounded-lg hover:glow transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold text-primary">{cert.name}</h3>
                      <p className="text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">{cert.issue_date}</span>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Skills covered: {cert.skills.join(', ')}
                </p>
                
                <div className="flex items-center justify-between">
                  {cert.credential_id && (
                    <span className="text-sm font-mono text-primary">ID: {cert.credential_id}</span>
                  )}
                  {cert.credential_url && (
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <span className="text-sm">Verify</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
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