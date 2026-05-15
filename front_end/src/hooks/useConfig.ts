import { useState, useEffect } from 'react';
import YAML from 'yaml';

interface AppConfig {
  username: string;
  api_base_url?: string; // Deprecated - kept for backward compatibility
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

        // Try to load config from YAML file, but don't fail if it doesn't exist
        // since this app is now client-side only
        try {
          const configResponse = await fetch('/config.yml');

          if (configResponse.ok) {
            const configText = await configResponse.text();
            const parsedConfig = YAML.parse(configText) as ConfigFile;

            const finalConfig: AppConfig = {
              username: parsedConfig.username || 'akhilnadhpc',
              api_base_url: parsedConfig.api_base_url, // Kept for backward compatibility
            };

            // Cache the config for subsequent calls
            configCache = finalConfig;
            setConfig(finalConfig);
          } else {
            // Use default config if file doesn't exist
            const defaultConfig: AppConfig = {
              username: 'akhilnadhpc',
            };
            configCache = defaultConfig;
            setConfig(defaultConfig);
          }
        } catch (configErr) {
          // Config file not found - use defaults (expected for client-side only app)
          const defaultConfig: AppConfig = {
            username: 'akhilnadhpc',
          };
          configCache = defaultConfig;
          setConfig(defaultConfig);
        }
      } catch (err) {
        // Fail gracefully with defaults
        const defaultConfig: AppConfig = {
          username: 'akhilnadhpc',
        };
        configCache = defaultConfig;
        setConfig(defaultConfig);
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
    username: config?.username || 'akhilnadhpc',
  };
}

export default useConfig; 