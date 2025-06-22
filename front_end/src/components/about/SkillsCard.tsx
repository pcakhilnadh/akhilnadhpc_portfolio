import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SkillsRadarChart from './SkillsRadarChart';

interface Skill {
  name: string;
  rating: number;
  category: string;
  description?: string;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}

interface SkillsCardProps {
  skills: SkillCategory[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  // Prepare data for radar chart (top 8 skills by rating)
  const radarChartData = skills
    .flatMap(category => category.skills)
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