import React from "react";
import { cn } from "@/utils";
import { StatusIndicatorProps } from "./StatusIndicator.types";

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  className,
  status,
  pulse = false,
  label,
  ...props
}) => {
  const statusColors = {
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    info: "bg-info",
    offline: "bg-zinc-500",
  };

  return (
    <div className={cn("inline-flex items-center gap-2 select-none", className)} {...props}>
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        {pulse && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              statusColors[status]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2.5 w-2.5 rounded-full",
            statusColors[status]
          )}
        />
      </span>
      {label && <span className="text-xs font-semibold text-text-primary">{label}</span>}
    </div>
  );
};

StatusIndicator.displayName = "StatusIndicator";
