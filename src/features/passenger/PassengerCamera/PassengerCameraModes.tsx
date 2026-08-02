"use client";

import React from "react";
import { useCameraStore } from "@/store/cameraStore";
import { PassengerCoordinator } from "../PassengerCoordinator/PassengerCoordinator";

export const PassengerCameraModes: React.FC = () => {
  const currentMode = useCameraStore((s) => s.mode);

  const modes: Array<"orbit" | "fixed" | "cinematic"> = ["orbit", "fixed", "cinematic"];

  return (
    <div className="flex gap-1.5 p-1 bg-white/5 border border-white/5 rounded-xl backdrop-blur select-none">
      {modes.map((m) => {
        const isActive = currentMode === m;
        return (
          <button
            key={m}
            onClick={() => PassengerCoordinator.handleCameraModeChange(m)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase font-mono transition-all ${
              isActive
                ? "bg-blue-500 text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-white/5"
            }`}
          >
            {m}
          </button>
        );
      })}
    </div>
  );
};

PassengerCameraModes.displayName = "PassengerCameraModes";
export default PassengerCameraModes;
