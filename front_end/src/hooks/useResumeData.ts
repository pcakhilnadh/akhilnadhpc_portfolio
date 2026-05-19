import { useEffect, useState } from 'react';
import { ResumeData, ResumeResponse } from '@/types/resume';
import {
  personalProfile,
  education,
  workExperience,
  projects,
  skills,
  certifications,
} from '@/data';

interface ResumeDataReturn {
  resumeData: ResumeData | null;
  loading: boolean;
  error: string | null;
}

function useResumeData(): ResumeDataReturn {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform education data
      const educationData = education.map((edu) => ({
        degree: edu.degree,
        institution: edu.institution,
        field_of_study: edu.field_of_study,
        start_date: edu.start_date,
        end_date: edu.end_date,
        gpa: edu.gpa || undefined,
        institution_url: edu.institution_url || undefined,
      }));

      // Transform work experience data
      const experienceData = workExperience.map((exp) => ({
        company_name: exp.company_name,
        company_location: exp.company_location,
        designation: exp.designation,
        start_date: exp.start_date,
        end_date: exp.end_date || '',
        company_url: exp.company_url || undefined,
      }));

      // Transform projects data
      const projectsData = projects.map((proj) => {
        return {
          title: proj.title,
          short_description: proj.short_description,
          long_description: proj.long_description || '',
          project_type: proj.project_type,
          status: proj.status,
          start_date: proj.start_date,
          end_date: proj.end_date || undefined,
          role: proj.role,
          company: proj.company || undefined,
          github_url: proj.github_url || undefined,
          live_url: proj.live_url || undefined,
          hosting_platform: proj.deployment?.hosting_platform || undefined,
          cicd_pipeline: proj.deployment?.ci_cd_tools?.join(', ') || undefined,
          monitoring_tracking: proj.operations?.monitoring?.join(', ') || undefined,
          skills: proj.skills || [],
        };
      });

      // Transform skills data
      const skillsData = skills.map((skill) => ({
        name: skill.name,
        rating: skill.rating,
        description: skill.description,
        category: skill.skill_category_id,
      }));

      // Transform certifications data
      const certificationsData = certifications.map((cert) => ({
        name: cert.name,
        issuing_organization: cert.issuer,
        issue_date: cert.issue_date,
        expiry_date: cert.expiry_date || undefined,
        credential_id: cert.credential_id || undefined,
        credential_url: cert.credential_url || undefined,
      }));

      // Calculate total years of experience
      const startDate = new Date(personalProfile.work_start_date);
      const today = new Date();
      const yearsExp = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);

      const resumeDataObj: ResumeData = {
        personal_info: {
          full_name: personalProfile.full_name,
          email: personalProfile.email,
          designation: personalProfile.designation,
          tagline: personalProfile.tagline,
          short_summary: personalProfile.short_summary,
          long_descriptive_summary: personalProfile.long_descriptive_summary,
          resume_summary: personalProfile.resume_summary,
          phone_num: personalProfile.phone_num,
          address: `${personalProfile.address_street}, ${personalProfile.address_city}, ${personalProfile.address_state}, ${personalProfile.address_country}`,
          dob: personalProfile.dob,
          place_of_birth: personalProfile.place_of_birth,
          work_start_date: personalProfile.work_start_date,
          total_years_of_experience: parseFloat(yearsExp.toFixed(1)),
        },
        education: educationData,
        work_experience: experienceData,
        projects: projectsData,
        skills: skillsData,
        certifications: certificationsData,
      };

      setResumeData(resumeDataObj);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resume data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { resumeData, loading, error };
}

export default useResumeData; 