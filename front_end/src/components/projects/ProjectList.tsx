import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  technology: string;
  year: string;
  search: string;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [filters, setFilters] = useState<Filters>({
    company: '',
    technology: '',
    year: '',
    search: ''
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Extract unique companies, technologies, and years
  const filterOptions = useMemo(() => {
    const companies = new Set<string>();
    const technologies = new Set<string>();
    const years = new Set<string>();

    projects.forEach(project => {
      // Companies
      companies.add(project.company?.name || 'Personal');
      
      // Technologies
      project.skills?.forEach(skill => technologies.add(skill.name));

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
      technologies: Array.from(technologies).sort(),
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

      // Technology filter
      if (filters.technology) {
        const hasSkill = project.skills?.some(skill => skill.name === filters.technology);
        if (!hasSkill) return false;
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
    setFilters({ company: '', technology: '', year: '', search: '' });
    setShowAdvancedFilters(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const hasAdvancedFilters = filters.company || filters.technology || filters.year;

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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    
                    {/* Technology Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary" />
                        <select
                          value={filters.technology}
                          onChange={(e) => handleFilterChange('technology', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                          style={{ 
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        >
                          <option value="">All Technologies</option>
                          {filterOptions.technologies.map(tech => (
                            <option key={tech} value={tech}>{tech}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary pointer-events-none" />
                      </div>
                    </div>
            
                    {/* Year Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-secondary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-foreground" />
                        <select
                          value={filters.year}
                          onChange={(e) => handleFilterChange('year', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
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
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-secondary-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {hasAdvancedFilters && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {filters.company && (
                        <Badge className="bg-primary/20 text-primary border-primary/40">
                          Company: {filters.company}
                        </Badge>
                      )}
                      {filters.technology && (
                        <Badge className="bg-secondary/20 text-secondary border-secondary/40">
                          Tech: {filters.technology}
                        </Badge>
                      )}
                      {filters.year && (
                        <Badge className="bg-secondary/20 text-secondary-foreground border-secondary/40">
                          Year: {filters.year}
                        </Badge>
                      )}
                    </div>
                  )}
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

  // Handle project card click to fetch project details
  const handleProjectClick = async () => {
    if (!config) {
      console.log('Config not loaded yet');
      return;
    }

    try {
      console.log(`🚀 Making API request to: POST ${config.api_base_url}/projects/${project.id}`);
      console.log(`📝 Request payload:`, { username: config.username });
      
      const response = await fetch(`${config.api_base_url}/projects/${project.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: config.username }),
      });
      
      console.log(`📡 API Response Status: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ Project details for "${project.title}":`, data);
      
    } catch (err) {
      console.error(`❌ Error fetching project details for "${project.title}":`, err);
    }
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
              <span className="text-xs text-muted-foreground/70 group-hover:text-primary/80 transition-all duration-300 ml-2">
                (click for details)
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
            
            {/* Status & Duration Row */}
            <div className="flex items-center justify-between mb-4">
                             {/* Status Badge */}
               {project.status && (
                 <Badge className={`text-xs font-bold px-3 py-1.5 border-2 transition-all duration-300 shadow-md ${
                   project.status.toLowerCase().includes('in progress') || project.status.toLowerCase().includes('ongoing')
                     ? 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/20'
                     : project.status.toLowerCase().includes('completed')
                     ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20'
                     : project.status.toLowerCase().includes('paused')
                     ? 'bg-accent-indigo text-white dark:text-accent-indigo-foreground border-accent-indigo hover:bg-accent-indigo/90 hover:shadow-lg hover:shadow-accent-indigo/20'
                     : 'bg-muted text-muted-foreground border-muted hover:bg-muted/80'
                 }`}>
                                     {project.status.toLowerCase().includes('in progress') || project.status.toLowerCase().includes('ongoing') ? (
                     <>
                       <div className="w-2 h-2 bg-secondary-foreground rounded-full mr-2" />
                       {project.status}
                     </>
                   ) : (
                     project.status
                   )}
                </Badge>
              )}

              {/* Duration */}
              {project.duration && (
                <div className="flex items-center group/duration">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-muted/20 to-soft/20 border border-muted/40 flex items-center justify-center mr-2 group-hover/duration:shadow-sm transition-all duration-300">
                    <Clock className="h-3 w-3 text-muted-foreground group-hover/duration:text-soft transition-colors duration-300" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground group-hover:text-soft transition-colors duration-300">
                    {project.duration}
                  </span>
                </div>
              )}
            </div>
            
                         {/* Enhanced Timeline */}
             <div className="flex items-center justify-center space-x-3 py-2">
               {/* Start Date */}
               <div className="flex items-center space-x-2">
                 <div className="w-4 h-4 rounded-full bg-secondary/20 border border-secondary/40 flex items-center justify-center group-hover:bg-secondary/30 group-hover:border-secondary/60 transition-all duration-300 flex-shrink-0">
                   <svg className="w-2 h-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                   </svg>
                 </div>
                 <span className="text-xs font-mono font-medium text-muted-foreground group-hover:text-secondary transition-colors duration-300 whitespace-nowrap">
                   {startDate}
                 </span>
               </div>
               
               {/* Flow Arrow */}
               <div className="flex items-center space-x-1 flex-shrink-0">
                 <div className="w-5 h-0.5 bg-gradient-to-r from-secondary/40 to-primary/40 rounded-full" />
                 <svg className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                   <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                 </svg>
                 <div className="w-5 h-0.5 bg-gradient-to-r from-primary/40 to-highlight/40 rounded-full" />
               </div>
               
               {/* End Date */}
               <div className="flex items-center space-x-2">
                 <span className="text-xs font-mono font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300 whitespace-nowrap">
                   {endDate || 'Present'}
                 </span>
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                   endDate 
                     ? 'bg-primary/20 border-primary/40 group-hover:bg-primary/30 group-hover:border-primary/60' 
                     : 'bg-highlight/20 border-highlight/40 group-hover:bg-highlight/30 group-hover:border-highlight/60'
                 }`}>
                   {endDate ? (
                     <svg className="w-2 h-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                     </svg>
                   ) : (
                     <svg className="w-2 h-2 text-highlight" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                     </svg>
                   )}
                 </div>
               </div>
             </div>
          </div>

          {/* Description */}
          <div className="mb-6 flex-1 relative z-10">
            <p className="text-muted-foreground/90 text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300">
              {project.short_description}
            </p>
          </div>

          {/* Project Type Badge */}
          {project.project_type && (
            <div className="mb-6 relative z-10">
                             <Badge className={`font-bold text-xs px-4 py-2 border-2 shadow-lg transition-all duration-300 hover:scale-105 ${
                 project.project_type === 'production'
                   ? 'bg-accent-indigo text-accent-indigo-foreground border-accent-indigo hover:bg-accent-indigo/90 hover:shadow-accent-indigo/20'
                   : project.project_type === 'development'
                   ? 'bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90 hover:shadow-secondary/20'
                   : project.project_type === 'poc'
                   ? 'bg-highlight text-background border-highlight hover:bg-highlight/90 hover:shadow-highlight/20'
                   : project.project_type === 'mvp'
                   ? 'bg-soft text-foreground border-soft hover:bg-soft/90 hover:shadow-soft/20'
                   : 'bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:shadow-primary/20'
               }`}>
                <span className="relative">
                  {project.project_type.toUpperCase()}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </span>
              </Badge>
            </div>
          )}

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