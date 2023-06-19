'use client'
import { SilentError } from '@/Errors/SilentError';
import { useEffect, useState } from 'react';

function useSystemTheme() {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark' | undefined>(() => {
    // supress server side error
    // next js doesn't seem to support react use state initializers

    if (typeof window === 'undefined') {
      // see https://github.com/vercel/next.js/issues/51459
      throw new SilentError("useSystemTheme called on server side, react useState initializer not supported by next.js 'use client' directive")
    }

    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return isDarkMode ? 'dark' : 'light';
  });

  useEffect(() => {
    console.log("useSystemTheme use effect");
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return [systemTheme, setSystemTheme];
}

export default useSystemTheme;