"use client";
import React from "react";
import { useTheme } from "../context/theme/ThemeProvider";
import Link from "next/link";
import { ContextType } from "../context/ContextType";
import { usePathname } from "next/navigation";

export const NavigationLink = ({ href = "/", children = "Home" }) => {
  const theme = useTheme();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <Link
      className={`cursor-pointer 
  ${pathname === href ? theme.activeLink : ''} ${theme.linkhover}`}
      href={href}
    >
      {children}
    </Link>
  );
};

const NavigationHeader: React.FC<ContextType> = ({ children }) => {
  const theme = useTheme();
  return (
    <div
      className={`${theme.text} ${theme.altBg} pl-4 w-full h-10 flex items-center space-x-5`}
    >
      {children}
    </div>
  );
};

export default NavigationHeader;
