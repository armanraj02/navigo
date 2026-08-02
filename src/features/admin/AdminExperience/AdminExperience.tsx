"use client";

import React, { useEffect } from "react";
import { OperationsHUD } from "../OperationsCenter/OperationsHUD";
import { AdminCoordinator } from "../AdminCoordinator/AdminCoordinator";

export const AdminExperience: React.FC = () => {
  useEffect(() => {
    // Select default overview focus
    AdminCoordinator.focusCityOverview();
    return () => {
      // Restore default clock settings on unmounting admin console
      AdminCoordinator.setPaused(false);
      AdminCoordinator.setSpeed(60);
      AdminCoordinator.setWeather("clear");
      AdminCoordinator.toggleNightMode(false);
    };
  }, []);

  return <OperationsHUD />;
};

AdminExperience.displayName = "AdminExperience";
export default AdminExperience;
