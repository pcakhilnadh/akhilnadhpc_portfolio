import { useState, useEffect } from 'react';
import YAML from 'yaml';

interface AppConfig {
  username: string;
  api_base_url: string;
}

interface ConfigFile {
  username: string;
  api_base_url?: string;
}

let configCache: AppConfig | null = null;

function useConfig() {
  const [config, setConfig] = useState<AppConfig | null>(configCache);
  const [loading, setLoading] = useState(!configCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (configCache) {
      setConfig(configCache);
      setLoading(false);
      return;
    }

    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Dynamically determine API base URL
        const getApiBaseUrl = () => {
          // Check if we're in development
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8000/api';
          }
          
          // In production, use the same host as the frontend
          const protocol = window.location.protocol;
          const host = window.location.host;
          return `${protocol}//${host}/api`;
        };

        // Dynamically determine config file path
        const getConfigPath = () => {
          // Check if we're in development
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return '/src/config.yml';
          }
          
          // In production, use the static path
          return '/static/src/config.yml';
        };
        
        const configPath = getConfigPath();
        const configResponse = await fetch(configPath);
        
        if (!configResponse.ok) {
          throw new Error(`Failed to load config: ${configResponse.status}`);
        }
        const configText = await configResponse.text();
         
        const parsedConfig = YAML.parse(configText) as ConfigFile;
        
        // Create final config with dynamic API base URL
        const finalConfig: AppConfig = {
          username: parsedConfig.username,
          api_base_url: getApiBaseUrl()
        };
        
        // Cache the config for subsequent calls
        configCache = finalConfig;
        setConfig(finalConfig);
      } catch (err) {
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