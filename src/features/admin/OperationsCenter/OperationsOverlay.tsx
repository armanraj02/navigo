"use client";

import React from "react";
import { Button } from "@/components/ui";
import { useUIStore } from "@/store/uiStore";

interface OperationsOverlayProps {
  children: React.ReactNode;
}

export const OperationsOverlay: React.FC<OperationsOverlayProps> = ({ children }) => {
  const setView = useUIStore((state) => state.setView);

  return (
    <div className="absolute inset-0 z-15 flex flex-col justify-between p-4 pointer-events-none select-none overflow-hidden">
      {/* Header operations bar */}
      <div className="flex justify-between items-center w-full pointer-events-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => setView("landing")}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 flex items-center justify-center p-0"
            aria-label="Back to landing"
          >
            <svg
              className="w-4 h-4 text-text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <div className="flex flex-col">
            <span className="text-xs font-extrabold text-text-primary tracking-wide leading-none">
              Operations Control Center
            </span>
            <span className="text-[9px] text-text-muted font-mono uppercase tracking-wider mt-0.5">
              Admin Terminal Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[9px] font-bold text-white bg-blue-500/80 border border-blue-400/20 px-2.5 py-1 rounded-full font-mono uppercase">
            Supervisor Mode
          </span>
          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full font-mono uppercase animate-pulse">
            Terminal Live
          </span>
        </div>
      </div>

      {children}
    </div>
  );
};

OperationsOverlay.displayName = "OperationsOverlay";
export default OperationsOverlay;
