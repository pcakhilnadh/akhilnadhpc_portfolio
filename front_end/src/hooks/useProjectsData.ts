import { useEffect, useState } from 'react';
import { ProjectsDomainData, Project as ProjectType } from '@/types/data';
import { projects, projectSkills, getSkillById, getWorkExperienceById } from '@/data';

interface ProjectsDataReturn {
  projectsData: ProjectsDomainData | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function useProjectsData(): ProjectsDataReturn {
  const [projectsData, setProjectsData] = useState<ProjectsDomainData | null>(null);
  const [welcomeText] = useState<string>('Browse my portfolio projects');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Transform projects data into ProjectsDomainData format
      const transformedProjects: ProjectType[] = projects.map((project) => {
        const projectSkillIds = projectSkills
          .filter((ps) => ps.project_id === project._id)
          .map((ps) => ps.skill_id);

        const skillObjects = projectSkillIds
          .map((skillId) => getSkillById(skillId))
          .filter((skill) => skill !== undefined) as any[];

        const company = getWorkExperienceById(project.company);

        return {
          id: project._id,
          title: project.title,
          short_description: project.short_description,
          project_type: project.project_type,
          status: project.status,
          github_url: project.github_url,
          live_url: project.live_url,
          notion_url: project.notion_url,
          start_date: project.start_date,
          end_date: project.end_date,
          role: project.role,
          company: company
            ? {
                name: company.company_name,
                location: company.company_location,
              }
            : undefined,
          skills: skillObjects,
          hosting_platform: project.hosting_platform,
          cicd_pipeline: project.cicd_pipeline,
          monitoring_tracking: project.monitoring_tracking,
        };
      });

      setProjectsData({
        projects: transformedProjects,
        welcome_text: welcomeText,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects data');
    } finally {
      setLoading(false);
    }
  }, [welcomeText]);

  return { projectsData, welcomeText, loading, error };
}

export default useProjectsData; 