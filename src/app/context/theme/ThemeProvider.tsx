'use client'
import useSystemTheme from '@/app/context/theme/useSystemTheme';
import { ReactNode, createContext, useContext } from 'react';
import { useProvider } from '../useProvider';
import { ContextType } from '../ContextType';
import dark from './dark';
import light from './light';

export type ThemeContextType = {
    border: string
    text: string;
    altText: string;
    bg: string;
    altBg: string;
    inputfieldbg: string;
    hover: string;
    linkhover: string;
    activeLink: string;
  };

  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

  export const useTheme = () => useProvider(ThemeContext);

export const ThemeProvider:React.FC<ContextType> = ({ children }) =>  {
    const [systemTheme] = useSystemTheme()
    let context: ThemeContextType = {} as ThemeContextType;
    // update context object based on system theme
    if (systemTheme === 'dark') {
        context = dark
    } else {
        context = light
    }
    
    return (
        <ThemeContext.Provider value={context}>
            <html className={`${context.bg} ${context.text}`}>{children}</html>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;