"use client";

import React from "react";
import { Card, Button } from "@/components/ui";
import { useSceneStore } from "@/store/sceneStore";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";

export const PassengerSettingsPanel: React.FC = () => {
  const isNightMode = useSceneStore((s) => s.isNightMode);
  const toggleNightMode = useSceneStore((s) => s.toggleNightMode);

  return (
    <Card className="p-3.5 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Console Preferences
      </span>

      <div className="flex flex-col gap-2 pt-1">
        {/* Night Mode Toggle */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-secondary font-semibold">Night Lighting Mode</span>
          <Button
            variant="ghost"
            onClick={() => {
              toggleNightMode();
              PassengerCoordinator.handleCameraModeChange("cinematic");
            }}
            className="text-[10px] h-7 px-2.5 bg-white/5 border border-white/5 font-semibold"
          >
            {isNightMode ? "ON" : "OFF"}
          </Button>
        </div>

        {/* Screen Reader Aid */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-secondary font-semibold">Screen Reader Assist</span>
          <span className="text-[9px] font-bold text-text-muted uppercase font-mono">
            Optimized
          </span>
        </div>

        {/* Reduced Motion */}
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-secondary font-semibold">Reduced Transitions</span>
          <span className="text-[9px] font-bold text-text-muted uppercase font-mono">
            Standard
          </span>
        </div>
      </div>
    </Card>
  );
};

PassengerSettingsPanel.displayName = "PassengerSettingsPanel";
export default PassengerSettingsPanel;
