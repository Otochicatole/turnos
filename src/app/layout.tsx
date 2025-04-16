import "./globals.css";
import React from "react";
import { NavBar } from "@/components/layout/nav-bar";
import { NavBarProvider } from "@/context/NavBarContext";
import { MainProvider } from "@/context/main-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-row min-h-screen">
        <NavBarProvider>
          <NavBar />
          <MainProvider>{children}</MainProvider>
        </NavBarProvider>
      </body>
    </html>
  );
}

