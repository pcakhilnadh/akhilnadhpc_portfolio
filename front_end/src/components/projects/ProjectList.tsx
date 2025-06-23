import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, MapPin, Users, Code, Terminal, Zap, Eye } from 'lucide-react';
import { Project } from '@/types/data';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import ProjectModal from './ProjectModal';

interface ProjectListProps {
  projects: Project[];
}

interface ProjectCategory {
  id: string;
  name: string;
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group projects by category
  const projectCategories = useMemo(() => {
    const categories: ProjectCategory[] = [];
    const categoryMap = new Map<string, Project[]>();

    // Add "All Projects" category
    categories.push({
      id: 'all',
      name: 'All Projects',
      projects: projects
    });

    // Group by company name
    projects.forEach(project => {
      const companyName = project.company?.name || 'Personal';
      if (!categoryMap.has(companyName)) {
        categoryMap.set(companyName, []);
      }
      categoryMap.get(companyName)!.push(project);
    });

    // Add company categories
    categoryMap.forEach((companyProjects, companyName) => {
      categories.push({
        id: companyName.toLowerCase().replace(/\s+/g, '-'),
        name: companyName,
        projects: companyProjects
      });
    });

    return categories;
  }, [projects]);

  const activeCategory = projectCategories.find(cat => cat.id === activeTab) || projectCategories[0];

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="w-full">
      {/* Hacker-themed header */}
      

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Hacker-themed tabs */}
        <TabsList className="flex flex-wrap w-full mb-8 gap-3 justify-center bg-transparent p-0">
          {projectCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-sm font-mono font-bold flex-shrink-0 bg-transparent border-2 border-green-500/50 text-green-400 hover:bg-green-500/20 hover:text-green-300 hover:border-green-400 data-[state=active]:bg-green-500/30 data-[state=active]:text-green-200 data-[state=active]:border-green-400 data-[state=active]:shadow-lg data-[state=active]:shadow-green-500/25 transition-all duration-300 rounded-full px-6 py-3"
            >
              <Code className="h-3 w-3 mr-2" />
              {category.name} [{category.projects.length}]
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Simplified Hacker-themed project card */}
                <div className="relative bg-black/40 border border-green-500/30 rounded-lg p-6 hover:border-green-400/60 hover:bg-black/60 transition-all duration-300 backdrop-blur-sm h-full">
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  
                  {/* Project header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-mono font-bold text-green-400 group-hover:text-green-300 transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <div className="flex space-x-2">
                        <button className="p-2 bg-green-500/20 border border-green-500/30 rounded hover:bg-green-500/30 hover:border-green-400 transition-all duration-300">
                          <Eye className="h-4 w-4 text-green-400" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Project description */}
                    <p className="text-muted-foreground leading-relaxed font-mono text-sm line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Quick project info */}
                  <div className="space-y-2 mb-4">
                    {project.company && (
                      <div className="flex items-center text-sm text-green-300 font-mono">
                        <MapPin className="h-3 w-3 mr-2 text-green-400" />
                        <span className="truncate">{project.company.name}</span>
                      </div>
                    )}
                    
                    {project.role && (
                      <div className="flex items-center text-sm text-cyan-300 font-mono">
                        <Users className="h-3 w-3 mr-2 text-cyan-400" />
                        <span className="truncate">{project.role}</span>
                      </div>
                    )}
                  </div>

                  {/* Skills preview */}
                  {project.skills && project.skills.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center mb-2">
                        <Zap className="h-3 w-3 mr-2 text-yellow-400" />
                        <span className="text-xs font-mono text-yellow-300">TECH</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.slice(0, 3).map((skill) => (
                          <Badge
                            key={skill.id}
                            className="bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-xs px-2 py-0.5"
                          >
                            {skill.name}
                          </Badge>
                        ))}
                        {project.skills.length > 3 && (
                          <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono text-xs px-2 py-0.5">
                            +{project.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Quick links */}
                  <div className="flex space-x-2 mt-auto">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-green-500/20 border border-green-500/30 rounded hover:bg-green-500/30 hover:border-green-400 transition-all duration-300"
                      >
                        <Github className="h-3 w-3 text-green-400" />
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded hover:bg-cyan-500/30 hover:border-cyan-400 transition-all duration-300"
                      >
                        <ExternalLink className="h-3 w-3 text-cyan-400" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectList; 