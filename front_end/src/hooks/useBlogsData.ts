import { useEffect, useState } from 'react';
import { BlogsDomainData } from '@/types/data';
import { blogs, blogsWelcomeText } from '@/data/blogs';

interface BlogsDataReturn {
  blogsData: BlogsDomainData | null;
  welcomeText: string;
  loading: boolean;
  error: string | null;
}

function useBlogsData(): BlogsDataReturn {
  const [blogsData, setBlogsData] = useState<BlogsDomainData | null>(null);
  const [welcomeText] = useState<string>(blogsWelcomeText);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulate loading with setTimeout
      const timer = setTimeout(() => {
        setBlogsData({
          blogs: blogs,
          welcome_text: blogsWelcomeText
        });
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs data');
      setLoading(false);
    }
  }, []);

  return {
    blogsData,
    welcomeText,
    loading,
    error
  };
}

export default useBlogsData;
