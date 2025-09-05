import Sidebar from "./_components/Sidebar";
import "./../globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
      <Toaster />
    </>
  );
}
