import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillsRadarChart from './SkillsRadarChart';
import { SkillCategory } from '@/types/data';

interface SkillsCardProps {
  skills: SkillCategory[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  // Since our data structure has skills as SkillCategory[], we need to extract skills
  // For now, we'll create a flat list of skills with category information
  const allSkills = skills.map(category => ({
    name: category.name,
    rating: 3.5, // Default rating since we don't have individual skill ratings in this context
    category: category.name,
    description: category.description
  }));

  // Prepare data for radar chart (top 8 skills by rating)
  const radarChartData = allSkills
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)
    .map(skill => ({
      name: skill.name,
      value: skill.rating,
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
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <SkillsRadarChart skills={radarChartData} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 