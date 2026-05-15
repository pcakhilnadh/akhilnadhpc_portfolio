import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/common';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  setNavbarWelcomeText?: (text: string) => void;
}

export default function NotFound({ setNavbarWelcomeText }: NotFoundProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (setNavbarWelcomeText) {
      setNavbarWelcomeText('404_not_found');
    }
  }, [setNavbarWelcomeText]);

  return (
    <>
      <PageMeta
        title="404 - Page Not Found | Akhil Nadh PC"
        description="The page you are looking for does not exist."
      />
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-md"
        >
          <div className="relative mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">404</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold text-foreground">Oops!</span>
            </div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground mb-8 text-sm md:text-base">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full sm:w-auto hover:bg-foreground hover:text-background transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            <Button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
