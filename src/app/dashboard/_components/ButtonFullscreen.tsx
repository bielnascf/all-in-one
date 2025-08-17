"use client"

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ExpandIcon } from "lucide-react";

export default function ButtonFullscreen() {
 const handleFullscreen = () => {
  if(document.fullscreenElement) {
   document.exitFullscreen();
  } else {
   document.documentElement.requestFullscreen().catch((err) => {
    console.log(err);
   })
  }
 }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className="flex h-9 w-9 shrink-0 items-center justify-center bg-muted/40 rounded-lg transition-colors hover:bg-muted/40"
          onClick={handleFullscreen}

        >
          <ExpandIcon className="text-primary h-5 w-5 transition-all" />
          <span className="sr-only">Fullscreen</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="text-white">
        Fullscreen
      </TooltipContent>
    </Tooltip>
  );
}
