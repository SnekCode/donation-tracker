'use client'
 
import useDarkMode from '@/utils/darkmode';
import { ReactNode } from 'react';


// TODO - Extend this ThemeProvider to be a context provider
// so that we can use it to pass down the darkmode state
// to components that need it.
// See https://reactjs.org/docs/context.html
// and https://reactjs.org/docs/hooks-reference.html#usecontext
// Nextjs client side rendering is a consideration
// https://nextjs.org/docs/advanced-features/dynamic-import#basic-usage
export default function ThemeProvider({ children }: { children: ReactNode }) {
    'use client'
    const darkmode = useDarkMode()
    const bg = darkmode ? 'bg-slate-800' : 'bg-slate-200';
    const text = darkmode ? 'text-slate-200' : 'text-slate-800';
    console.log("theme provider");
    
    return <body className={`${bg} ${text} container mx-auto p-4`}>{children}</body>
}