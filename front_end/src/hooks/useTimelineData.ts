import { useState, useEffect } from 'react';
import { TimelineDomainData, TimelineResponse } from '@/types/data';
import useConfig from './useConfig';

function useTimelineData() {
  const [timelineData, setTimelineData] = useState<TimelineDomainData | null>(null);
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

        const apiUrl = `${config.api_base_url}/timeline`;
        console.log(`Requesting: ${apiUrl} for username: ${config.username}`);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: config.username }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: TimelineResponse = await response.json();
        
        setTimelineData(data);
        setWelcomeText(data.welcome_text);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch timeline data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configLoading, configError]);

  return { timelineData, welcomeText, loading: loading || configLoading, error: error || configError };
}

export default useTimelineData; 