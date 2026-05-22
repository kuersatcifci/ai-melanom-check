"use client";

import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function InfoTooltip({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={`Mehr Informationen: ${label}`}
            className="border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 focus-visible:ring-ring/50 inline-flex h-5 w-5 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-3"
          >
            <Info aria-hidden="true" className="h-3 w-3" strokeWidth={1.75} />
          </button>
        }
      />
      <TooltipContent
        side="top"
        className="max-w-xs whitespace-normal px-3 py-2 text-[13px] leading-relaxed"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}
