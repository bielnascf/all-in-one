"use client";

import { ThemeProvider } from "@/Providers/ThemeProvider";
import Gradient from "@/components/Gradient";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/Providers/providers";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
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
