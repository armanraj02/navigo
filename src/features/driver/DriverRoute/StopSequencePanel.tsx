"use client";

import React from "react";
import { useDriverStore } from "../DriverState";
import { MOCK_ROUTES, MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { Card } from "@/components/ui";

export const StopSequencePanel: React.FC = () => {
  const currentStopIdx = useDriverStore((s) => s.stopsCompleted);

  const route = MOCK_ROUTES.find((r) => r.id === "R42");
  if (!route) return null;

  const stops = route.stopIds
    .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
    .filter(Boolean);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3.5 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Assigned Timetable Stops
      </span>

      <div className="flex flex-col gap-3.5 relative pl-3.5 border-l border-white/10 ml-2">
        {stops.map((stop, idx) => {
          if (!stop) return null;
          const isPassed = idx < currentStopIdx;
          const isActive = idx === currentStopIdx;
          const isNext = idx > currentStopIdx;

          return (
            <div key={stop.id} className="relative flex items-center justify-between text-xs">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[20px] w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  isPassed
                    ? "bg-emerald-500 border-emerald-400"
                    : isActive
                    ? "bg-blue-500 border-blue-400 animate-pulse scale-110 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              />

              <div className="flex flex-col">
                <span
                  className={`font-semibold transition-colors duration-300 ${
                    isPassed
                      ? "text-text-secondary line-through opacity-70"
                      : isActive
                      ? "text-blue-400 font-bold"
                      : "text-text-primary"
                  }`}
                >
                  {stop.name}
                </span>
                <span className="text-[8px] text-text-muted font-mono uppercase tracking-wider mt-0.5">
                  Stop ID: {stop.id}
                </span>
              </div>

              {isActive && (
                <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono uppercase">
                  Docked
                </span>
              )}

              {isNext && idx === currentStopIdx + 1 && (
                <span className="text-[9px] font-bold text-text-muted bg-white/5 border border-white/5 px-1.5 py-0.5 rounded font-mono uppercase">
                  Next Stop
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

StopSequencePanel.displayName = "StopSequencePanel";
export default StopSequencePanel;
