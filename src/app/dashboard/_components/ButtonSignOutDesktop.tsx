"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ButtonSignOutDesktop() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
        },
      },
    });
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted/40 rounded-lg transition-colors hover:bg-muted/40" onClick={handleSignOut}>
          <LogOutIcon className="text-red-600 h-5 w-5 transition-all" />
          <span className="sr-only">Logout</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-white">
        Logout
      </TooltipContent>
    </Tooltip>
  );
}
