"use client";

import React from "react";
import { VehicleController } from "../VehicleController";
import { BusAnimator } from "../BusAnimator";
import { BusStopMarker } from "../BusStopMarker";
import { BusShelterGenerator } from "../BusShelterGenerator";
import { RouteSpline } from "@/features/passenger/RoutePreview/RouteSpline";
import { WalkingPath } from "@/features/passenger/RoutePreview/WalkingPath";
import { SelectionController } from "@/features/passenger/SelectionSystem/SelectionController";

export const SimulationLayer: React.FC = () => {
  return (
    <>
      <VehicleController />
      <BusAnimator />
      <BusStopMarker />
      <BusShelterGenerator />

      {/* Interactive passenger route splines */}
      <RouteSpline />
      <WalkingPath />

      {/* R3F selection visual indicator ring */}
      <SelectionController />
    </>
  );
};

SimulationLayer.displayName = "SimulationLayer";
export default SimulationLayer;
