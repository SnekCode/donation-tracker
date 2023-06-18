'use client'
import useSystemTheme from '@/app/context/theme/useSystemTheme';
import { ReactNode, createContext, useContext } from 'react';
import { useProvider } from '../useProvider';

type ThemeContextType = {
    border: string;
    text: string;
    altText: string;
    bg: string;
    inputfieldbg: string;
    hover: string;
  };

  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

  export const useTheme = () => useProvider(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [systemTheme] = useSystemTheme()
    let context: ThemeContextType = {} as ThemeContextType;
    // update context object based on system theme
    if (systemTheme === 'dark') {
        context.border = 'border border-slate-200';
        context.text = 'text-slate-200';
        context.altText = 'text-slate-400';
        context.bg = 'bg-slate-800';
        context.inputfieldbg = 'bg-slate-800';
        context.hover = 'hover:bg-slate-600 focus-within:bg-slate-700'
    } else {
        context.border = 'border border-slate-800';
        context.text = 'text-slate-800';
        context.altText = 'text-slate-600';
        context.bg = 'bg-slate-200';
        context.inputfieldbg = 'bg-slate-200';
        context.hover = 'hover:bg-slate-600 focus-within:bg-slate-700'

    }
    
    return (
        <ThemeContext.Provider value={context}>
            <body className={`${context.bg} ${context.text} container mx-auto p-4`}>{children}</body>
        </ThemeContext.Provider>
    )
}