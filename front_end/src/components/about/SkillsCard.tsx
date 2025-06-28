import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SkillsRadarChart from './SkillsRadarChart';
import StarRating from './StarRating';
import useSkillsData from '@/hooks/useSkillsData';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function SkillsCard() {
  const { skillsData, loading, error } = useSkillsData();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleAllCategories = () => {
    if (expandedCategories.size === 0) {
      // If nothing is expanded, expand all categories
      const allCategoryNames = skillsData?.skills?.reduce((acc: Set<string>, skill: any) => {
        acc.add(skill.category.name);
        return acc;
      }, new Set<string>()) || new Set<string>();
      setExpandedCategories(allCategoryNames);
    } else {
      // If any are expanded, collapse all
      setExpandedCategories(new Set());
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Skills Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  if (error || !skillsData?.skills) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Skills Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Unable to load skills data</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // Group skills by category and calculate average rating per category
  const skillsByCategory = skillsData.skills.reduce((acc, skill) => {
    const categoryName = skill.category.name;
    if (!acc[categoryName]) {
      acc[categoryName] = {
        category: skill.category,
        skills: [],
        totalRating: 0,
        averageRating: 0
      };
    }
    acc[categoryName].skills.push(skill);
    acc[categoryName].totalRating += skill.rating;
    acc[categoryName].averageRating = acc[categoryName].totalRating / acc[categoryName].skills.length;
    return acc;
  }, {} as Record<string, {
    category: any;
    skills: any[];
    totalRating: number;
    averageRating: number;
  }>);

  // Prepare data for radar chart using category average ratings
  const radarChartData = Object.values(skillsByCategory)
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 8) // Show top 8 categories
    .map(categoryData => ({
      name: categoryData.category.name,
      value: Number(categoryData.averageRating.toFixed(1)),
      fullMark: 5
    }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Skills Overview</CardTitle>
          <p className="text-sm text-muted-foreground">
            Average rating by skill category ({skillsData.skills.length} total skills)
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <SkillsRadarChart skills={radarChartData} />
          </div>
          
          {/* Skills breakdown by category */}
          <div className="mt-6 space-y-4">
            <motion.button
              onClick={() => toggleAllCategories()}
              className="group flex items-center justify-between w-full p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-all duration-200 text-left"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: expandedCategories.size > 0 ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground group-hover:text-foreground transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    Category Breakdown
                  </h4>
                  <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-200">
                    Click to {expandedCategories.size > 0 ? 'collapse' : 'expand'} all skill categories
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                  {Object.keys(skillsByCategory).length} categories
                </span>
              </div>
            </motion.button>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.values(skillsByCategory)
                .sort((a, b) => b.averageRating - a.averageRating)
                .map((categoryData, index) => {
                  const isExpanded = expandedCategories.has(categoryData.category.name);
                  const hasAnyExpanded = expandedCategories.size > 0;
                  
                  return (
                    <motion.div
                      key={categoryData.category.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      {/* Category Header - Non-clickable */}
                      <div className="w-full p-3 bg-muted/30 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-foreground text-sm">
                            {categoryData.category.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            {categoryData.skills.length} skills
                          </span>
                          <span className="font-semibold text-primary text-sm">
                            {categoryData.averageRating.toFixed(1)}/5
                          </span>
                        </div>
                      </div>

                      {/* Expandable Skills List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="bg-background/50"
                          >
                            <div className="p-3 space-y-2">
                              {categoryData.skills
                                .sort((a: any, b: any) => b.rating - a.rating)
                                .map((skill: any, skillIndex: number) => (
                                  <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ 
                                      duration: 0.3, 
                                      delay: skillIndex * 0.05 
                                    }}
                                    className="flex items-center justify-between p-2 rounded bg-muted/20 hover:bg-muted/40 transition-colors duration-200"
                                  >
                                    <div className="flex flex-col min-w-0 flex-1">
                                      <span className="font-medium text-xs text-foreground truncate">
                                        {skill.name}
                                      </span>
                                    </div>
                                    <div className="ml-2 flex-shrink-0">
                                      <StarRating 
                                        rating={skill.rating} 
                                        size="sm"
                                        delay={skillIndex * 0.1}
                                      />
                                    </div>
                                  </motion.div>
                                ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 