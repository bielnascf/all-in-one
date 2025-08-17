import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/Providers/ThemeProvider";
import Gradient from "@/components/Gradient";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All-in-One",
  description:
    "Simplify and organize your life with All-in-One: a personal organization app that brings together task management, financial tracking, study planning, quick notes, and an online diary",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className="scroll-smooth scrollbar dark"
      lang="en"
      suppressHydrationWarning={true}
    >
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <Gradient />
          <ConditionalLayout>
            <Header />
            {children}
          </ConditionalLayout>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
