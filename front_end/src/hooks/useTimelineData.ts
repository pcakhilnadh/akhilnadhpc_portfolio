import { useEffect, useState } from 'react';
import { TimelineDomainData, Experience as ExperienceType } from '@/types/data';
import { workExperience, companyReferences, getReferencesForExperience, education as educationData } from '@/data';
import { Education as DataEducation } from '@/data';

interface TimelineDataReturn {
  timelineData: (TimelineDomainData & { experiences: ExperienceType[]; education: any[] }) | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function useTimelineData(): TimelineDataReturn {
  const [timelineData, setTimelineData] = useState<(TimelineDomainData & { experiences: ExperienceType[]; education: any[] }) | null>(null);
  const [welcomeText] = useState<string>('My professional journey and work experience');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform work experience data into TimelineDomainData format
      const transformedExperience: ExperienceType[] = workExperience.map((exp, index) => {
        const references = getReferencesForExperience(exp._id);

        return {
          id: index + 1,
          title: exp.designation,
          company: exp.company_name,
          company_url: exp.company_url || undefined,
          start_date: exp.start_date,
          end_date: exp.end_date || undefined,
          references: references.map((ref) => ({
            id: ref._id,
            name: ref.reference_name,
            designation: ref.designation,
            email: ref.email || '',
            phone: ref.phone || '',
            linkedin_url: ref.linkedin_url || undefined,
            relationship: ref.relationship,
          })),
        };
      });

      // Transform education data
      const transformedEducation = educationData.map((edu) => ({
        id: edu._id,
        degree: edu.degree,
        institution: edu.institution,
        institution_url: edu.institution_url || undefined,
        field_of_study: edu.field_of_study,
        start_date: edu.start_date,
        end_date: edu.end_date,
        gpa: edu.gpa || undefined,
      }));

      setTimelineData({
        experience: transformedExperience,
        experiences: transformedExperience,
        education: transformedEducation,
        welcome_text: welcomeText,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load timeline data');
    } finally {
      setLoading(false);
    }
  }, [welcomeText]);

  return { timelineData, welcomeText, loading, error };
}

export default useTimelineData;
 