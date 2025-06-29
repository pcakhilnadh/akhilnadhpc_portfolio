import { useState, useEffect } from 'react';
import useConfig from './useConfig';

export interface Service {
  id: number;
  title: string;
  description: string;
  category: 'AI/ML' | 'Development' | 'Consulting';
  email: string;
  icon_name: string;
  gradient: string;
  features: string[];
}

export interface ServicesData {
  services: Service[];
  categories: string[];
  total_services: number;
}

export function useServicesData() {
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { apiUrl, username } = useConfig();

  useEffect(() => {
    if (!apiUrl || !username) return; // Wait for config to be loaded

    const fetchServicesData = async () => {
      try {
        setLoading(true);
        setError(null);

        const fullApiUrl = `${apiUrl}/services`;
        console.log(`Requesting: ${fullApiUrl} for username: ${username}`);

        const response = await fetch(fullApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const servicesData: ServicesData = await response.json();
        setData(servicesData);
      } catch (err) {
        console.error('Error fetching services data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch services data');
      } finally {
        setLoading(false);
      }
    };

    fetchServicesData();
  }, [apiUrl, username]);

  return { data, loading, error };
} 