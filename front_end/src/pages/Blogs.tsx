import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useBlogsData from '@/hooks/useBlogsData';
import { BlogList } from '@/components/blogs';
import { PageHeader, CommonBg } from '@/components/common';
import { PageMeta } from '@/components/common';

interface BlogsProps {
  setNavbarWelcomeText: (text: string) => void;
}

export default function Blogs({ setNavbarWelcomeText }: BlogsProps) {
  const { blogsData, welcomeText, loading, error } = useBlogsData();

  // Update navbar welcome text when blogs data loads
  useEffect(() => {
    if (welcomeText) {
      setNavbarWelcomeText(welcomeText);
    }
  }, [welcomeText, setNavbarWelcomeText]);

  return (
    <>
      <PageMeta
        title="Blog Posts - Akhil Nadh PC | Machine Learning & AI Insights"
        description="Read insightful blog posts on machine learning, artificial intelligence, data science, and career development by Akhil Nadh PC, Lead Data Scientist at Air India."
        keywords="machine learning blog, AI blog, data science articles, machine learning tutorials, ML interview tips, Akhil Nadh PC"
      />
      <div className="h-full bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-6xl mx-auto py-8">
          
          {/* Page Header */}
          <PageHeader 
            title="Blogs"
          />

          {/* Content */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-primary text-lg">Loading blogs...</p>
            </div>
          ) : error || !blogsData ? (
            <div className="text-center py-20">
              <PageHeader 
                title="Error Loading Blogs"
                description={error || 'Failed to load blogs data. Please try again later.'}
                showUnderline={false}
              />
              <motion.button 
                onClick={() => window.location.reload()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-destructive/20 border border-destructive/40 text-destructive px-6 py-3 rounded-lg hover:bg-destructive/30 transition-colors mt-6"
              >
                Retry
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <BlogList blogs={blogsData.blogs} />
            </motion.div>
          )}
          
            {/* Add some bottom padding to ensure last item is fully visible */}
            <div className="h-8" />
          </div>
        </div>
      </div>
    </>
  );
}
