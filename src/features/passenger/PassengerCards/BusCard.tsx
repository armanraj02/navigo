"use client";

import React from "react";
import { Card, Button } from "@/components/ui";
import { BusState } from "@/three/simulation/BusPool";
import { OccupancyIndicator } from "../PassengerWidgets/OccupancyIndicator";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";

interface BusCardProps {
  bus: BusState;
  onClose: () => void;
}

export const BusCard: React.FC<BusCardProps> = ({ bus, onClose }) => {
  const handleTrack = () => {
    PassengerCoordinator.handleBusSelect(bus.id);
  };

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full select-none flex flex-col gap-3 relative">
      <button
        onClick={onClose}
        aria-label="Close bus details"
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

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white font-mono shadow-md"
          style={{ backgroundColor: bus.routeColor }}
        >
          {bus.routeId}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-bold text-text-primary">{bus.id}</span>
          <span className="text-[10px] text-text-muted font-semibold">Active Spline Fleet</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 py-1">
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">
            Speed
          </span>
          <span className="text-xs font-bold text-text-primary">
            {Math.round(bus.speed * 3.6)} km/h
          </span>
        </div>
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">
            Route Progress
          </span>
          <span className="text-xs font-bold text-text-primary">
            {Math.round(bus.progress * 100)}%
          </span>
        </div>
      </div>

      <div className="border-t border-white/5 pt-3">
        <OccupancyIndicator occupancy={30 + (parseInt(bus.id.split("-")[1]) % 5) * 12} />
      </div>

      <div className="flex gap-2 mt-1">
        <Button
          variant="primary"
          onClick={handleTrack}
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Track Camera
        </Button>
      </div>
    </Card>
  );
};

BusCard.displayName = "BusCard";
export default BusCard;
