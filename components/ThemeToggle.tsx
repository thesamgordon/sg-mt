'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.scss';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const attrTheme = document.documentElement.getAttribute('data-theme') as Theme | null;
    const initialTheme: Theme =
      attrTheme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    queueMicrotask(() => {
      setTheme(initialTheme);
    });
  }, []);

  const updateTheme = (nextTheme: Theme) => {
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const toggleTheme = () => {
    const currentTheme =
      theme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition) {
      updateTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      updateTheme(nextTheme);
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label="Toggle theme"
      type="button"
    >
      <Sun className={`${styles.icon} ${styles.iconSun}`} size={20} />
      <Moon className={`${styles.icon} ${styles.iconMoon}`} size={20} />
    </button>
  );
}
