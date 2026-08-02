"use client";

import React from "react";
import { AlertCard } from "../PassengerCards/AlertCard";

export const AlertsPanel: React.FC = () => {
  const alerts = [
    {
      id: "A1",
      message: "R42: Minor delay due to temporary road inspection near University Gate.",
      severity: "medium" as const,
      routeId: "R42",
    },
    {
      id: "A2",
      message: "High traffic density detected in downtown. Expect minor adjustments in ETA.",
      severity: "low" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Service Advisories
      </span>
      <div className="flex flex-col gap-2">
        {alerts.map((alt) => (
          <AlertCard key={alt.id} {...alt} />
        ))}
      </div>
    </div>
  );
};

AlertsPanel.displayName = "AlertsPanel";
export default AlertsPanel;
