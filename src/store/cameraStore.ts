import { create } from "zustand";

export interface CameraState {
  target: [number, number, number];
  position: [number, number, number];
  zoom: number;
  mode: "orbit" | "fixed" | "cinematic";
  setTarget: (target: [number, number, number]) => void;
  setPosition: (position: [number, number, number]) => void;
  setZoom: (zoom: number) => void;
  setMode: (mode: "orbit" | "fixed" | "cinematic") => void;
}

export const useCameraStore = create<CameraState>((set) => ({
  target: [0, 0, 0],
  position: [0, 60, 100],
  zoom: 1,
  mode: "cinematic",
  setTarget: (target) => set({ target }),
  setPosition: (position) => set({ position }),
  setZoom: (zoom) => set({ zoom }),
  setMode: (mode) => set({ mode }),
}));
