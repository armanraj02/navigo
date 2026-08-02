"use client";

import React, { useEffect, useState } from "react";
import { WorldClock } from "@/three/simulation/WorldClock";

export const TimeChip: React.FC = () => {
  const [timeStr, setTimeStr] = useState("08:00");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeStr(WorldClock.formatTime());
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-text-secondary select-none font-mono">
      <svg
        className="w-3.5 h-3.5 text-blue-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{timeStr}</span>
    </div>
  );
};

TimeChip.displayName = "TimeChip";
export default TimeChip;
