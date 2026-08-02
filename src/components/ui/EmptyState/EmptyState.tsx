import React from "react";
import { cn } from "@/utils";
import { GlassCard } from "../GlassCard";
import { EmptyStateProps } from "./EmptyState.types";

export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  title,
  description,
  icon,
  actionButton,
  ...props
}) => {
  return (
    <GlassCard
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 border border-dashed border-glass-border/60 rounded-2xl gap-4 select-none",
        className
      )}
      {...props}
    >
      {icon && <span className="text-text-muted shrink-0">{icon}</span>}
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-semibold text-sm text-text-primary">
          {title}
        </h3>
        {description && (
          <span className="text-xs text-text-secondary max-w-xs leading-normal">
            {description}
          </span>
        )}
      </div>
      {actionButton && <div className="mt-2">{actionButton}</div>}
    </GlassCard>
  );
};

EmptyState.displayName = "EmptyState";
