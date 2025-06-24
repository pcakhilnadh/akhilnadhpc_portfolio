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
    console.log('usePersonalData effect triggered:', { configLoading, config, configError });
    
    if (configLoading || !config) {
      console.log('Waiting for config to load...');
      return;
    }
    
    if (configError) {
      console.error('Config error:', configError);
      setError(configError);
      setLoading(false);
      return;
    }

    console.log('Making API call with config:', config);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = `${config.api_base_url}/`;
        console.log('API URL:', apiUrl);
        console.log('Username:', config.username);

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
        console.error('Error fetching personal data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configLoading, configError]);

  return { personalData, welcomeText, loading: loading || configLoading, error: error || configError };
}

export default usePersonalData; 