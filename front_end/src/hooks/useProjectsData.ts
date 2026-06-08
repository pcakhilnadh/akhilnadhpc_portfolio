import { useEffect, useState } from 'react';
import { ProjectsDomainData, Project as ProjectType } from '@/types/data';
import { projects, getWorkExperienceById } from '@/data';

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
      const transformedProjects: ProjectType[] = projects.map((project) => {
        const company = getWorkExperienceById(project.company || '');

        const skillObjects = (project.skills || []).map((name) => ({
          id: name,
          name,
          rating: 5,
          description: '',
          category: { id: '', name: '', description: '' },
        }));

        return {
          id: project._id,
          title: project.title,
          short_description: project.short_description,
          project_type: project.project_type,
          status: project.status,
          github_url: project.github_url,
          live_url: project.live_url,
          notion_url: undefined,
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
          hosting_platform: project.deployment?.hosting_platform,
          cicd_pipeline: project.deployment?.ci_cd_tools?.join(', '),
          monitoring_tracking: project.operations?.monitoring?.join(', '),
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
