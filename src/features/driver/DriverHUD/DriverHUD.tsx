"use client";

import React from "react";
import { DriverOverlay } from "./DriverOverlay";
import { CurrentRoutePanel } from "../DriverRoute/CurrentRoutePanel";
import { StopSequencePanel } from "../DriverRoute/StopSequencePanel";
import { DriverNavigationPanel } from "../DriverNavigation/DriverNavigationPanel";
import { IncidentPanel } from "../DriverIncidents/IncidentPanel";
import { DriverAnalytics } from "../DriverAnalytics/DriverAnalytics";
import { DriverSettings } from "../DriverSettings/DriverSettings";
import { DriverCameraModes } from "../DriverCamera/DriverCameraModes";

export const DriverHUD: React.FC = () => {
  return (
    <DriverOverlay>
      {/* HUD Sides layout */}
      <div className="flex-1 flex gap-4 w-full justify-between items-stretch mt-3 select-none">
        
        {/* Left column panels */}
        <div className="flex flex-col gap-3.5 w-80 pointer-events-auto overflow-y-auto max-h-[calc(100vh-140px)] pr-1">
          <CurrentRoutePanel />
          <DriverNavigationPanel />
          <StopSequencePanel />
        </div>

        {/* Right column panels */}
        <div className="flex flex-col gap-3.5 w-80 pointer-events-auto overflow-y-auto max-h-[calc(100vh-140px)]">
          <IncidentPanel />
          <DriverAnalytics />
          <DriverSettings />
        </div>
      </div>

      {/* Bottom pill selector bar */}
      <div className="flex justify-center w-full mt-3 pointer-events-auto">
        <DriverCameraModes />
      </div>
    </DriverOverlay>
  );
};

DriverHUD.displayName = "DriverHUD";
export default DriverHUD;
