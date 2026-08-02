"use client";

import React from "react";
import { useDriverStore } from "../DriverState";
import { Card } from "@/components/ui";

export const DriverNavigationPanel: React.FC = () => {
  const stopsCompleted = useDriverStore((s) => s.stopsCompleted);

  const direction =
    stopsCompleted % 3 === 1
      ? "right"
      : stopsCompleted % 3 === 2
      ? "left"
      : "straight";

  const navHint =
    direction === "right"
      ? "Prepare to turn right at intersection"
      : direction === "left"
      ? "Prepare to turn left toward next terminal"
      : "Continue straight on main corridor";

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex items-center justify-between gap-4 select-none">
      <div className="flex items-center gap-3">
        {/* Navigation Indicator Arrow icons */}
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0">
          {direction === "straight" && (
            <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {direction === "right" && (
            <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          )}
          {direction === "left" && (
            <svg className="w-6 h-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono font-bold">
            Lane Guidance
          </span>
          <span className="text-xs font-bold text-text-primary leading-tight mt-0.5">
            {navHint}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end shrink-0">
        <span className="text-sm font-extrabold text-blue-400 font-mono">50</span>
        <span className="text-[7px] text-text-muted font-mono uppercase">KM/H LIMIT</span>
      </div>
    </Card>
  );
};

DriverNavigationPanel.displayName = "DriverNavigationPanel";
export default DriverNavigationPanel;
