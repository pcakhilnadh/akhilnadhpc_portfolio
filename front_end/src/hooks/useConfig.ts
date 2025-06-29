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
          // Check if we're in development (Vite dev server or local development)
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Check if we're running on Vite dev server (typically 5173) or other dev port
            if (window.location.port && window.location.port !== '8080') {
              // Development: frontend dev server connecting to separate backend
              return 'http://localhost:8080/api';
            } else {
              // Local Docker deployment: nginx serving both frontend and proxying API
              return '/api';
            }
          }
          
          // In production, use relative path (nginx handles proxying)
          return '/api';
        };

        // Dynamically determine config file path
        const getConfigPath = () => {
          // Check if we're in development (Vite dev server) vs. production/Docker
          if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Check port to differentiate Vite dev server from Docker
            if (window.location.port && window.location.port !== '8080') {
              // Development on Vite dev server
              return '/src/config.yml';
            }
          }
          // Production or local Docker deployment
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

  // Return the expected properties for compatibility with other hooks
  return {
    config,
    loading,
    error,
    apiUrl: config?.api_base_url || '',
    username: config?.username || ''
  };
}

export default useConfig; 