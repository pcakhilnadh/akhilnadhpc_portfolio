import { useState, useEffect } from 'react';
import { ResumeData, ResumeResponse } from '@/types/resume';
import useConfig from './useConfig';

function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { config, loading: configLoading, error: configError } = useConfig();

  useEffect(() => {
    if (configLoading || !config) {
      return;
    }
    
    if (configError) {
      setError(configError);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${config.api_base_url}/resume`;

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: ResumeResponse = await response.json();
        
        if (data.success && data.resume_data) {
          setResumeData(data.resume_data);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch resume data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configLoading, configError]);

  return { resumeData, loading: loading || configLoading, error: error || configError };
}

export default useResumeData; 