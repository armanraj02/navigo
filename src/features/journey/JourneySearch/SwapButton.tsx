"use client";

import React from "react";
import { Button } from "@/components/ui";

interface SwapButtonProps {
  onSwap: () => void;
}

export const SwapButton: React.FC<SwapButtonProps> = ({ onSwap }) => {
  return (
    <Button
      variant="ghost"
      onClick={onSwap}
      aria-label="Swap origin and destination"
      className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center p-0 transition-transform active:scale-95 duration-200"
    >
      <svg
        className="w-4 h-4 text-text-secondary"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    </Button>
  );
};

SwapButton.displayName = "SwapButton";
export default SwapButton;
