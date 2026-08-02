import React from "react";
import { cn } from "@/utils";
import { Card } from "../Card";
import { Badge } from "../Badge";
import { ProgressBar } from "../ProgressBar";
import { BusCardProps } from "./BusCard.types";

export const BusCard: React.FC<BusCardProps> = ({
  className,
  busId,
  driverName = "Driver N/A",
  occupancy,
  speedKmh,
  status = "active",
  nextStop,
  isSelected = false,
  ...props
}) => {
  const statusColors = {
    active: "success" as const,
    delayed: "warning" as const,
    inactive: "danger" as const,
  };

  return (
    <Card
      variant={isSelected ? "interactive" : "glass"}
      className={cn(
        "flex flex-col gap-3 select-none transition-all duration-200 border",
        isSelected && "border-primary/80 ring-1 ring-primary/30 bg-primary/5",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Badge variant="primary" className="h-5 px-1.5 rounded text-[10px] font-mono">
            {busId}
          </Badge>
          <span className="font-display font-semibold text-xs text-text-primary">
            {driverName}
          </span>
        </div>
        <Badge variant={statusColors[status]}>{status}</Badge>
      </div>

      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center justify-between text-[11px] text-text-secondary select-none">
          <span>Occupancy</span>
          <span className="font-semibold">{occupancy}%</span>
        </div>
        <ProgressBar value={occupancy} variant={occupancy > 80 ? "accent" : "primary"} />
      </div>

      <div className="flex justify-between items-center text-[10px] text-text-muted mt-1 select-none border-t border-glass-border/30 pt-2.5">
        <span>Speed: <strong className="text-text-secondary">{speedKmh} km/h</strong></span>
        {nextStop && (
          <span className="truncate max-w-[120px]">Next: <strong className="text-text-secondary">{nextStop}</strong></span>
        )}
      </div>
    </Card>
  );
};

BusCard.displayName = "BusCard";
