"use client";

import React from "react";
import { MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { OccupancySimulator } from "../OccupancySimulation/OccupancySimulator";

export const DensityOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10 mix-blend-screen">
      {MOCK_STOPS.map((stop) => {
        // Project map coordinates [-80, 80] to percentage offsets [10%, 90%]
        const leftPercent = 10 + ((stop.position[0] + 80) / 160) * 80;
        const topPercent = 10 + ((stop.position[2] + 80) / 160) * 80;

        // Peak volume multiplier
        const occupancy = OccupancySimulator.getOccupancyForBus(`seed-${stop.id}`);
        const sizePx = 40 + occupancy * 110;
        const opacityVal = 0.15 + occupancy * 0.45;

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
              background: "radial-gradient(circle, rgba(16,185,129,1) 0%, rgba(16,185,129,0) 70%)",
            }}
          />
        );
      })}
    </div>
  );
};

DensityOverlay.displayName = "DensityOverlay";
export default DensityOverlay;
