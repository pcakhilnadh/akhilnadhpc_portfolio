import { useState, useEffect } from 'react';
import { UserProfile, HomeResponse } from '@/types/data';
import useConfig from './useConfig';

function usePersonalData() {
  const [personalData, setPersonalData] = useState<UserProfile | null>(null);
  const [welcomeText, setWelcomeText] = useState<string>('');
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

        const apiUrl = `${config.api_base_url}/`;

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
        
        const data: HomeResponse = await response.json();
        
        if (data.success && data.personal_data) {
          setPersonalData(data.personal_data);
          setWelcomeText(data.page_welcome_texts);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch personal data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configLoading, configError]);

  return { personalData, welcomeText, loading: loading || configLoading, error: error || configError };
}

export default usePersonalData; 