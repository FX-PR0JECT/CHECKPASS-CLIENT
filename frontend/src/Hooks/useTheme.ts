import { useState } from 'react';

const useTheme = () => {
  const localTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    localTheme === 'dark' ? true : false
  );

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const nextTheme = !prev;
      localStorage.setItem('theme', nextTheme ? 'dark' : 'light');

      return nextTheme;
    });
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;
