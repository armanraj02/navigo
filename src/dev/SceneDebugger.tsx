import React from "react";
import { FPSCounter } from "./FPSCounter";
import { GridToggle } from "./GridToggle";

export interface SceneDebuggerProps {
  active?: boolean;
}

export const SceneDebugger: React.FC<SceneDebuggerProps> = ({ active = false }) => {
  if (!active) return null;
  return (
    <div className="fixed top-4 left-4 z-50 flex flex-col gap-2 rounded bg-zinc-950/90 border border-zinc-800 p-4 text-xs text-zinc-400">
      <h3 className="font-bold text-white border-b border-zinc-800 pb-1 mb-1">Scene Debugger</h3>
      <div>Camera Target: [0, 0, 0]</div>
      <div>Entities Spawned: 0</div>
      <FPSCounter show={true} />
      <GridToggle />
    </div>
  );
};
