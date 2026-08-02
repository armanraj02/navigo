"use client";

import React, { useEffect, useState } from "react";
import { BusManager } from "@/three/simulation/BusManager";
import { BusState } from "@/three/simulation/BusPool";

export const BusDensityLayer: React.FC = () => {
  const [buses, setBuses] = useState<BusState[]>([]);

  useEffect(() => {
    const update = () => {
      setBuses(BusManager.getAllBuses());
    };
    update();
    const interval = setInterval(update, 500); // Poll positions for smooth screen mapping
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10 mix-blend-screen">
      {buses.map((bus) => {
        const leftPercent = 10 + ((bus.position.x + 80) / 160) * 80;
        const topPercent = 10 + ((bus.position.z + 80) / 160) * 80;

        return (
          <div
            key={bus.id}
            className="absolute rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 blur-lg transition-all duration-300 ease-out"
            style={{
              left: `${leftPercent}%`,
              top: `${topPercent}%`,
              width: "45px",
              height: "45px",
              opacity: 0.7,
              background: "radial-gradient(circle, rgba(245,158,11,1) 0%, rgba(245,158,11,0) 70%)",
            }}
          />
        );
      })}
    </div>
  );
};

BusDensityLayer.displayName = "BusDensityLayer";
export default BusDensityLayer;
