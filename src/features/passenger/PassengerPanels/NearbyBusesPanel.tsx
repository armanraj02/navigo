"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui";
import { BusManager } from "@/three/simulation/BusManager";
import { BusState } from "@/three/simulation/BusPool";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";

export const NearbyBusesPanel: React.FC = () => {
  const [buses, setBuses] = useState<BusState[]>([]);

  useEffect(() => {
    const updateBuses = () => {
      setBuses(BusManager.getAllBuses());
    };
    updateBuses();
    const interval = setInterval(updateBuses, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-1">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Live Vehicles
      </span>
      <div className="flex flex-col gap-2">
        {buses.map((bus) => (
          <Card
            key={bus.id}
            onClick={() => PassengerCoordinator.handleBusSelect(bus.id)}
            className="p-3 bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/10 transition-all flex justify-between items-center cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded text-white font-mono"
                style={{ backgroundColor: bus.routeColor }}
              >
                {bus.routeId}
              </span>
              <span className="text-xs font-bold text-text-primary">{bus.id}</span>
            </div>
            <span className="text-[10px] font-bold text-text-secondary font-mono">
              {Math.round(bus.speed * 3.6)} km/h
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
};

NearbyBusesPanel.displayName = "NearbyBusesPanel";
export default NearbyBusesPanel;
