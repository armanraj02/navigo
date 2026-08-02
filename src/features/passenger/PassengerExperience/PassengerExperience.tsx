"use client";

import React, { useEffect } from "react";
import { TransitSimulation } from "@/three/simulation/TransitSimulation";
import { PassengerHUD } from "../PassengerHUD/PassengerHUD";

export const PassengerExperience: React.FC = () => {
  useEffect(() => {
    // Spin up simulation clocks, buses, traffic signals, and spawn initial vehicles
    TransitSimulation.start();
    return () => {
      TransitSimulation.stop();
    };
  }, []);

  return <PassengerHUD />;
};

PassengerExperience.displayName = "PassengerExperience";
export default PassengerExperience;
