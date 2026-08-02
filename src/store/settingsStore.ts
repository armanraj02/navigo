import { create } from "zustand";

export interface SettingsState {
  graphicsQuality: "low" | "medium" | "high";
  enableAudio: boolean;
  enablePostProcessing: boolean;
  setGraphicsQuality: (quality: "low" | "medium" | "high") => void;
  setEnableAudio: (enabled: boolean) => void;
  setEnablePostProcessing: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  graphicsQuality: "high",
  enableAudio: false,
  enablePostProcessing: true,
  setGraphicsQuality: (graphicsQuality) => set({ graphicsQuality }),
  setEnableAudio: (enableAudio) => set({ enableAudio }),
  setEnablePostProcessing: (enablePostProcessing) => set({ enablePostProcessing }),
}));
