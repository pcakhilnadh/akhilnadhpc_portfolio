import { useState, useEffect } from 'react';
import { PersonalData, HomeResponse } from '@/types/data';
import YAML from 'yaml';

const API_BASE_URL = 'http://localhost:8000';

function usePersonalData() {
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
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
        if (!configResponse.ok) {
          throw new Error(`Failed to load config: ${configResponse.status}`);
        }
        const configText = await configResponse.text();
        const config = YAML.parse(configText);
        const username = config.username;

        const response = await fetch(`${API_BASE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
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
  }, []);

  return { personalData, welcomeText, loading, error };
}

export default usePersonalData; 