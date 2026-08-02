"use client";

import React from "react";
import { useTransitStore } from "../TrackingEngine/TransitStore";
import { MOCK_ROUTES, MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { Card } from "@/components/ui";

interface TransitTimelineProps {
  busId: string;
}

export const TransitTimeline: React.FC<TransitTimelineProps> = ({ busId }) => {
  const busData = useTransitStore((s) => s.liveBuses[busId]);

  if (!busData) return null;

  const route = MOCK_ROUTES.find((r) => r.id === busData.routeId);
  if (!route) return null;

  // Retrieve stops list in order
  const stops = route.stopIds
    .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
    .filter(Boolean);

  // Find index of current nearest stop to style timeline
  const currentIdx = stops.findIndex((s) => s!.id === busData.currentStopId);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3.5 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Live Transit Progress: {busData.id} ({busData.routeId})
      </span>

      <div className="flex flex-col gap-3 relative pl-3.5 border-l border-white/10 ml-2">
        {stops.map((stop, idx) => {
          if (!stop) return null;
          const isCompleted = idx < currentIdx;
          const isCurrent = idx === currentIdx;
          const isUpcoming = idx > currentIdx;

          return (
            <div key={stop.id} className="relative flex items-center justify-between text-xs">
              {/* Dot Indicators */}
              <div
                className={`absolute -left-[20px] w-2.5 h-2.5 rounded-full border flex items-center justify-center transition-colors duration-300 ${
                  isCompleted
                    ? "bg-emerald-500 border-emerald-400"
                    : isCurrent
                    ? "bg-blue-500 border-blue-400 animate-pulse scale-110 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
                    : "bg-zinc-800 border-zinc-700"
                }`}
              />

              <span
                className={`font-semibold transition-colors duration-300 ${
                  isCompleted
                    ? "text-text-secondary line-through opacity-70"
                    : isCurrent
                    ? "text-blue-400 font-bold"
                    : "text-text-primary"
                }`}
              >
                {stop.name}
              </span>

              {isCurrent && (
                <span className="text-[9px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded font-mono uppercase animate-pulse">
                  Current
                </span>
              )}

              {isUpcoming && idx === currentIdx + 1 && (
                <span className="text-[9px] font-bold text-text-muted bg-white/5 border border-white/5 px-1.5 py-0.5 rounded font-mono uppercase">
                  ETA {busData.etaMinutes}m
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

TransitTimeline.displayName = "TransitTimeline";
export default TransitTimeline;
