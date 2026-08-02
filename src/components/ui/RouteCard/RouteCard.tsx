import React from "react";
import { cn } from "@/utils";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { RouteCardProps } from "./RouteCard.types";

export const RouteCard: React.FC<RouteCardProps> = ({
  className,
  routeNumber,
  routeName,
  stopsCount,
  durationMinutes,
  stops = [],
  isSelected = false,
  ...props
}) => {
  return (
    <Card
      variant={isSelected ? "interactive" : "glass"}
      className={cn(
        "flex flex-col gap-4 border transition-all duration-200 select-none",
        isSelected && "border-primary/80 ring-1 ring-primary/30 bg-primary/5",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Badge variant="primary" className="h-6 px-2 rounded font-mono text-sm">
            {routeNumber}
          </Badge>
          <span className="font-display font-semibold text-sm text-text-primary">
            {routeName}
          </span>
        </div>
        <span className="text-xs text-text-secondary font-medium">
          {durationMinutes} min
        </span>
      </div>

      <div className="flex items-center justify-between text-xs text-text-muted border-t border-glass-border/30 pt-3">
        <span>{stopsCount} stops</span>
        <span>Scheduled</span>
      </div>

      {stops.length > 0 && (
        <div className="flex flex-col gap-2 mt-1 pl-1 border-l-2 border-primary/20">
          {stops.slice(0, 3).map((stop, idx) => (
            <div key={idx} className="flex items-center justify-between text-[11px]">
              <span className="text-text-secondary truncate">{stop.name}</span>
              <span className="text-text-muted whitespace-nowrap">{stop.time}</span>
            </div>
          ))}
          {stops.length > 3 && (
            <span className="text-[10px] text-text-muted italic pl-3">
              +{stops.length - 3} more stops
            </span>
          )}
        </div>
      )}
    </Card>
  );
};

RouteCard.displayName = "RouteCard";
