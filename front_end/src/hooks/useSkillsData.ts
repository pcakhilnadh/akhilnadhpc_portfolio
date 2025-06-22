import { useState, useEffect } from 'react';
import { SkillsDomainData } from '@/types/data';
import YAML from 'yaml';

const API_BASE_URL = 'http://localhost:8000';

function useSkillsData() {
  const [skillsData, setSkillsData] = useState<SkillsDomainData | null>(null);
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

        const response = await fetch(`${API_BASE_URL}/skills`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: SkillsDomainData = await response.json();
        
        setSkillsData(data);
        setWelcomeText(data.welcome_text);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch skills data');
        console.error('Error fetching skills data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { skillsData, welcomeText, loading, error };
}

export default useSkillsData; 