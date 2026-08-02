"use client";

import React from "react";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { OccupancySimulator } from "../OccupancySimulation/OccupancySimulator";

export const DemandOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10 mix-blend-screen">
      {MOCK_STOPS.map((stop) => {
        const leftPercent = 10 + ((stop.position[0] + 80) / 160) * 80;
        const topPercent = 10 + ((stop.position[2] + 80) / 160) * 80;

        const occupancy = OccupancySimulator.getOccupancyForBus(`seed-${stop.id}`);
        // Demand concentrates in different hotspots (Airport and City Center)
        const bias = stop.id === "STOP-01" || stop.id === "STOP-05" ? 1.4 : 0.8;
        const sizePx = 50 + occupancy * 120 * bias;
        const opacityVal = 0.2 + occupancy * 0.4 * bias;

        return (
          <div
            key={stop.id}
            className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-2xl transition-all duration-1000 ease-out"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: `${sizePx}px`,
              height: `${sizePx}px`,
              opacity: opacityVal,
              background: "radial-gradient(circle, rgba(59,130,246,1) 0%, rgba(139,92,246,0) 70%)",
            }}
          />
        );
      })}
    </div>
  );
};

DemandOverlay.displayName = "DemandOverlay";
export default DemandOverlay;
