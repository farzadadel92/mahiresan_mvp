// src/contexts/ThemeContext.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';

/** Supported theme variants */
export type Theme = 'light' | 'dark' | 'spring' | 'summer' | 'autumn' | 'winter';

/** Context shape exposed to consumers */
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;      // Toggles only between light/dark (ignores seasonal themes)
  setTheme: (theme: Theme) => void; // Directly set any theme (including seasonal)
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider - Manages theme state and persistence
 * 
 * Features:
 * - Reads saved theme from localStorage on mount
 * - Falls back to system preference (prefers-color-scheme)
 * - Toggles between light/dark only (seasonal themes set via setTheme)
 * - Applies theme as data-theme attribute on <html> for CSS targeting
 * - Prevents hydration mismatch with mounted state guard
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  /** Initialize theme from localStorage or system preference on mount */
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Priority: saved preference > system preference > light
    let initial: Theme = saved || (systemPrefersDark ? 'dark' : 'light');
    
    // Validate saved theme is one of the allowed values (prevents corrupted localStorage)
    const validThemes: Theme[] = ['light', 'dark', 'spring', 'summer', 'autumn', 'winter'];
    if (saved && !validThemes.includes(saved)) {
      initial = systemPrefersDark ? 'dark' : 'light';
    }
    
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  /** Cycle between light and dark only (seasonal themes unaffected by toggle) */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  /** Set any theme directly (light, dark, or seasonal) and persist it */
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Render children without context until mounted to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * Must be used within a ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}