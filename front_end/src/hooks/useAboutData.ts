import { useState, useEffect } from 'react';
import { AboutDomainData, AboutResponse } from '@/types/data';
import useConfig from './useConfig';

function useAboutData() {
  const [aboutData, setAboutData] = useState<AboutDomainData | null>(null);
  const [welcomeText, setWelcomeText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { config, loading: configLoading, error: configError } = useConfig();

  useEffect(() => {
    if (configLoading || !config) return;
    
    if (configError) {
      setError(configError);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${config.api_base_url}/about`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: config.username }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: AboutResponse = await response.json();
        
        setAboutData(data);
        setWelcomeText(data.welcome_text);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch about data');
        console.error('Error fetching about data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configLoading, configError]);

  return { aboutData, welcomeText, loading: loading || configLoading, error: error || configError };
}

export default useAboutData; 