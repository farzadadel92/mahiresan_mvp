// components/ThemeToggle.tsx
'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Leaf, SunMedium, Flame, Snowflake, Palette, ChevronDown } from 'lucide-react';

/**
 * Theme icon mapping - each theme gets a distinct Lucide icon
 * for visual recognition in the dropdown menu
 */
const themeIcons: Record<string, React.ReactNode> = {
  light: <Sun className="w-5 h-5" />,
  dark: <Moon className="w-5 h-5" />,
  spring: <Leaf className="w-5 h-5" />,
  summer: <SunMedium className="w-5 h-5" />,
  autumn: <Flame className="w-5 h-5" />,
  winter: <Snowflake className="w-5 h-5" />,
};

/** Persian labels for each theme option in the dropdown */
const themeLabels: Record<string, string> = {
  light: 'روشن',
  dark: 'تاریک',
  spring: 'بهار',
  summer: 'تابستان',
  autumn: 'پاییز',
  winter: 'زمستان',
};

/** Available theme variants */
type Theme = 'light' | 'dark' | 'spring' | 'summer' | 'autumn' | 'winter';

/** All theme options in display order */
const themes: Theme[] = ['light', 'dark', 'spring', 'summer', 'autumn', 'winter'];

/**
 * ThemeToggle - Dropdown component for switching between themes
 * Supports light/dark mode and 4 seasonal themes (spring, summer, autumn, winter)
 * Uses a click-outside pattern to close the dropdown
 */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  /** Set theme and close dropdown */
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  /** Returns the icon matching the currently active theme */
  const getCurrentIcon = () => {
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    return themeIcons[theme] || <Palette className="w-5 h-5" />; // Fallback for unknown themes
  };

  return (
    <div className="relative flex items-center gap-2">
      {/* Dropdown container */}
      <div className="relative">
        {/* Toggle button - shows current theme icon + chevron */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 p-2 rounded-lg bg-surface hover:bg-surface-hover transition-colors"
          aria-label="انتخاب تم"
        >
          {getCurrentIcon()}
          <ChevronDown className={`w-4 h-4 text-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown menu - only rendered when open */}
        {isOpen && (
          <>
            {/* Invisible backdrop to capture outside clicks */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Theme option list */}
            <div className="absolute top-full right-0 mt-2 min-w-40 bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-20">
              {themes.map((key) => (
                <button
                  key={key}
                  onClick={() => handleThemeChange(key)}
                  className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-surface-hover transition-colors ${
                    theme === key ? 'bg-primary/10 text-primary' : 'text-text-primary'
                  }`}
                >
                  <span className="w-5 h-5">{themeIcons[key]}</span>
                  <span className="text-sm">{themeLabels[key]}</span>
                  {/* Checkmark indicator for currently active theme */}
                  {theme === key && (
                    <span className="mr-auto text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}