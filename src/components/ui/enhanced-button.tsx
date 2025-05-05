
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EnhancedButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  children: React.ReactNode;
}

const EnhancedButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  EnhancedButtonProps
>(({ className, children, ...props }, ref) => {
  return (
    <Button
      className={cn(
        "transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95",
        "hover:shadow-md focus:ring-2 focus:ring-primary/25 focus:outline-none",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Button>
  );
});

EnhancedButton.displayName = "EnhancedButton";

export { EnhancedButton };
