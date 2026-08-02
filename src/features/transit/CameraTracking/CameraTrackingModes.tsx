"use client";

import React from "react";
import { useTransitStore } from "../TrackingEngine/TransitStore";
import { TransitCoordinator } from "./TransitCoordinator";
import type { CameraTrackingMode } from "../TrackingEngine/TransitTypes";

export const CameraTrackingModes: React.FC = () => {
  const currentMode = useTransitStore((s) => s.cameraTrackingMode);

  const modes: { id: CameraTrackingMode; label: string; action: () => void }[] = [
    { id: "TopView", label: "Top View", action: () => TransitCoordinator.topView() },
    { id: "FollowBus", label: "Follow Bus", action: () => TransitCoordinator.followBus("BUS-001") },
    { id: "Intersection", label: "Intersection", action: () => TransitCoordinator.intersectionView() },
    { id: "Destination", label: "Destination Focus", action: () => TransitCoordinator.destinationView() },
  ];

  return (
    <div className="flex bg-background-glass border border-white/10 backdrop-blur-xl rounded-full p-1 shadow-2xl items-center gap-1 select-none">
      {modes.map((mode) => {
        const isActive = currentMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={mode.action}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
              isActive
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 scale-105"
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

CameraTrackingModes.displayName = "CameraTrackingModes";
export default CameraTrackingModes;
