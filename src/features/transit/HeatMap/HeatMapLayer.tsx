"use client";

import React from "react";
import { useHeatMapStore } from "./HeatMapStore";
import { DensityOverlay } from "./DensityOverlay";
import { DemandOverlay } from "./DemandOverlay";
import { BusDensityLayer } from "./BusDensityLayer";

export const HeatMapLayer: React.FC = () => {
  const enabled = useHeatMapStore((s) => s.enabled);
  const activeLayer = useHeatMapStore((s) => s.activeLayer);

  if (!enabled) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-10">
      {activeLayer === "density" && <DensityOverlay />}
      {activeLayer === "demand" && <DemandOverlay />}
      {activeLayer === "buses" && <BusDensityLayer />}
    </div>
  );
};

HeatMapLayer.displayName = "HeatMapLayer";
export default HeatMapLayer;
