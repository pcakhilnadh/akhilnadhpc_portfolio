import React from 'react';
import { Button } from '@/components/ui/button';
import { PageMeta } from '@/components/common';
import { motion } from 'framer-motion';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServerErrorProps {
  error?: string | null;
  fullScreen?: boolean;
}

export default function ServerError({ error, fullScreen = true }: ServerErrorProps) {
  return (
    <>
      <PageMeta
        title="500 - Application Error | Akhil Nadh PC"
        description="An unexpected error occurred while loading the application."
      />
      <div className={cn(
        "flex flex-col items-center justify-center w-full px-4 text-center bg-background text-foreground",
        fullScreen ? "min-h-screen" : "min-h-[80vh]"
      )}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center max-w-md"
        >
          <div className="relative mb-6">
            <h1 className="text-8xl md:text-9xl font-bold text-destructive/10 select-none">500</h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertTriangle className="h-16 w-16 text-destructive" />
            </div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
            Something went wrong
          </h2>
          
          <p className="text-muted-foreground mb-4 text-sm md:text-base">
            We encountered an unexpected error while trying to load the application.
          </p>
          
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm px-4 py-2 rounded-md mb-8 max-w-full overflow-hidden text-ellipsis whitespace-nowrap border border-destructive/20">
              {error}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <Button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <RefreshCcw className="h-4 w-4" />
              Retry Connection
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}
