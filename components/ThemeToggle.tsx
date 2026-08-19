'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './ThemeToggle.module.scss';
import { motion } from 'motion/react';

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
    <motion.button
      onClick={toggleTheme}
      className={styles.themeToggle}
      aria-label="Toggle theme"
      type="button"
      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        ease: [0, -0.005, 0.226, 1],
        duration: 0.75,
        delay: 0.0,
      }}>
      <Sun className={`${styles.icon} ${styles.iconSun}`} size={20} />
      <Moon className={`${styles.icon} ${styles.iconMoon}`} size={20} />
    </motion.button>
  );
}
