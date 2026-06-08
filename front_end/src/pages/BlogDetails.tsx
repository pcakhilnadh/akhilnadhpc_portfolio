import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { BlogPost } from '@/types/data';
import { blogs } from '@/data/blogs';
import { PageHeader, CommonBg } from '@/components/common';
import { PageMeta } from '@/components/common';
import { Badge } from '@/components/ui/badge';

interface BlogDetailsProps {
  setNavbarWelcomeText: (text: string) => void;
}

const getTagColor = (tag: string): string => {
  const colors = {
    'Tech': 'bg-blue-900/30 text-blue-300 border-blue-700/50',
    'Personal': 'bg-purple-900/30 text-purple-300 border-purple-700/50',
    'InterviewEx': 'bg-green-900/30 text-green-300 border-green-700/50'
  };
  return colors[tag as keyof typeof colors] || 'bg-muted text-muted-foreground border-border';
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function BlogDetails({ setNavbarWelcomeText }: BlogDetailsProps) {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();

  const blog = blogs.find(b => b.id === blogId);

  useEffect(() => {
    setNavbarWelcomeText('Reading blog post');
  }, [setNavbarWelcomeText]);

  if (!blog) {
    return (
      <>
        <PageMeta
          title="Blog Not Found - Akhil Nadh PC"
          description="The blog post you're looking for could not be found."
          keywords="blog, not found, 404, Akhil Nadh PC"
        />
        <div className="h-full bg-background relative">
          <CommonBg />
          <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10 flex items-center justify-center">
            <div className="text-center py-20">
              <PageHeader 
                title="Blog Not Found"
                description="The blog post you're looking for could not be found."
                showUnderline={false}
              />
              <motion.button 
                onClick={() => navigate('/blogs')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-6 py-3 rounded-lg hover:bg-primary/30 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Blogs
              </motion.button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={`${blog.title} - Akhil Nadh PC`}
        description={blog.excerpt || blog.content.substring(0, 150)}
        keywords={`${blog.tags.join(', ')}, ${blog.title}, Akhil Nadh PC`}
      />
      <div className="h-full bg-background relative">
        <CommonBg />
        <div className="container mx-auto px-4 h-full overflow-y-auto relative z-10">
          <div className="max-w-4xl mx-auto py-8">
            
            {/* Back Button */}
            <motion.button
              onClick={() => navigate('/blogs')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="text-sm">Back to Blogs</span>
            </motion.button>

            {/* Blog Header */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b border-border/50 pb-6">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span className="font-medium text-foreground">{blog.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(blog.created_date)}</span>
                </div>
                {blog.read_time && (
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{blog.read_time} min read</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {blog.tags.map(tag => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 ${getTagColor(tag)}`}
                  >
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Blog Content */}
              <div className="mt-12 space-y-6">
                <div 
                  className="blog-content prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  style={{
                    color: 'hsl(var(--foreground))',
                  }}
                >
                </div>
              </div>

              {/* Bottom Navigation */}
              <div className="border-t border-border/50 pt-8 mt-12">
                <motion.button
                  onClick={() => navigate('/blogs')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-primary/20 border border-primary/40 text-primary px-6 py-3 rounded-lg hover:bg-primary/30 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Blogs
                </motion.button>
              </div>
            </motion.article>

            {/* Bottom padding */}
            <div className="h-8" />
          </div>
        </div>
      </div>

      {/* Styling for HTML content */}
      <style>{`
        .blog-content h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 1.5em 0 0.5em 0;
          color: hsl(var(--foreground));
        }

        .blog-content h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 1.3em 0 0.4em 0;
          color: hsl(var(--foreground));
        }

        .blog-content h3 {
          font-size: 1.2em;
          font-weight: bold;
          margin: 1em 0 0.3em 0;
          color: hsl(var(--foreground));
        }

        .blog-content p {
          margin: 1em 0;
          line-height: 1.8;
          color: hsl(var(--foreground) / 0.95);
        }

        .blog-content strong {
          font-weight: bold;
          color: hsl(var(--primary));
        }

        .blog-content em {
          font-style: italic;
          color: hsl(var(--foreground) / 0.9);
        }

        .blog-content ul {
          list-style-type: disc;
          margin: 1em 0;
          padding-left: 2em;
          color: hsl(var(--foreground) / 0.9);
        }

        .blog-content ol {
          list-style-type: decimal;
          margin: 1em 0;
          padding-left: 2em;
          color: hsl(var(--foreground) / 0.9);
        }

        .blog-content li {
          margin: 0.5em 0;
          line-height: 1.6;
        }

        .blog-content blockquote {
          border-left: 4px solid hsl(var(--primary));
          padding-left: 1.5em;
          margin: 1.5em 0;
          font-style: italic;
          color: hsl(var(--primary) / 0.9);
          background: hsl(var(--primary) / 0.05);
          padding: 1em 1.5em;
          border-radius: 0.5em;
        }

        .blog-content pre {
          background: hsl(var(--muted));
          border: 1px solid hsl(var(--border));
          border-radius: 0.5em;
          padding: 1em;
          overflow-x: auto;
          margin: 1.5em 0;
        }

        .blog-content code {
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 0.9em;
          background: hsl(var(--muted) / 0.5);
          padding: 0.2em 0.4em;
          border-radius: 0.3em;
          color: hsl(var(--primary));
        }

        .blog-content pre code {
          background: none;
          padding: 0;
          border-radius: 0;
          color: hsl(var(--foreground));
        }

        .blog-content a {
          color: hsl(var(--primary));
          text-decoration: underline;
          transition: color 0.2s;
        }

        .blog-content a:hover {
          color: hsl(var(--primary) / 0.8);
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5em;
          margin: 1.5em 0;
        }

        .blog-content hr {
          border: none;
          border-top: 1px solid hsl(var(--border));
          margin: 2em 0;
        }
      `}</style>
    </>
  );
}
