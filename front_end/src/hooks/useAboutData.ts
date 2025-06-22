import { useState, useEffect } from 'react';
import { AboutDomainData } from '@/types/data';
import YAML from 'yaml';

const API_BASE_URL = 'http://localhost:8000';

function useAboutData() {
  const [aboutData, setAboutData] = useState<AboutDomainData | null>(null);
  const [welcomeText, setWelcomeText] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch and parse config.yml
        const configResponse = await fetch('/src/config.yml');
        const configText = await configResponse.text();
        const config = YAML.parse(configText);
        const username = config.username;

        const response = await fetch(`${API_BASE_URL}/about`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: AboutDomainData = await response.json();
        
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
  }, []);

  return { aboutData, welcomeText, loading, error };
}

export default useAboutData; 