'use client'
import useSystemTheme from '@/hooks/useSystemTheme';
import { ReactNode, createContext, useContext } from 'react';

type ThemeContextType = {
    border: string;
    text: string;
    altText: string;
    bg: string;
    inputfieldbg: string;
  };

  const ThemeContext = createContext<ThemeContextType>({
    bg: 'bg-slate-200',
    border: 'boarder border-slate-200',
    text: 'text-slate-800',
    altText: 'text-slate-200',
    inputfieldbg: 'bg-slate-200'
  });

  export const useTheme = () => useContext(ThemeContext);

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [systemTheme] = useSystemTheme()
    let context: ThemeContextType = {} as ThemeContextType;
    // update context object based on system theme
    if (systemTheme === 'dark') {
        context.border = 'border border-slate-200';
        context.text = 'text-slate-200';
        context.altText = 'text-slate-500';
        context.bg = 'bg-slate-800';
        context.inputfieldbg = 'bg-slate-800';
    } else {
        context.border = 'border border-slate-800';
        context.text = 'text-slate-800';
        context.altText = 'text-slate-500';
        context.bg = 'bg-slate-200';
        context.inputfieldbg = 'bg-slate-200';
    }

    console.log("theme provider");
    
    return (
        <ThemeContext.Provider value={context}>
            <body className={`${context.bg} ${context.text} container mx-auto p-4`}>{children}</body>
        </ThemeContext.Provider>
    )
}