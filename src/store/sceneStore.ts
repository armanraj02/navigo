import { create } from "zustand";

export interface SceneState {
  timeOfDay: number; // 0 to 24 hours
  weather: "sunny" | "cloudy" | "foggy" | "rainy";
  fogDensity: number;
  isNightMode: boolean;
  setTimeOfDay: (time: number) => void;
  setWeather: (weather: "sunny" | "cloudy" | "foggy" | "rainy") => void;
  setFogDensity: (density: number) => void;
  toggleNightMode: () => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  timeOfDay: 12.0,
  weather: "sunny",
  fogDensity: 0.005,
  isNightMode: false,
  setTimeOfDay: (timeOfDay) => set({ timeOfDay }),
  setWeather: (weather) => set({ weather }),
  setFogDensity: (fogDensity) => set({ fogDensity }),
  toggleNightMode: () => set((state) => ({ isNightMode: !state.isNightMode })),
}));
