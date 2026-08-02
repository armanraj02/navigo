"use client";

import React, { useEffect, useState } from "react";
import { Card, Button } from "@/components/ui";
import { DummyETAEngine, ETAResult } from "@/three/simulation/DummyETAEngine";
import { WorldClock } from "@/three/simulation/WorldClock";
import { ETAChip } from "../PassengerWidgets/ETAChip";

interface StopCardProps {
  stopId: string;
  stopName: string;
  onClose: () => void;
  onBookTicket: () => void;
}

export const StopCard: React.FC<StopCardProps> = ({
  stopId,
  stopName,
  onClose,
  onBookTicket,
}) => {
  const [etas, setEtas] = useState<ETAResult[]>([]);

  useEffect(() => {
    const updateEtas = () => {
      const { totalMinutes } = WorldClock.getTime();
      const nextEtas = DummyETAEngine.getETAsForStop(stopId, totalMinutes);
      setEtas(nextEtas);
    };

    updateEtas();
    const interval = setInterval(updateEtas, 1000);
    return () => clearInterval(interval);
  }, [stopId]);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full select-none flex flex-col gap-3 relative">
      <button
        onClick={onClose}
        aria-label="Close stop details"
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

      <div className="flex flex-col gap-0.5">
        <span className="text-[10px] text-text-muted font-bold font-mono tracking-wider">
          SELECTED STOP
        </span>
        <span className="text-sm font-extrabold text-text-primary">{stopName}</span>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
          Incoming Buses
        </span>
        {etas.length === 0 ? (
          <span className="text-xs text-text-muted italic py-1">No upcoming buses</span>
        ) : (
          <div className="flex flex-col gap-2">
            {etas.map((eta) => (
              <div
                key={eta.routeId}
                className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white font-mono"
                    style={{ backgroundColor: eta.routeColor }}
                  >
                    {eta.routeId}
                  </span>
                  <span className="text-[11px] font-semibold text-text-secondary">
                    {eta.routeName.split(" – ")[1] || "City Line"}
                  </span>
                </div>
                <ETAChip minutes={eta.etaMinutes} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-1">
        <Button
          variant="primary"
          onClick={onBookTicket}
          className="flex-1 text-xs h-9 justify-center gap-2"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          Buy Transit Pass
        </Button>
      </div>
    </Card>
  );
};

StopCard.displayName = "StopCard";
export default StopCard;
