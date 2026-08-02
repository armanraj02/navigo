"use client";

import React from "react";
import { useAdminStore } from "../AdminState";
import { AdminCoordinator } from "../AdminCoordinator/AdminCoordinator";
import { Card, Button } from "@/components/ui";

export const SimulationControl: React.FC = () => {
  const isPaused = useAdminStore((s) => s.isPaused);
  const simSpeed = useAdminStore((s) => s.simSpeed);
  const activeWeather = useAdminStore((s) => s.activeWeather);
  const isNightMode = useAdminStore((s) => s.isNightMode);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Simulation Operations deck
      </span>

      {/* Clock Controls */}
      <div className="flex gap-2 w-full">
        <Button
          variant="ghost"
          onClick={() => AdminCoordinator.setPaused(!isPaused)}
          className={`flex-1 h-8 text-[10px] font-bold uppercase rounded-lg justify-center ${
            isPaused
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
          }`}
        >
          {isPaused ? "Clock Paused" : "Clock Running"}
        </Button>
      </div>

      {/* Speed Multipliers */}
      <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2.5">
        <span className="font-semibold text-text-secondary">Sim Speed:</span>
        <div className="flex gap-1">
          {([10, 60, 240] as const).map((speed) => (
            <button
              key={speed}
              onClick={() => AdminCoordinator.setSpeed(speed)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                simSpeed === speed
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-text-secondary hover:bg-white/10"
              }`}
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      {/* Weather Controls */}
      <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2.5">
        <span className="font-semibold text-text-secondary">Weather:</span>
        <div className="flex gap-1">
          {(["clear", "rain", "fog"] as const).map((w) => (
            <button
              key={w}
              onClick={() => AdminCoordinator.setWeather(w)}
              className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                activeWeather === w
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-text-secondary hover:bg-white/10"
              }`}
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      {/* Night Toggles */}
      <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2.5">
        <span className="font-semibold text-text-secondary">Night Filter:</span>
        <button
          onClick={() => AdminCoordinator.toggleNightMode(!isNightMode)}
          className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded transition-all ${
            isNightMode
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-white/5 text-text-secondary border border-white/5"
          }`}
        >
          {isNightMode ? "On" : "Off"}
        </button>
      </div>
    </Card>
  );
};

SimulationControl.displayName = "SimulationControl";
export default SimulationControl;
