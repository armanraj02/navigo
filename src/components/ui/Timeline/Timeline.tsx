import React from "react";
import { cn } from "@/utils";
import { TimelineProps } from "./Timeline.types";

export const Timeline: React.FC<TimelineProps> = ({ className, nodes, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-4 relative pl-6 select-none", className)} {...props}>
      {/* Central timeline line */}
      <div className="absolute left-[7px] top-1 bottom-1 w-0.5 bg-glass-border" />
      {nodes.map((node, idx) => {
        const isCompleted = node.status === "completed";
        const isActive = node.status === "active";

        return (
          <div key={idx} className="relative flex flex-col gap-0.5">
            {/* Node bullet */}
            <div
              className={cn(
                "absolute -left-[24px] top-1 h-3.5 w-3.5 rounded-full border-2 border-background z-10 transition-colors duration-200",
                isCompleted && "bg-success",
                isActive && "bg-primary shadow-glow animate-pulse",
                !isCompleted && !isActive && "bg-zinc-700"
              )}
            />
            <div className="flex items-center justify-between text-xs">
              <span
                className={cn(
                  "font-semibold text-text-primary",
                  isActive && "text-primary"
                )}
              >
                {node.title}
              </span>
              {node.time && <span className="text-text-muted font-mono">{node.time}</span>}
            </div>
            {node.description && (
              <span className="text-[11px] text-text-secondary leading-relaxed">
                {node.description}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
};

Timeline.displayName = "Timeline";
