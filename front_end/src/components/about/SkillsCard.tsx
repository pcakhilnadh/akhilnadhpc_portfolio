import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import SkillsRadarChart from './SkillsRadarChart';
import useSkillsData from '@/hooks/useSkillsData';

export default function SkillsCard() {
  const { skillsData, loading, error } = useSkillsData();

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
            <h4 className="font-semibold text-sm text-foreground">Category Breakdown:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {Object.values(skillsByCategory)
                .sort((a, b) => b.averageRating - a.averageRating)
                .map((categoryData, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span className="font-medium text-foreground">
                      {categoryData.category.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {categoryData.skills.length} skills
                      </span>
                      <span className="font-semibold text-primary">
                        {categoryData.averageRating.toFixed(1)}/5
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 