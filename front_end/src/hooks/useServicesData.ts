import { useEffect, useState } from 'react';
import { services, getAllCategories } from '@/data';

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

interface ServicesDataReturn {
  data: ServicesData | null;
  loading: boolean;
  error: string | null;
}

export function useServicesData(): ServicesDataReturn {
  const [data, setData] = useState<ServicesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const categories = getAllCategories();
      
      const servicesData: ServicesData = {
        services: services as Service[],
        categories,
        total_services: services.length,
      };

      setData(servicesData);
      setError(null);
    } catch (err) {
      console.error('Error loading services data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load services data');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
} 