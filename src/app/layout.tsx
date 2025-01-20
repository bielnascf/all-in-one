import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/MainPage/Header";
import Gradient from "@/components/Gradient";

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
    <html className="scroll-smooth scrollbar" lang="en">
      <body className={`h-screen max-w-[1440px] mx-auto ${inter.className} dark`}>
          <Gradient />
          <Header />    
          {children}
      </body>
    </html>
  );
}
