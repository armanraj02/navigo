"use client";

import React from "react";
import { Card } from "@/components/ui";

export const MaintenanceCenter: React.FC = () => {
  const alerts = [
    { vehicleId: "BUS-002", issue: "Battery level warning (28%)", severity: "high" },
    { vehicleId: "BUS-003", issue: "Tire alignment inspection due", severity: "low" },
  ];

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Maintenance Advisories
      </span>

      <div className="flex flex-col gap-2">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-white/5 border border-white/5 p-2.5 rounded-xl text-[10px]"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-extrabold text-[9px] uppercase font-mono text-text-muted">
                {alert.vehicleId}
              </span>
              <span className="text-text-secondary font-medium leading-tight">{alert.issue}</span>
            </div>
            <span
              className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded font-mono ${
                alert.severity === "high"
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 animate-pulse"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {alert.severity}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

MaintenanceCenter.displayName = "MaintenanceCenter";
export default MaintenanceCenter;
