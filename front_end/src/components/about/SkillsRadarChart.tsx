import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

interface Skill {
  name: string;
  value: number;
  fullMark: number;
}

interface SkillsRadarChartProps {
  skills: Skill[];
}

export default function SkillsRadarChart({ skills }: SkillsRadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skills}>
        <PolarGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" />
        <PolarAngleAxis 
          dataKey="name" 
          tick={{ 
            fontSize: 11, 
            fill: 'hsl(var(--foreground))',
            fontWeight: 500
          }} 
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 5]} 
          tick={{ 
            fill: 'hsl(var(--muted-foreground))',
            fontSize: 10
          }} 
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip 
          formatter={(value: number) => [`${value.toFixed(1)}/5`, 'Skill Level']}
          contentStyle={{
            backgroundColor: 'hsl(var(--background))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '0.5rem',
            color: 'hsl(var(--foreground))',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
          labelStyle={{
            color: 'hsl(var(--foreground))',
            fontWeight: 600
          }}
          itemStyle={{
            color: 'hsl(var(--primary))'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
} 