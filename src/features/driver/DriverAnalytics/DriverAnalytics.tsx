"use client";

import React from "react";
import { useDriverStore } from "../DriverState";
import { Card } from "@/components/ui";

export const DriverAnalytics: React.FC = () => {
  const duration = useDriverStore((s) => s.tripDurationSeconds);
  const distance = useDriverStore((s) => s.distanceTravelledKm);
  const passengers = useDriverStore((s) => s.passengersCount);
  const fuel = useDriverStore((s) => s.fuelPercent);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Telemetry Summary
      </span>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[8px] uppercase tracking-wider text-text-muted font-mono">Trip Time</span>
          <span className="text-sm font-extrabold text-text-primary font-mono">{formatDuration(duration)}</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[8px] uppercase tracking-wider text-text-muted font-mono">Distance</span>
          <span className="text-sm font-extrabold text-text-primary font-mono">{distance.toFixed(2)} km</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[8px] uppercase tracking-wider text-text-muted font-mono">On Board</span>
          <span className="text-sm font-extrabold text-text-primary font-mono">{passengers} pax</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center w-full">
            <span className="text-[8px] uppercase tracking-wider text-text-muted font-mono">Energy</span>
            <span className="text-[10px] font-bold text-text-primary font-mono">{fuel}%</span>
          </div>
          {/* Energy gauge bar */}
          <div className="h-1.5 w-full bg-white/10 rounded-full mt-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                fuel < 25 ? "bg-red-500 animate-pulse" : "bg-emerald-500"
              }`}
              style={{ width: `${fuel}%` }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

DriverAnalytics.displayName = "DriverAnalytics";
export default DriverAnalytics;
