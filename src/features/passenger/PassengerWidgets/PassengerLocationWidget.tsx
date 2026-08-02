"use client";

import React, { useEffect, useState } from "react";
import { SceneEvents } from "@/three/SceneEvents";
import { BusStopManager } from "@/three/simulation/BusStopManager";

export const PassengerLocationWidget: React.FC = () => {
  const [locationName, setLocationName] = useState("Downtown Network");

  useEffect(() => {
    const unsub = SceneEvents.subscribe("STOP_SELECTED", (stopId) => {
      if (stopId) {
        const stop = BusStopManager.getStopById(stopId as string);
        if (stop) {
          setLocationName(stop.name);
          return;
        }
      }
      setLocationName("Downtown Network");
    });

    return () => unsub();
  }, []);

  return (
    <div className="flex items-center gap-2 bg-background-glass border border-white/10 backdrop-blur px-4 py-1.5 rounded-full select-none">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider font-mono">
        {locationName}
      </span>
    </div>
  );
};

PassengerLocationWidget.displayName = "PassengerLocationWidget";
export default PassengerLocationWidget;
