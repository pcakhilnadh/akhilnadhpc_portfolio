import { useState, useEffect } from 'react';
import YAML from 'yaml';

interface AppConfig {
  username: string;
  api_base_url: string;
}

let configCache: AppConfig | null = null;

function useConfig() {
  const [config, setConfig] = useState<AppConfig | null>(configCache);
  const [loading, setLoading] = useState(!configCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (configCache) {
      console.log('Using cached config:', configCache);
      setConfig(configCache);
      setLoading(false);
      return;
    }

    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        const configResponse = await fetch('/static/src/config.yml');
        
        
        if (!configResponse.ok) {
          throw new Error(`Failed to load config: ${configResponse.status}`);
        }
        const configText = await configResponse.text();
         
        
        const parsedConfig = YAML.parse(configText) as AppConfig;
         
        
        // Cache the config for subsequent calls
        configCache = parsedConfig;
        setConfig(parsedConfig);
      } catch (err) {
        console.error('Config loading error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch config');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading, error };
}

export default useConfig; 