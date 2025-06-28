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
        <PolarGrid strokeDasharray="3 3" stroke="color-mix(in srgb, var(--color-text) 60%, transparent)" />
        <PolarAngleAxis 
          dataKey="name" 
          tick={{ 
            fontSize: 11, 
            fill: 'var(--color-text)',
            fontWeight: 500
          }} 
        />
        <PolarRadiusAxis 
          angle={30} 
          domain={[0, 5]} 
          tick={{ 
            fill: 'color-mix(in srgb, var(--color-text) 60%, transparent)',
            fontSize: 10
          }} 
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="var(--color-primary)"
          fill="var(--color-primary)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Tooltip 
          formatter={(value: number) => [`${value.toFixed(1)}/5`, 'Skill Level']}
          contentStyle={{
            backgroundColor: 'var(--color-bg)',
            border: '1px solid color-mix(in srgb, var(--color-text) 20%, transparent)',
            borderRadius: '0.5rem',
            color: 'var(--color-text)',
            boxShadow: '0 4px 6px -1px color-mix(in srgb, var(--color-text) 10%, transparent)'
          }}
          labelStyle={{
            color: 'var(--color-text)',
            fontWeight: 600
          }}
          itemStyle={{
            color: 'var(--color-primary)'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
} 