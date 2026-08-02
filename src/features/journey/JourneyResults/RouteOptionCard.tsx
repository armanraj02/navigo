"use client";

import React from "react";
import { Card } from "@/components/ui";

interface RouteOptionCardProps {
  type: "bus" | "walk";
  routeName?: string;
  routeId?: string;
  routeColor?: string;
  fromStopName: string;
  toStopName: string;
  durationMinutes: number;
}

export const RouteOptionCard: React.FC<RouteOptionCardProps> = ({
  type,
  routeName,
  routeId,
  routeColor,
  fromStopName,
  toStopName,
  durationMinutes,
}) => {
  const isBus = type === "bus";

  return (
    <Card className="p-3 bg-white/5 border-white/5 rounded-xl flex items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5 min-w-0">
        {isBus ? (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white font-mono shrink-0"
            style={{ backgroundColor: routeColor || "#0071e3" }}
          >
            {routeId}
          </div>
        ) : (
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-700/50 text-text-muted shrink-0">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        )}

        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="font-extrabold text-[10px] uppercase font-mono tracking-wider text-text-muted">
            {isBus ? `${routeName || "Bus Ride"}` : "Walk Leg"}
          </span>
          <span className="text-text-secondary font-medium truncate">
            {fromStopName} → {toStopName}
          </span>
        </div>
      </div>

      <span className="text-[10px] font-bold text-text-secondary bg-white/5 px-2 py-0.5 rounded font-mono shrink-0">
        {durationMinutes} mins
      </span>
    </Card>
  );
};

RouteOptionCard.displayName = "RouteOptionCard";
export default RouteOptionCard;
