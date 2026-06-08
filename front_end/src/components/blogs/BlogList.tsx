import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  ChevronDown,
  SlidersHorizontal,
  Calendar,
  User,
  Tag,
  Clock,
  Filter,
  ArrowRight
} from 'lucide-react';
import { BlogPost, BlogTag } from '@/types/data';

interface BlogListProps {
  blogs: BlogPost[];
}

interface Filters {
  tag: string;
  search: string;
  year: string;
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  const [filters, setFilters] = useState<Filters>({
    tag: '',
    search: '',
    year: ''
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const navigate = useNavigate();

  // Extract unique tags and years
  const filterOptions = useMemo(() => {
    const tags = new Set<string>();
    const years = new Set<string>();

    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag));
      const year = blog.created_date.split('-')[0];
      if (year) years.add(year);
    });

    return {
      tags: Array.from(tags).sort(),
      years: Array.from(years).sort().reverse()
    };
  }, [blogs]);

  // Filter and sort blogs
  const filteredBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      // Tag filter
      if (filters.tag) {
        if (!blog.tags.includes(filters.tag as BlogTag)) return false;
      }

      // Year filter
      if (filters.year) {
        const blogYear = blog.created_date.split('-')[0];
        if (blogYear !== filters.year) return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          blog.title,
          blog.excerpt,
          blog.content,
          blog.author,
          ...blog.tags
        ].join(' ').toLowerCase();
        
        if (!searchFields.includes(searchTerm)) return false;
      }

      return true;
    });

    // Sort by date (newest first)
    filtered.sort((a, b) => {
      return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
    });

    return filtered;
  }, [blogs, filters]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ tag: '', search: '', year: '' });
    setShowAdvancedFilters(false);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');
  const hasAdvancedFilters = filters.tag || filters.year;

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: BlogTag): string => {
    const colors = {
      'Tech': 'bg-blue-900/30 text-blue-300 border-blue-700/50',
      'Personal': 'bg-purple-900/30 text-purple-300 border-purple-700/50',
      'InterviewEx': 'bg-green-900/30 text-green-300 border-green-700/50'
    };
    return colors[tag] || 'bg-muted text-muted-foreground border-border';
  };

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
                placeholder="Search blogs by title, content, or author..."
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
                <span className="text-sm font-medium">{filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}</span>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tag Filter */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative">
                        <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                        <select
                          value={filters.tag}
                          onChange={(e) => handleFilterChange('tag', e.target.value)}
                          className="w-full pl-10 pr-8 py-3 bg-card border border-primary/30 rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          style={{ 
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none'
                          }}
                        >
                          <option value="">All Tags</option>
                          {filterOptions.tags.map(tag => (
                            <option key={tag} value={tag}>{tag}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
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

      {/* Blogs Content */}
      <AnimatePresence mode="wait">
        {filteredBlogs.length === 0 ? (
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
                <p className="text-foreground text-lg mb-2 font-medium">No blogs found</p>
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
            className="space-y-4"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => navigate(`/blogs/${blog.id}`)}
                className="group bg-muted/30 border border-border/50 rounded-lg p-6 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300 cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Title and Meta */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
                      {blog.title}
                    </h3>
                    
                    {/* Author, Date, Read Time */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(blog.created_date)}</span>
                      </div>
                      {blog.read_time && (
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{blog.read_time} min read</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Excerpt */}
                  {blog.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {blog.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {blog.tags.map(tag => (
                      <span
                        key={tag}
                        className={`px-2.5 py-1 rounded-md border text-xs font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <div className="pt-2">
                    <span className="text-xs font-medium text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogList;
