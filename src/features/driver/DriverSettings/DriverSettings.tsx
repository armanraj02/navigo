"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui";

export const DriverSettings: React.FC = () => {
  const [hudScale, setHudScale] = useState("normal");
  const [nightFilter, setNightFilter] = useState(false);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Cockpit Preferences
      </span>

      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-text-secondary">HUD Scale:</span>
        <div className="flex gap-1">
          {["compact", "normal"].map((s) => (
            <button
              key={s}
              onClick={() => setHudScale(s)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                hudScale === s
                  ? "bg-white/10 text-text-primary"
                  : "bg-white/5 text-text-secondary hover:bg-white/10"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs border-t border-white/5 pt-2.5">
        <span className="font-semibold text-text-secondary">Night Filter:</span>
        <button
          onClick={() => setNightFilter(!nightFilter)}
          className={`text-[9px] font-bold uppercase px-2.5 py-1 rounded transition-all ${
            nightFilter
              ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
              : "bg-white/5 text-text-secondary border border-white/5"
          }`}
        >
          {nightFilter ? "On" : "Off"}
        </button>
      </div>
    </Card>
  );
};

DriverSettings.displayName = "DriverSettings";
export default DriverSettings;
