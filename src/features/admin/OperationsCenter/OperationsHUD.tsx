"use client";

import React from "react";
import { OperationsOverlay } from "./OperationsOverlay";
import { FleetMapPanel } from "../FleetMonitoring/FleetMapPanel";
import { FleetStatusGrid } from "../FleetMonitoring/FleetStatusGrid";
import { IncidentQueue } from "../IncidentCenter/IncidentQueue";
import { NetworkAnalytics } from "../NetworkAnalytics/NetworkAnalytics";
import { MaintenanceCenter } from "../MaintenanceCenter/MaintenanceCenter";
import { SimulationControl } from "../SimulationControl/SimulationControl";
import { Reports } from "../Reports/Reports";
import { AdminCameraModes } from "../AdminCamera/AdminCameraModes";

export const OperationsHUD: React.FC = () => {
  return (
    <OperationsOverlay>
      {/* Sidebars layout */}
      <div className="flex-1 flex gap-4 w-full justify-between items-stretch mt-3 select-none">
        
        {/* Left Hand Sidebar */}
        <div className="flex flex-col gap-3.5 w-80 pointer-events-auto overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
          <FleetMapPanel />
          <FleetStatusGrid />
          <SimulationControl />
        </div>

        {/* Right Hand Sidebar */}
        <div className="flex flex-col gap-3.5 w-80 pointer-events-auto overflow-y-auto max-h-[calc(100vh-140px)]">
          <IncidentQueue />
          <NetworkAnalytics />
          <MaintenanceCenter />
          <Reports />
        </div>
      </div>

      {/* Bottom control row */}
      <div className="flex justify-center w-full mt-3 pointer-events-auto">
        <AdminCameraModes />
      </div>
    </OperationsOverlay>
  );
};

OperationsHUD.displayName = "OperationsHUD";
export default OperationsHUD;
