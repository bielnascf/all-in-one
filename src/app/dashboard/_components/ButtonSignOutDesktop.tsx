"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ButtonSignOutDesktop() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
          setLoading(false);
        },
      },
    });
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted/40 rounded-lg transition-colors hover:bg-muted/40" onClick={handleSignOut}>
          {loading ? <Loader2Icon className="animate-spin w-4 h-4 text-white" /> : <LogOutIcon className="text-red-600 h-5 w-5 transition-all" />}
          <span className="sr-only">Logout</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-white">
        Logout
      </TooltipContent>
    </Tooltip>
  );
}
