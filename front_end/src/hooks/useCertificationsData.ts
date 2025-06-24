import { useState, useEffect } from 'react';
import { CertificationsDomainData, CertificationsResponse } from '@/types/data';
import useConfig from './useConfig';

function useCertificationsData() {
  const [certificationsData, setCertificationsData] = useState<CertificationsDomainData | null>(null);
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

        const response = await fetch(`${config.api_base_url}/certifications`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: config.username }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: CertificationsResponse = await response.json();
        
        setCertificationsData(data);
        setWelcomeText(data.welcome_text);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch certifications data');
        console.error('Error fetching certifications data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [config, configLoading, configError]);

  return { certificationsData, welcomeText, loading: loading || configLoading, error: error || configError };
}

export default useCertificationsData; 