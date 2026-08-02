"use client";

import React from "react";
import { useCameraStore } from "@/store/cameraStore";
import { Badge } from "@/components/ui";

export const CameraStatusWidget: React.FC = () => {
  const target = useCameraStore((state) => state.target);
  const position = useCameraStore((state) => state.position);
  const mode = useCameraStore((state) => state.mode);
  const zoom = useCameraStore((state) => state.zoom);

  return (
    <div className="flex items-center gap-4 text-[10px] text-text-muted select-none font-mono">
      <span>Focus Mode: <Badge variant="primary" className="h-4 px-1 rounded text-[8px] uppercase tracking-wide">{mode}</Badge></span>
      <div className="h-3.5 w-px bg-glass-border" />
      <span>Target: <strong className="text-text-secondary">[{target.map(n => n.toFixed(1)).join(", ")}]</strong></span>
      <div className="h-3.5 w-px bg-glass-border" />
      <span>Cam Pos: <strong className="text-text-secondary">[{position.map(n => n.toFixed(1)).join(", ")}]</strong></span>
      <div className="h-3.5 w-px bg-glass-border" />
      <span>Zoom: <strong className="text-text-secondary">{(zoom * 100).toFixed(0)}%</strong></span>
    </div>
  );
};

CameraStatusWidget.displayName = "CameraStatusWidget";
export default CameraStatusWidget;
