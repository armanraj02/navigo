"use client";

import React, { useEffect } from "react";
import { DriverHUD } from "../DriverHUD/DriverHUD";
import { DriverCoordinator } from "../DriverCoordinator/DriverCoordinator";

export const DriverExperience: React.FC = () => {
  useEffect(() => {
    // Start tracking simulation bus coordinates and camera locks
    DriverCoordinator.start();
    // Default camera follow perspective lock
    DriverCoordinator.setCameraMode("follow");

    return () => {
      // Clean up subscriptions
      DriverCoordinator.stop();
    };
  }, []);

  return <DriverHUD />;
};

DriverExperience.displayName = "DriverExperience";
export default DriverExperience;
