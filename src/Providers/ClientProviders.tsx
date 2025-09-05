"use client";

import { ThemeProvider } from "@/providers/ThemeProvider";
import Gradient from "@/components/Gradient";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/providers/providers";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <ThemeProvider>
        <Gradient />
        <ConditionalLayout>
          <Header />
          {children}
        </ConditionalLayout>
      </ThemeProvider>
      <Toaster />
    </Providers>
  );
}
