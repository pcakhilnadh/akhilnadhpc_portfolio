import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  Users, 
  Code, 
  Building2, 
  Clock, 
  Filter,
  Search,
  Calendar,
  X,
  ChevronDown,
  Zap,
  SlidersHorizontal,
  Play
} from 'lucide-react';
import { Project } from '@/types/data';
import { Badge } from '@/components/ui/badge';
import useConfig from '@/hooks/useConfig';

interface ProjectListProps {
  projects: Project[];
}

interface Filters {
  company: string;
  project_type: string;
  status: string;
  year: string;
  search: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [filters, setFilters] = useState<Filters>({
    company: '',
    project_type: '',
    status: '',
    year: '',
    search: ''
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Extract unique companies, project types, statuses, and years
  const filterOptions = useMemo(() => {
    const companies = new Set<string>();
    const projectTypes = new Set<string>();
    const statuses = new Set<string>();
    const years = new Set<string>();

    projects.forEach(project => {
      // Companies
      companies.add(project.company?.name || 'Personal');
      
      // Project Types
      if (project.project_type) {
        projectTypes.add(project.project_type);
      }

      // Statuses
      if (project.status) {
        statuses.add(project.status);
      }

      // Years - extract year from start_date
      if (project.start_date) {
        const year = project.start_date.split('-')[0] || project.start_date.split('/')[2] || project.start_date.substring(0, 4);
        if (year && year.length === 4) {
          years.add(year);
        }
      }
    });

    return {
      companies: Array.from(companies).sort(),
      projectTypes: Array.from(projectTypes).sort(),
      statuses: Array.from(statuses).sort(),
      years: Array.from(years).sort().reverse() // Newest years first
    };
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // Company filter
      if (filters.company) {
        const projectCompany = project.company?.name || 'Personal';
        if (projectCompany !== filters.company) return false;
      }

      // Project Type filter
      if (filters.project_type) {
        if (project.project_type !== filters.project_type) return false;
      }

      // Status filter
      if (filters.status) {
        if (project.status !== filters.status) return false;
      }

      // Year filter
      if (filters.year) {
        const projectYear = project.start_date?.split('-')[0] || 
                           project.start_date?.split('/')[2] || 
                           project.start_date?.substring(0, 4);
        if (projectYear !== filters.year) return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          project.title,
          project.short_description,
          project.role,
          project.company?.name,
          ...(project.skills?.map(s => s.name) || [])
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchTerm)) return false;
      }

      return true;
    });

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      const dateA = new Date(a.start_date || '1970-01-01');
      const dateB = new Date(b.start_date || '1970-01-01');
      return dateB.getTime() - dateA.getTime();
    });

    return filtered;
  }, [projects, filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ company: '', project_type: '', status: '', year: '', search: '' });
    setShowAdvancedFilters(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const hasAdvancedFilters = filters.company || filters.project_type || filters.status || filters.year;

  return (
    <div className="w-full space-y-6">
      {/* Integrated Search & Filter Bar - Sticky */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-10 relative"
      >
        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-primary/8 rounded-lg blur-lg" />
        
        {/* Main Search Bar */}
        <div className="relative bg-card/95 border border-primary/30 rounded-lg" style={{ backdropFilter: 'blur(8px)' }}>
          <div className="flex items-center p-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-primary" />
              <input
                type="text"
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-lg focus:placeholder-primary/60 transition-colors"
              />
              {filters.search && (
                <div className="absolute inset-0 bg-primary/5 rounded-md pointer-events-none" />
              )}
            </div>
                  
            {/* Filter Toggle & Results */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <span className="text-sm font-medium">{filteredProjects.length} projects</span>
              </div>
              
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  showAdvancedFilters || hasAdvancedFilters
                    ? 'bg-primary/20 text-primary border border-primary/50 shadow-lg shadow-primary/20'
                    : 'text-muted-foreground hover:text-primary hover:bg-primary/10 border border-transparent hover:border-primary/30'
                }`}
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                {hasAdvancedFilters && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-destructive transition-colors group"
                >
                  <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                  <span className="text-sm">Clear</span>
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-primary/20"
              >
                <div className="p-4 bg-primary/3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Company Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                        <select
                          value={filters.company}
                          onChange={(e) => handleFilterChange('company', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          style={{ 
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        >
                          <option value="">All Companies</option>
                          {filterOptions.companies.map(company => (
                            <option key={company} value={company}>{company}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                      </div>
                    </div>
                    
                    {/* Project Type Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                        <select
                          value={filters.project_type}
                          onChange={(e) => handleFilterChange('project_type', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          style={{ 
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        >
                          <option value="">All Project Types</option>
                          {filterOptions.projectTypes.map(projectType => (
                            <option key={projectType} value={projectType}>{projectType.toUpperCase()}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
                      </div>
                    </div>

                    {/* Status Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-accent-indigo/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Play className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-indigo" />
                        <select
                          value={filters.status}
                          onChange={(e) => handleFilterChange('status', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-accent-indigo focus:outline-none focus:ring-2 focus:ring-accent-indigo/20"
                          style={{ 
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        >
                          <option value="">All Statuses</option>
                          {filterOptions.statuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-accent-indigo pointer-events-none" />
                      </div>
                    </div>
            
                    {/* Year Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-highlight/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-highlight" />
                        <select
                          value={filters.year}
                          onChange={(e) => handleFilterChange('year', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-highlight focus:outline-none focus:ring-2 focus:ring-highlight/20"
                          style={{ 
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        >
                          <option value="">All Years</option>
                          {filterOptions.years.map(year => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-highlight pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Projects Content */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-16"
          >
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 bg-primary/8 rounded-lg blur-lg" />
              <div className="relative bg-card/95 border border-primary/30 rounded-lg p-8" style={{ backdropFilter: 'blur(8px)' }}>
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-foreground text-lg mb-2 font-medium">No projects found</p>
                <p className="text-muted-foreground text-sm mb-4">
                  Try adjusting your search terms or filters
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-primary/20 border border-primary/40 text-primary px-4 py-2 rounded hover:bg-primary/30 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Simplified Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const { config } = useConfig();
  const navigate = useNavigate();

  // Format dates for better display - compact format with day
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: '2-digit' 
    });
  };

  // Handle project card click to navigate to project details
  const handleProjectClick = () => {
    if (!project.id) {
      return;
    }
    
    navigate(`/projects/${project.id}`);
  };

  const startDate = formatDate(project.start_date || '');
  const endDate = formatDate(project.end_date || '');

  // Check if project is currently in progress
  const isOngoing = project.status?.toLowerCase().includes('in progress') || 
                    project.status?.toLowerCase().includes('ongoing');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative h-full"
    >

      
      {/* Main Card Container */}
      <div 
        className={`relative h-full border-2 rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${
          isOngoing 
            ? 'bg-transparent border-primary/60 glossy-card glossy-in-progress'
            : 'bg-transparent border-gray-300 dark:border-gray-700 glossy-card'
        }`}
        onClick={handleProjectClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(30, 201, 107, 0.15)'; // Much more subtle green
          e.currentTarget.style.borderColor = 'var(--color-primary)';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
          // Temporarily disable glossy animation during hover for in-progress projects
          if (isOngoing) {
            e.currentTarget.style.animation = 'none';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.borderColor = isOngoing ? 'var(--color-primary)' : '';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
          // Re-enable glossy animation for in-progress projects
          if (isOngoing) {
            e.currentTarget.style.animation = '';
          }
        }}
      >
        


        {/* Card Content */}
        <div className="relative p-6 h-full flex flex-col">
          
          {/* Header Section */}
          <div className="mb-6 relative z-10">
            
            {/* Project Title */}
            <h3 className="text-xl font-bold mb-4 leading-tight group-hover:enhanced-text-primary transition-all duration-300">
              <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:via-highlight group-hover:to-primary transition-all duration-500">
                {project.title}
              </span>
            </h3>
            
            {/* Company & Role Row */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center group/company">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary/20 to-accent-indigo/20 border border-secondary/40 flex items-center justify-center mr-3 group-hover/company:shadow-lg group-hover/company:shadow-secondary/20 transition-all duration-300">
                  <Building2 className="h-4 w-4 text-secondary group-hover/company:text-accent-indigo transition-colors duration-300" />
                </div>
                <span className="text-sm font-semibold text-secondary group-hover:text-accent-indigo transition-colors duration-300">
                  {project.company?.name || 'Personal'}
                </span>
              </div>
              
              {project.role && (
                <div className="flex items-center group/role">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary/20 to-highlight/20 border border-primary/40 flex items-center justify-center mr-2 group-hover/role:shadow-md group-hover/role:shadow-primary/20 transition-all duration-300">
                    <Users className="h-3 w-3 text-primary group-hover/role:text-highlight transition-colors duration-300" />
                  </div>
                  <span className="text-sm font-medium text-primary/90 group-hover:text-highlight transition-colors duration-300">
                    {project.role}
                  </span>
                </div>
              )}
            </div>
            
            {/* Compact 3-Column Layout: Status, Project Type, Duration */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* Status */}
              {project.status && (
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-full px-2 py-1 rounded-md border transition-all duration-300 shadow-sm backdrop-blur-sm ${
                    project.status.toLowerCase().includes('in progress') || project.status.toLowerCase().includes('ongoing')
                      ? 'bg-secondary/40 text-secondary border-secondary/60 hover:bg-secondary/50'
                      : project.status.toLowerCase().includes('completed')
                      ? 'bg-primary/40 text-primary border-primary/60 hover:bg-primary/50'
                      : project.status.toLowerCase().includes('paused')
                      ? 'bg-accent-indigo/40 text-accent-indigo border-accent-indigo/60 hover:bg-accent-indigo/50'
                      : 'bg-muted/40 text-muted-foreground border-muted/60 hover:bg-muted/50'
                  }`}>
                    {project.status.toLowerCase().includes('in progress') || project.status.toLowerCase().includes('ongoing') && (
                      <div className="w-1.5 h-1.5 bg-current rounded-full mr-1" />
                    )}
                    <span className="text-xs font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>
              )}

              {/* Project Type */}
              {project.project_type && (
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-full px-2 py-1 rounded-md border transition-all duration-300 shadow-sm backdrop-blur-sm ${
                    project.project_type === 'production'
                      ? 'bg-accent-indigo/40 text-accent-indigo border-accent-indigo/60 hover:bg-accent-indigo/50'
                      : project.project_type === 'development'
                      ? 'bg-secondary/40 text-secondary border-secondary/60 hover:bg-secondary/50'
                      : project.project_type === 'poc'
                      ? 'bg-highlight/40 text-highlight border-highlight/60 hover:bg-highlight/50'
                      : project.project_type === 'mvp'
                      ? 'bg-soft/40 text-soft border-soft/60 hover:bg-soft/50'
                      : 'bg-primary/40 text-primary border-primary/60 hover:bg-primary/50'
                  }`}>
                    <span className="text-xs font-semibold">
                      {project.project_type.toUpperCase()}
                    </span>
                  </div>
                </div>
              )}

              {/* Duration */}
              {project.duration && (
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-full px-2 py-1 bg-muted/40 border border-muted/60 rounded-md hover:bg-muted/50 transition-all duration-300 backdrop-blur-sm">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    <span className="text-xs font-semibold text-muted-foreground">
                      {project.duration}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 flex-1 relative z-10">
            <p className="text-muted-foreground/90 text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
              {project.short_description}
            </p>
          </div>

          {/* Enhanced Tech Stack */}
          {project.skills && project.skills.length > 0 && (
            <div className="mt-auto relative z-10">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary/30 to-secondary/30 border border-primary/50 flex items-center justify-center group-hover:shadow-md group-hover:shadow-primary/20 transition-all duration-300">
                  <Code className="h-3 w-3 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Tech Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.skills.slice(0, 4).map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: skillIndex * 0.05 }}
                    className="group/skill"
                  >
                    <Badge className="text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-muted/20 via-soft/10 to-muted/20 text-muted-foreground border border-muted/40 hover:from-primary/20 hover:via-secondary/10 hover:to-accent-indigo/20 hover:text-primary hover:border-primary/50 transition-all duration-300 hover:shadow-md hover:shadow-primary/10 hover:scale-105">
                      <span className="relative">
                        {skill.name}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent -skew-x-12 transform scale-x-0 group-hover/skill:scale-x-100 transition-transform duration-300" />
                      </span>
                    </Badge>
                  </motion.div>
                ))}
                {project.skills.length > 4 && (
                  <Badge className="text-xs font-semibold px-3 py-1.5 bg-gradient-to-r from-secondary/20 to-accent-indigo/20 text-secondary border border-secondary/40 shadow-md hover:shadow-lg hover:shadow-secondary/20 hover:scale-105 transition-all duration-300">
                    <span className="flex items-center space-x-1">
                      <span>+{project.skills.length - 4}</span>
                      <span className="text-accent-indigo">more</span>
                    </span>
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>


      </div>
    </motion.div>
  );
};

export default ProjectList; 