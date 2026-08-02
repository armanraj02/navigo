"use client";

import React from "react";
import { useDriverStore } from "../DriverState";
import { DriverCoordinator } from "../DriverCoordinator/DriverCoordinator";

export const DriverCameraModes: React.FC = () => {
  const currentMode = useDriverStore((s) => s.cameraMode);

  const modes = [
    { id: "cockpit" as const, label: "Cockpit" },
    { id: "follow" as const, label: "Follow" },
    { id: "orbit" as const, label: "Orbit" },
    { id: "top" as const, label: "Top View" },
    { id: "intersection" as const, label: "Intersection" },
  ];

  return (
    <div className="flex bg-background-glass border border-white/10 backdrop-blur-xl rounded-full p-1 shadow-2xl items-center gap-1 select-none">
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={() => DriverCoordinator.setCameraMode(mode.id)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105"
                : "text-text-muted hover:text-text-primary bg-transparent hover:bg-white/5"
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
};

DriverCameraModes.displayName = "DriverCameraModes";
export default DriverCameraModes;
