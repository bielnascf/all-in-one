import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Gradient from "@/components/Gradient";
import { ThemeProvider } from "@/components/Providers/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All-in-One",
  description: "Simplify and organize your life with All-in-One: a personal organization app that brings together task management, financial tracking, study planning, quick notes, and an online diary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-smooth scrollbar dark" lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <Gradient />
          <div className="max-w-[1440px] mx-auto">
            <Header />
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
