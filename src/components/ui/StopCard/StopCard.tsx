import React from "react";
import { cn } from "@/utils";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { StopCardProps } from "./StopCard.types";

export const StopCard: React.FC<StopCardProps> = ({
  className,
  stopName,
  locationDetails = "Stop Location Info",
  arrivals = [],
  isSelected = false,
  ...props
}) => {
  return (
    <Card
      variant={isSelected ? "interactive" : "glass"}
      className={cn(
        "flex flex-col gap-3.5 select-none transition-all duration-200 border",
        isSelected && "border-primary/80 ring-1 ring-primary/30 bg-primary/5",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-display font-semibold text-sm text-text-primary">
          {stopName}
        </span>
        <span className="text-[10px] text-text-muted select-none">
          {locationDetails}
        </span>
      </div>

      {arrivals.length > 0 && (
        <div className="flex flex-col gap-2 mt-1 border-t border-glass-border/30 pt-3">
          <span className="text-[10px] font-bold text-text-secondary select-none uppercase tracking-wider">
            Upcoming Arrivals
          </span>
          {arrivals.map((arr, idx) => (
            <div key={idx} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <Badge variant="primary" className="h-4 px-1 rounded text-[9px] font-mono">
                  {arr.routeNumber}
                </Badge>
                <span className="text-text-secondary font-medium">Route {arr.routeNumber}</span>
              </div>
              <span className="text-success font-semibold font-mono">
                {arr.etaMinutes}m
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

StopCard.displayName = "StopCard";
