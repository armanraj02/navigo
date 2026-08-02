import React from "react";

export interface FPSCounterProps {
  show?: boolean;
}

export const FPSCounter: React.FC<FPSCounterProps> = ({ show = true }) => {
  if (!show) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-black/80 px-2 py-1 font-mono text-xs text-green-400 border border-green-500/20">
      FPS: 60
    </div>
  );
};
