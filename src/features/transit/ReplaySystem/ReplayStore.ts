import { create } from "zustand";

export interface ReplayState {
  isPlaying: boolean;
  progress: number; // 0.0 - 1.0
  speed: 1 | 2 | 5;
  selectedRouteId: string | null;
  replayPath: [number, number, number][];

  setPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setSpeed: (speed: 1 | 2 | 5) => void;
  setRoute: (routeId: string | null, path: [number, number, number][]) => void;
  resetReplay: () => void;
}

export const useReplayStore = create<ReplayState>((set) => ({
  isPlaying: false,
  progress: 0.0,
  speed: 1,
  selectedRouteId: null,
  replayPath: [],

  setPlaying: (isPlaying) => set({ isPlaying }),
  setProgress: (progress) => set({ progress }),
  setSpeed: (speed) => set({ speed }),
  setRoute: (selectedRouteId, replayPath) => set({ selectedRouteId, replayPath, progress: 0.0 }),
  resetReplay: () => set({ progress: 0.0, isPlaying: false, speed: 1 }),
}));
