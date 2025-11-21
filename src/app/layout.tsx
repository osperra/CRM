// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { UserProfileProvider } from "@/context/UserProfileContext";
import { ChatUIProvider } from "@/context/ChatUIContext";

export const metadata: Metadata = {
  title: "Osperra",
  description: "SaaS Ecosystem",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#f8f9ff] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
        <ClerkProvider>
          <ThemeProvider>
            <UserProfileProvider>
              <ChatUIProvider>{children}</ChatUIProvider>
            </UserProfileProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
 