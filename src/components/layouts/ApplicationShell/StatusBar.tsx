"use client";

import React from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { Badge, StatusIndicator } from "@/components/ui";

export const StatusBar: React.FC = () => {
  const graphicsQuality = useSettingsStore((state) => state.graphicsQuality);

  return (
    <div className="flex items-center gap-6 text-[10px] text-text-muted select-none font-mono">
      <div className="flex items-center gap-2">
        <StatusIndicator status="success" pulse={true} />
        <span>Telemetry Stream: <strong className="text-success font-semibold">Active</strong></span>
      </div>
      <div className="h-3.5 w-px bg-glass-border" />
      <span>Render Quality: <Badge variant="primary" className="h-4 px-1 rounded text-[8px] tracking-wide">{graphicsQuality}</Badge></span>
      <div className="h-3.5 w-px bg-glass-border" />
      <span>FPS Limit: <strong className="text-text-secondary">60/60</strong></span>
    </div>
  );
};

StatusBar.displayName = "StatusBar";
export default StatusBar;
