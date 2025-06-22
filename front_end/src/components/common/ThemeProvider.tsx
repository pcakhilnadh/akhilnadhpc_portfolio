import * as React from 'react';
import { ThemeProviderContext, getThemeProviderProps, type ThemeProviderProps } from '@/hooks/useTheme';

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const { value, children: childrenFromProps } = getThemeProviderProps(
    children,
    defaultTheme,
    storageKey
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
} 