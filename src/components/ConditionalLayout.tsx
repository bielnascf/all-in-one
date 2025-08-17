"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isAuthPageOrDashboard = pathname.startsWith("/auth") || pathname.startsWith("/dashboard");

  if (isAuthPageOrDashboard) {
    return <>{children}</>;
  }

  return <div className="max-w-[1440px] mx-auto">{children}</div>;
} 