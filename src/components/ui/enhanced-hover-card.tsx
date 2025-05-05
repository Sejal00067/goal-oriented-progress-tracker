
import React from "react";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface EnhancedHoverCardProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function EnhancedHoverCard({
  trigger,
  children,
  className,
  contentClassName,
}: EnhancedHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={cn("cursor-pointer", className)}>{trigger}</div>
      </HoverCardTrigger>
      <HoverCardContent
        className={cn(
          "w-80 p-4 shadow-xl animate-in zoom-in-90 border border-border/30",
          "bg-gradient-to-b from-popover to-popover/95",
          contentClassName
        )}
      >
        {children}
      </HoverCardContent>
    </HoverCard>
  );
}
