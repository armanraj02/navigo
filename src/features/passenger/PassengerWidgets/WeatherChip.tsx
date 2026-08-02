"use client";

import React from "react";
import { useSceneStore } from "@/store/sceneStore";

export const WeatherChip: React.FC = () => {
  const weather = useSceneStore((s) => s.weather);

  const icons: Record<string, string> = {
    sunny: "☀️",
    cloudy: "☁️",
    foggy: "🌫️",
    rainy: "🌧️",
  };

  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/5 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-text-secondary select-none font-mono">
      <span>{icons[weather] ?? "☀️"}</span>
      <span className="capitalize">{weather}</span>
    </div>
  );
};

WeatherChip.displayName = "WeatherChip";
export default WeatherChip;
