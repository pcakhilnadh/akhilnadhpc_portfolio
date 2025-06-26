import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Github, 
  Users, 
  Code, 
  Building2, 
  Clock, 
  Trophy, 
  Brain, 
  Globe, 
  Filter,
  Search,
  Calendar,
  X,
  ChevronDown,
  ChevronUp,
  Zap,
  SlidersHorizontal
} from 'lucide-react';
import { Project } from '@/types/data';
import { Badge } from '@/components/ui/badge';

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
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());
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
          project.description,
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

  const toggleRowExpansion = (projectId: number) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
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
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 rounded-lg blur-lg" />
        
        {/* Main Search Bar */}
        <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-green-500/30 rounded-lg backdrop-blur-sm">
          <div className="flex items-center p-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-emerald-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-transparent text-green-50 placeholder-green-400/60 focus:outline-none text-lg focus:placeholder-green-300/40 transition-colors"
              />
              {filters.search && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-md pointer-events-none" />
                  )}
            </div>
                  
            {/* Filter Toggle & Results */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-300/80">
                <span className="text-sm font-medium">{filteredProjects.length} projects</span>
              </div>
              
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-300 ${
                  showAdvancedFilters || hasAdvancedFilters
                    ? 'bg-green-500/20 text-green-300 border border-green-500/50 shadow-lg shadow-green-500/20'
                    : 'text-green-400/70 hover:text-green-300 hover:bg-green-500/10 border border-transparent hover:border-green-500/30'
                      }`}
                    >
                <SlidersHorizontal className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                {hasAdvancedFilters && (
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                )}
              </button>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-green-400/70 hover:text-red-400 transition-colors group"
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
                className="overflow-hidden border-t border-green-500/20"
              >
                <div className="p-4 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Company Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400" />
                        <select
                          value={filters.company}
                          onChange={(e) => handleFilterChange('company', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-gray-900/60 border border-green-500/30 rounded-md text-green-100 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 appearance-none backdrop-blur-sm"
                  >
                          <option value="">All Companies</option>
                          {filterOptions.companies.map(company => (
                            <option key={company} value={company}>{company}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    {/* Technology Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400" />
                        <select
                          value={filters.technology}
                          onChange={(e) => handleFilterChange('technology', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-gray-900/60 border border-green-500/30 rounded-md text-green-100 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 appearance-none backdrop-blur-sm"
                        >
                          <option value="">All Technologies</option>
                          {filterOptions.technologies.map(tech => (
                            <option key={tech} value={tech}>{tech}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-400 pointer-events-none" />
              </div>
            </div>
            
                    {/* Year Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-lime-500/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400" />
                        <select
                          value={filters.year}
                          onChange={(e) => handleFilterChange('year', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-gray-900/60 border border-green-500/30 rounded-md text-green-100 focus:border-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-500/20 appearance-none backdrop-blur-sm"
                        >
                          <option value="">All Years</option>
                          {filterOptions.years.map(year => (
                            <option key={year} value={year}>{year}</option>
                ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-lime-400 pointer-events-none" />
            </div>
          </div>
        </div>

                  {/* Active Filters */}
                  {hasAdvancedFilters && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {filters.company && (
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/40">
                          Company: {filters.company}
                        </Badge>
                      )}
                      {filters.technology && (
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                          Tech: {filters.technology}
                        </Badge>
                      )}
                      {filters.year && (
                        <Badge className="bg-lime-500/20 text-lime-300 border-lime-500/40">
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
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg blur-lg" />
              <div className="relative bg-gray-900/70 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-green-100 text-lg mb-2 font-medium">No projects found</p>
                <p className="text-green-400/70 text-sm mb-4">
                  Try adjusting your search terms or filters
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="bg-green-500/20 border border-green-500/40 text-green-300 px-4 py-2 rounded hover:bg-green-500/30 transition-colors"
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
          className="space-y-4"
        >
            {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
                isExpanded={expandedRows.has(project.id)}
                onToggleExpand={() => toggleRowExpansion(project.id)}
            />
          ))}
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Enhanced Project Card Component
interface ProjectCardProps {
  project: Project;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, isExpanded, onToggleExpand }) => {
  const projectYear = project.start_date?.split('-')[0] || project.start_date?.split('/')[2] || project.start_date?.substring(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative"
    >
      {/* Enhanced glow effect */}
      <div className={`absolute inset-0 rounded-lg transition-all duration-500 ${
        isExpanded 
          ? 'bg-gradient-to-r from-green-500/20 via-emerald-500/10 to-green-500/20 blur-lg' 
          : 'bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 blur-lg opacity-0 group-hover:opacity-100'
      }`} />
      
      {/* Main Card */}
      <div className={`relative border rounded-lg backdrop-blur-sm transition-all duration-300 ${
        isExpanded 
          ? 'border-green-500/60 bg-gray-900/30 shadow-2xl shadow-green-500/20' 
          : 'border-green-500/20 bg-transparent hover:border-green-500/40 hover:bg-gray-900/20'
      }`}>
        
        {/* Card Header */}
        <div 
          className="p-6 cursor-pointer"
          onClick={onToggleExpand}
        >
          {/* Top Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              {/* Title and Year */}
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-green-100 line-clamp-1">
                {project.title}
              </h3>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="text-green-300 text-sm font-medium">{projectYear || '—'}</span>
                </div>
              </div>
              
              {/* Company and Role */}
              <div className="flex items-center space-x-6 mb-3">
                <div className="flex items-center text-green-200">
                  <Building2 className="h-4 w-4 mr-2 text-green-400" />
                  <span>{project.company?.name || 'Personal'}</span>
                  </div>
                {project.role && (
                  <div className="flex items-center text-emerald-200">
                    <Users className="h-4 w-4 mr-2 text-emerald-400" />
                    <span>{project.role}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center text-lime-200">
                    <Clock className="h-4 w-4 mr-2 text-lime-400" />
                    <span className="text-sm">{project.duration}</span>
                  </div>
                )}
              </div>
                </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2 ml-4">
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  className="p-2 text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded transition-all duration-200 border border-transparent hover:border-green-500/30"
                  >
                  <Github className="h-4 w-4" />
                  </a>
                )}
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  className="p-2 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/20 rounded transition-all duration-200 border border-transparent hover:border-emerald-500/30"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand();
                }}
                className="p-2 text-lime-400 hover:text-lime-300 hover:bg-lime-500/20 rounded transition-all duration-200 border border-transparent hover:border-lime-500/30"
                  >
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Description */}
          <p className="text-green-100/80 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.skills && project.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.skills.slice(0, isExpanded ? project.skills.length : 6).map((skill, skillIndex) => (
            <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: skillIndex * 0.02 }}
            >
                  <Badge className="bg-green-500/20 text-green-300 border-green-500/40 text-xs hover:bg-green-500/30 transition-colors">
                    {skill.name}
                  </Badge>
            </motion.div>
              ))}
              {!isExpanded && project.skills.length > 6 && (
                <Badge className="bg-emerald-500/30 text-emerald-200 border-emerald-400/50 text-xs animate-pulse">
                  +{project.skills.length - 6} more
                </Badge>
              )}
          </div>
          )}
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="border-t border-green-500/30 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5">
                <ProjectExpandedContent project={project} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Completely Redesigned Expanded Content Component
const ProjectExpandedContent: React.FC<{ project: Project }> = ({ project }) => {
  const [isAiModelExpanded, setIsAiModelExpanded] = useState(false);

  return (
    <div className="p-6 space-y-6">
                
      {/* Project Overview Card - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-sm" />
        <div className="relative bg-gray-900/60 border border-green-500/30 rounded-xl p-5 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <Code className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-100">Project Overview</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Timeline */}
            <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-400" />
                <span className="text-green-300 font-medium text-sm">Timeline</span>
              </div>
              <div className="space-y-2 pl-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-200/70">Started</span>
                  <span className="text-green-100 font-mono">{project.start_date}</span>
                </div>
                {project.end_date && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-200/70">Completed</span>
                    <span className="text-green-100 font-mono">{project.end_date}</span>
                    </div>
                )}
                      {project.duration && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-200/70">Duration</span>
                    <span className="text-emerald-300 font-medium">{project.duration}</span>
                  </div>
                      )}
                    </div>
                  </div>

                  {/* Infrastructure */}
                  {(project.hosting_platform || project.cicd_pipeline) && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium text-sm">Infrastructure</span>
                </div>
                <div className="space-y-2 pl-6">
                        {project.hosting_platform && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-200/70">Hosting</span>
                      <span className="text-green-100">{project.hosting_platform}</span>
                    </div>
                        )}
                        {project.cicd_pipeline && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-green-200/70">CI/CD</span>
                      <span className="text-green-100">{project.cicd_pipeline}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Key Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-lime-400" />
                  <span className="text-lime-300 font-medium text-sm">Key Achievements</span>
                </div>
                <div className="pl-6 space-y-1">
                  {project.achievements.slice(0, 3).map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="flex items-start space-x-2"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 bg-lime-400 rounded-full" />
                      </div>
                      <span className="text-lime-200 text-xs">
                        {achievement.achievement_title}
                      </span>
                    </motion.div>
                  ))}
                  {project.achievements.length > 3 && (
                    <div className="text-lime-300/60 text-xs pl-4">
                      +{project.achievements.length - 3} more below
                    </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

          {/* Technology Stack */}
          {project.skills && project.skills.length > 0 && (
            <div className="mt-5 pt-4 border-t border-green-500/20">
                    <div className="flex items-center space-x-2 mb-3">
                <Code className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-300 font-medium text-sm">Technology Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                {project.skills.map((skill, index) => (
                  <motion.div
                          key={skill.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.02 }}
                    className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-2 py-1 rounded text-xs font-medium hover:bg-cyan-500/30 transition-colors"
                        >
                          {skill.name}
                  </motion.div>
                      ))}
                    </div>
                  </div>
                )}
        </div>
      </motion.div>


             {/* ML Model Card - Collapsible */}
       {!project.company && project.ml_models && (
         <motion.div
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.3 }}
           className="relative"
         >
           <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl blur-sm" />
           <div className="relative bg-gray-900/60 border border-teal-500/30 rounded-xl backdrop-blur-sm">
             
             {/* Clickable Header */}
             <div 
               className="p-5 cursor-pointer hover:bg-teal-500/5 transition-colors rounded-t-xl"
               onClick={() => setIsAiModelExpanded(!isAiModelExpanded)}
             >
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-3">
                   <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center">
                     <Brain className="h-4 w-4 text-white" />
                   </div>
                   <h3 className="text-lg font-semibold text-teal-100">AI Model Details</h3>
                 </div>
                 <motion.div
                   animate={{ rotate: isAiModelExpanded ? 180 : 0 }}
                   transition={{ duration: 0.2 }}
                   className="text-teal-400 hover:text-teal-300"
                 >
                   <ChevronDown className="h-5 w-5" />
                 </motion.div>
               </div>
             </div>

             {/* Expandable Content */}
             <AnimatePresence>
               {isAiModelExpanded && (
                 <motion.div
                   initial={{ height: 0, opacity: 0 }}
                   animate={{ height: 'auto', opacity: 1 }}
                   exit={{ height: 0, opacity: 0 }}
                   transition={{ duration: 0.3 }}
                   className="overflow-hidden"
                 >
                   <div className="px-5 pb-5 border-t border-teal-500/20">
                     {/* Overview Subheading */}
                     <h4 className="text-teal-300 font-medium text-sm mb-4 mt-4 flex items-center">
                       <Code className="h-3 w-3 mr-2" />
                       Overview
                     </h4>

                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                       {/* Model Info */}
                       <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-3">
                         <div className="space-y-2 text-sm">
                  <div>
                             <span className="text-teal-200/70 block">Model</span>
                             <span className="text-teal-100 font-medium">{project.ml_models.name}</span>
                    </div>
                           <div>
                             <span className="text-teal-200/70 block">Type</span>
                             <span className="text-teal-100 font-medium">{project.ml_models.model_type}</span>
                          </div>
                           <div>
                             <span className="text-teal-200/70 block">Framework</span>
                             <span className="text-teal-100 font-medium">{project.ml_models.framework}</span>
                        </div>
                    </div>
                  </div>

                       {/* Performance */}
                       <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-3">
                         <div className="space-y-2">
                  <div>
                             <div className="flex items-center justify-between mb-2">
                               <span className="text-teal-200/70 text-sm">Accuracy</span>
                               <span className="text-green-300 font-bold text-lg">{(project.ml_models.accuracy * 100).toFixed(1)}%</span>
                             </div>
                             <div className="w-full bg-gray-700 rounded-full h-2">
                               <motion.div
                                 initial={{ width: 0 }}
                                 animate={{ width: `${project.ml_models.accuracy * 100}%` }}
                                 transition={{ delay: 0.5, duration: 1 }}
                                 className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full"
                               />
                             </div>
                           </div>
                           <div className="text-sm">
                             <span className="text-teal-200/70 block">Status</span>
                             <span className="text-teal-100 font-medium">{project.ml_models.deployment_status}</span>
                           </div>
                         </div>
                    </div>
                    
                       {/* Data */}
                       <div className="bg-teal-500/5 border border-teal-500/20 rounded-lg p-3">
                         <div className="text-sm">
                           <span className="text-teal-200/70 block">Training Data Size</span>
                           <span className="text-teal-100 font-medium">{project.ml_models.training_data_size}</span>
                      </div>
                      </div>
                    </div>

                    {/* Use Cases */}
                    {project.ml_models.use_cases && project.ml_models.use_cases.length > 0 && (
                       <div>
                         <h4 className="text-teal-300 font-medium text-sm mb-3 flex items-center">
                           <Globe className="h-3 w-3 mr-2" />
                           Use Cases
                         </h4>
                        <div className="space-y-2">
                           {project.ml_models.use_cases.map((useCase, index) => (
                             <motion.div
                               key={useCase.id}
                               initial={{ opacity: 0, x: -10 }}
                               animate={{ opacity: 1, x: 0 }}
                               transition={{ delay: 0.4 + index * 0.05 }}
                               className="flex items-start space-x-3 py-2"
                             >
                               <div className="flex-shrink-0 mt-1">
                                 <div className="w-2 h-2 bg-teal-400 rounded-full" />
                               </div>
                               <div className="flex-1 min-w-0">
                                 <span className="text-teal-200 font-medium text-sm block mb-1">
                                {useCase.use_case_name}
                                 </span>
                                 <p className="text-teal-100/70 text-xs line-clamp-2">
                                {useCase.business_impact}
                                 </p>
                              </div>
                             </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
       )}
    </div>
  );
};

export default ProjectList; 