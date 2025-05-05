
import * as React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type StatusType = "pending" | "in-progress" | "completed" | "cancelled";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  status: StatusType;
}

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className: "bg-orange-100 text-orange-800 hover:bg-orange-200"
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-blue-100 text-blue-800 hover:bg-blue-200"
  },
  completed: {
    label: "Completed",
    className: "bg-green-100 text-green-800 hover:bg-green-200"
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-100 text-red-800 hover:bg-red-200"
  }
};

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <Badge 
      variant="outline"
      className={cn(
        "transition-all duration-200 transform hover:scale-105",
        "font-medium px-2.5 py-0.5 text-xs rounded-full",
        config.className,
        className
      )}
      {...props}
    >
      {config.label}
    </Badge>
  );
}
