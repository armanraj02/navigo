import { create } from "zustand";

export type HeatMapType = "density" | "demand" | "buses";

export interface HeatMapState {
  enabled: boolean;
  activeLayer: HeatMapType;
  setEnabled: (enabled: boolean) => void;
  setActiveLayer: (layer: HeatMapType) => void;
}

export const useHeatMapStore = create<HeatMapState>((set) => ({
  enabled: false,
  activeLayer: "density",
  setEnabled: (enabled) => set({ enabled }),
  setActiveLayer: (activeLayer) => set({ activeLayer }),
}));
