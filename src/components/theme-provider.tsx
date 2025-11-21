"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  return (
    <NextThemesProvider
      attribute="class"       // adds class="light" or class="dark" on <html>
      defaultTheme="dark"     // your dashboard is dark by default
      enableSystem={false}    // ignore OS theme for now
    >
      {children}
    </NextThemesProvider>
  );
}
