"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import darkTheme from "@/theme";

export const MainProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className="flex w-full flex-col min-h-screen transition-all duration-300 sm:ml-[80px]">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </main>
    </>
  );
};
