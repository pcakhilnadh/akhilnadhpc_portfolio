import { useEffect, useState } from 'react';
import { SkillsDomainData, Skill as SkillType, SkillCategory as SkillCategoryType } from '@/types/data';
import { skills, skillCategories, getSkillCategory } from '@/data';

interface SkillsDataReturn {
  skillsData: SkillsDomainData | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function useSkillsData(): SkillsDataReturn {
  const [skillsData, setSkillsData] = useState<SkillsDomainData | null>(null);
  const [welcomeText] = useState<string>('Explore my technical skills and expertise');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform skills data into SkillsDomainData format
      const transformedSkills: SkillType[] = skills.map((skill) => {
        const category = getSkillCategory(skill.skill_category_id);
        return {
          id: skill._id,
          name: skill.name,
          rating: skill.rating,
          description: skill.description,
          category: category
            ? {
                id: category._id,
                name: category.name,
                description: category.description,
              }
            : {
                id: 'unknown',
                name: 'Unknown',
                description: '',
              },
        };
      });

      setSkillsData({
        skills: transformedSkills,
        welcome_text: welcomeText,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load skills data');
    } finally {
      setLoading(false);
    }
  }, [welcomeText]);

  return { skillsData, welcomeText, loading, error };
}

export default useSkillsData; 