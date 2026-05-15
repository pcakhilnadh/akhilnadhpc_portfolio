import { useEffect, useState } from 'react';
import { AboutDomainData } from '@/types/data';
import { personalProfile, hobbies, familyMembers, skills, skillCategories, getSkillsByCategory } from '@/data';

interface AboutDataReturn {
  aboutData: AboutDomainData | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function useAboutData(): AboutDataReturn {
  const [aboutData, setAboutData] = useState<AboutDomainData | null>(null);
  const [welcomeText] = useState<string>('Get to know me better');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform skills data organized by category
      const skillsByCategory = skillCategories.reduce(
        (acc, category) => {
          acc[category.name] = getSkillsByCategory(category._id).map((skill) => ({
            id: skill._id,
            name: skill.name,
            rating: skill.rating,
            description: skill.description,
            category: {
              id: category._id,
              name: category.name,
              description: category.description,
            },
          }));
          return acc;
        },
        {} as Record<string, any[]>
      );

      const aboutDataObj: AboutDomainData = {
        personal_info: {
          full_name: personalProfile.full_name,
          tagline: personalProfile.tagline,
          designation: personalProfile.designation,
          email: personalProfile.email,
          profile_image: personalProfile.profile_image,
          short_summary: personalProfile.short_summary,
          long_descriptive_summary: personalProfile.long_descriptive_summary,
          dob: personalProfile.dob,
          place_of_birth: personalProfile.place_of_birth,
          address: `${personalProfile.address_street}, ${personalProfile.address_city}, ${personalProfile.address_state}, ${personalProfile.address_country}`,
          total_years_of_experience: ((new Date().getTime() - new Date(personalProfile.work_start_date).getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1),
          phone_num: personalProfile.phone_num,
        },
        hobbies: hobbies.map((hobby) => hobby.hobby_name),
        family_info: familyMembers.map((member) => ({
          relationship: member.relationship,
          full_name: member.full_name,
          occupation: member.occupation,
          dob: member.dob,
          profile_url: member.profile_url,
        })),
        skills_by_category: skillsByCategory,
      };

      setAboutData(aboutDataObj);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load about data');
    } finally {
      setLoading(false);
    }
  }, [welcomeText]);

  return { aboutData, welcomeText, loading, error };
}

export default useAboutData; 