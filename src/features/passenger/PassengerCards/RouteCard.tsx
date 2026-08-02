"use client";

import React from "react";
import { Card } from "@/components/ui";
import { BusRoute, MOCK_STOPS } from "@/three/simulation/DummyScheduleEngine";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";

interface RouteCardProps {
  route: BusRoute;
  onClose: () => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({ route, onClose }) => {
  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full select-none flex flex-col gap-3 relative">
      <button
        onClick={onClose}
        aria-label="Close route details"
        className="absolute top-3 right-3 text-text-muted hover:text-text-primary transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-center gap-2.5">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded text-white font-mono"
          style={{ backgroundColor: route.color }}
        >
          {route.id}
        </span>
        <span className="text-xs font-bold text-text-primary truncate">{route.name}</span>
      </div>

      <div className="flex flex-col gap-1.5 pt-1">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
          Route Stops Sequence
        </span>
        <div className="flex flex-col gap-2.5 pl-2 relative border-l-2 border-white/10 mt-1">
          {route.stopIds.map((stopId) => {
            const stop = MOCK_STOPS.find((s) => s.id === stopId);
            return (
              <div
                key={stopId}
                className="flex items-center gap-2.5 relative group cursor-pointer"
                onClick={() => PassengerCoordinator.handleStopSelect(stopId)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full absolute -left-[14px] bg-background border-2 group-hover:scale-125 transition-transform"
                  style={{ borderColor: route.color }}
                />
                <span className="text-xs font-semibold text-text-secondary group-hover:text-text-primary transition-colors">
                  {stop?.name || stopId}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex items-center justify-between text-xs mt-1">
        <span className="text-text-muted font-semibold">Average Headway</span>
        <span className="font-bold text-text-primary font-mono">{route.headwayMinutes} min</span>
      </div>
    </Card>
  );
};

RouteCard.displayName = "RouteCard";
export default RouteCard;
