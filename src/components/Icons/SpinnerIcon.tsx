import { Loader2 } from "lucide-react";

export function Spinner({ className }: { className?: string }) {
  return <Loader2 width={80} height={80} className={`animate-spin ${className}`} stroke="#3EAC91"/>;
}