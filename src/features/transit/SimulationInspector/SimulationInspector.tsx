"use client";

import React, { useEffect, useState } from "react";
import { WorldClock } from "@/three/simulation/WorldClock";
import { SimulationClock } from "@/three/simulation/SimulationClock";
import { Card } from "@/components/ui";

export const SimulationInspector: React.FC = () => {
  const [timeStr, setTimeStr] = useState("");
  const [speed, setSpeed] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStr(WorldClock.formatTime());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    WorldClock.setSpeed(newSpeed);
  };

  const toggleClock = () => {
    if (SimulationClock.isRunning()) {
      SimulationClock.stop();
    } else {
      SimulationClock.start();
    }
  };

  return (
    <Card className="p-3 bg-zinc-950/80 border border-red-500/20 backdrop-blur-xl rounded-xl w-full flex flex-col gap-2.5 text-xs text-text-secondary select-none font-mono">
      <div className="flex justify-between items-center text-red-400 font-bold uppercase text-[9px] tracking-wider">
        <span>Sim Inspector [DEV]</span>
        <span className="animate-pulse">● Live</span>
      </div>

      <div className="flex justify-between items-center bg-white/5 p-1.5 rounded">
        <span>Sim Time:</span>
        <span className="font-bold text-text-primary text-sm">{timeStr}</span>
      </div>

      <div className="flex justify-between items-center">
        <span>Tick Speed:</span>
        <div className="flex gap-1">
          {([10, 60, 240] as const).map((s) => (
            <button
              key={s}
              onClick={() => handleSpeedChange(s)}
              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                speed === s
                  ? "bg-red-500/20 text-red-400 border border-red-500/30"
                  : "bg-white/5 border border-white/5 hover:bg-white/10"
              }`}
            >
              {s}m/s
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={toggleClock}
        className="w-full py-1 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30 text-[10px] font-bold rounded text-red-400 transition-colors uppercase"
      >
        {SimulationClock.isRunning() ? "Pause Clock" : "Resume Clock"}
      </button>
    </Card>
  );
};

SimulationInspector.displayName = "SimulationInspector";
export default SimulationInspector;
