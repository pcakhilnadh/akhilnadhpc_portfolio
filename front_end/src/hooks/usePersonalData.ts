import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/data';
import { personalProfile, socialProfiles, familyMembers, hobbies } from '@/data';

interface PersonalDataReturn {
  personalData: UserProfile | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function usePersonalData(): PersonalDataReturn {
  const [personalData, setPersonalData] = useState<UserProfile | null>(null);
  const [welcomeText] = useState<string>('Welcome to my portfolio');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform personal profile data into UserProfile format
      const userData: UserProfile = {
        personal_info: {
          full_name: personalProfile.full_name,
          tagline: personalProfile.tagline,
          designation: personalProfile.designation,
          email: personalProfile.email,
          profile_image: personalProfile.profile_image,
          short_summary: personalProfile.short_summary,
          long_descriptive_summary: personalProfile.long_descriptive_summary,
          total_years_of_experience: ((new Date().getTime() - new Date(personalProfile.work_start_date).getTime()) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(1),
          dob: personalProfile.dob,
          place_of_birth: personalProfile.place_of_birth,
          address: `${personalProfile.address_street}, ${personalProfile.address_city}, ${personalProfile.address_state}, ${personalProfile.address_country}`,
          resume_summary: personalProfile.resume_summary,
          phone_num: personalProfile.phone_num,
        },
        social_profiles: socialProfiles.reduce(
          (acc, profile) => {
            acc[profile.platform.toLowerCase().replace(/\s+/g, '_')] = {
              url: profile.profile_url,
              handler: profile.username,
            };
            return acc;
          },
          {} as Record<string, { url: string; handler: string }>
        ),
        professional_profiles: {},
        coding_profiles: {},
        personal_profiles: {},
        family_info: familyMembers.map((member) => ({
          relationship: member.relationship,
          full_name: member.full_name,
          occupation: member.occupation,
          dob: member.dob,
          profile_url: member.profile_url,
        })),
        hobbies: hobbies.map((hobby) => hobby.hobby_name),
      };

      setPersonalData(userData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load personal data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { personalData, welcomeText, loading, error };
}

export default usePersonalData; 