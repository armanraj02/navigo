"use client";

import React from "react";
import { useJourneyStore } from "../JourneyState/JourneyState";
import { JourneyCoordinator } from "../JourneyCoordinator/JourneyCoordinator";

export const JourneyCameraModes: React.FC = () => {
  const selectedJourney = useJourneyStore((s) => s.selectedJourney);
  const previewMode = useJourneyStore((s) => s.previewMode);

  if (!selectedJourney) return null;

  const modes = [
    { id: "overview", label: "Overview", action: () => JourneyCoordinator.enterOverviewMode() },
    { id: "follow", label: "Follow", action: () => JourneyCoordinator.enterFollowMode() },
    { id: "transfer", label: "Transfers", action: () => JourneyCoordinator.focusTransfer(1) },
    { id: "destination", label: "Destination", action: () => JourneyCoordinator.focusDestination() },
  ];

  return (
    <div className="flex bg-background-glass border border-white/10 backdrop-blur-xl rounded-full p-1 shadow-2xl items-center gap-1 select-none">
      {modes.map((mode) => {
        const isActive = previewMode === mode.id;
        return (
          <button
            key={mode.id}
            onClick={mode.action}
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

JourneyCameraModes.displayName = "JourneyCameraModes";
export default JourneyCameraModes;
