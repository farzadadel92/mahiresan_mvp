// components/ThemeToggle.tsx
'use client';

import { useTheme } from '../../contexts/ThemeContext';
import { Sun, Moon, Leaf, SunMedium, Flame, Snowflake, Palette } from 'lucide-react';

const themeIcons: Record<string, React.ReactNode> = {
  light: <Sun className="w-5 h-5" />,
  dark: <Moon className="w-5 h-5" />,
  spring: <Leaf className="w-5 h-5" />,
  summer: <SunMedium className="w-5 h-5" />,
  autumn: <Flame className="w-5 h-5" />,
  winter: <Snowflake className="w-5 h-5" />,
};

const themeLabels: Record<string, string> = {
  light: 'روشن',
  dark: 'تاریک',
  spring: 'بهار',
  summer: 'تابستان',
  autumn: 'پاییز',
  winter: 'زمستان',
};

export default function ThemeToggle() {
  const { theme, toggleTheme, setTheme } = useTheme();

  // For the light/dark quick toggle button
  const handleQuickToggle = () => {
    toggleTheme(); // only switches between light and dark
  };

  const handleSeasonalChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = e.target.value as typeof theme;
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Quick toggle for light/dark */}
      <button
        onClick={handleQuickToggle}
        className="p-2 rounded-lg bg-surface hover:bg-surface-hover transition-colors"
        aria-label="Toggle light/dark mode"
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-text-primary" />
        ) : theme === 'dark' ? (
          <Sun className="w-5 h-5 text-text-primary" />
        ) : (
          <Palette className="w-5 h-5 text-text-primary" />
        )}
      </button>

      {/* Dropdown for all themes including seasonal */}
      <select
        value={theme}
        onChange={handleSeasonalChange}
        className="p-2 rounded-lg bg-surface hover:bg-surface-hover text-text-primary border border-border focus:outline-none focus:ring-2 focus:ring-primary transition-colors cursor-pointer"
        aria-label="انتخاب تم"
      >
        {Object.entries(themeLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}