"use client";

import React from "react";

interface OccupancyIndicatorProps {
  occupancy: number; // percentage 0 to 100
}

export const OccupancyIndicator: React.FC<OccupancyIndicatorProps> = ({ occupancy }) => {
  const isHigh = occupancy > 75;
  const isMid = occupancy >= 35 && occupancy <= 75;

  const label = isHigh ? "High Seat Alert" : isMid ? "Moderate Seats" : "Many Seats Available";
  const color = isHigh
    ? "bg-rose-500 text-rose-400"
    : isMid
    ? "bg-amber-500 text-amber-400"
    : "bg-emerald-500 text-emerald-400";

  return (
    <div className="flex items-center gap-1.5 select-none" aria-label={`Occupancy is ${occupancy} percent: ${label}`}>
      <span className="text-[10px] font-semibold text-text-secondary">{label}</span>
      <div className="flex gap-0.5 h-2 w-10 bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full ${color.split(" ")[0]}`}
          style={{ width: `${occupancy}%` }}
        />
      </div>
    </div>
  );
};

OccupancyIndicator.displayName = "OccupancyIndicator";
export default OccupancyIndicator;
