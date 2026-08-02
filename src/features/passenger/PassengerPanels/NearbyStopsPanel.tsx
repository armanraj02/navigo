"use client";

import React from "react";
import { Card } from "@/components/ui";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";

export const NearbyStopsPanel: React.FC = () => {
  // Sort stops by distance to center
  const sortedStops = [...MOCK_STOPS].sort((a, b) => {
    const distA = Math.sqrt(a.position[0] ** 2 + a.position[2] ** 2);
    const distB = Math.sqrt(b.position[0] ** 2 + b.position[2] ** 2);
    return distA - distB;
  });

  return (
    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Nearby Stops
      </span>
      <div className="flex flex-col gap-2">
        {sortedStops.map((stop) => {
          const distance = Math.round(Math.sqrt(stop.position[0] ** 2 + stop.position[2] ** 2) * 10);
          return (
            <Card
              key={stop.id}
              onClick={() => PassengerCoordinator.handleStopSelect(stop.id)}
              className="p-3 bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10 transition-all flex justify-between items-center cursor-pointer"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-text-primary">{stop.name}</span>
                <span className="text-[9px] text-text-muted font-mono">{stop.id}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-bold text-blue-400 font-mono">
                  {distance}m
                </span>
                <div className="flex gap-1">
                  {stop.routeIds.map((rid) => (
                    <span
                      key={rid}
                      className="text-[8px] font-bold px-1 rounded text-white font-mono"
                      style={{ backgroundColor: rid === "R42" ? "#0071e3" : rid === "R7" ? "#00e3a5" : "#f59e0b" }}
                    >
                      {rid}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

NearbyStopsPanel.displayName = "NearbyStopsPanel";
export default NearbyStopsPanel;
