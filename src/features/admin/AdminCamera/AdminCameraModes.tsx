"use client";

import React from "react";
import { AdminCoordinator } from "../AdminCoordinator/AdminCoordinator";

export const AdminCameraModes: React.FC = () => {
  const modes = [
    { label: "City Overview", action: () => AdminCoordinator.focusCityOverview() },
    { label: "Fleet Depot", action: () => AdminCoordinator.focusDepot() },
    { label: "Clear Focus", action: () => AdminCoordinator.clearVehicleFocus() },
  ];

  return (
    <div className="flex bg-background-glass border border-white/10 backdrop-blur-xl rounded-full p-1 shadow-2xl items-center gap-1 select-none">
      {modes.map((mode, idx) => (
        <button
          key={idx}
          onClick={mode.action}
          className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-text-muted hover:text-text-primary bg-transparent hover:bg-white/5 transition-colors"
        >
          {mode.label}
        </button>
      ))}
    </div>
  );
};

AdminCameraModes.displayName = "AdminCameraModes";
export default AdminCameraModes;
