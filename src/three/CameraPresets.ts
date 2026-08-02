export interface CameraPreset {
  position: [number, number, number];
  target: [number, number, number];
  zoom: number;
  mode: "orbit" | "fixed" | "cinematic";
  fov: number;
}

export const CameraPresets: Record<string, CameraPreset> = {
  landing: {
    position: [120, 80, 120],
    target: [0, 0, 0],
    zoom: 0.8,
    mode: "cinematic",
    fov: 45,
  },
  passenger: {
    position: [0, 60, 100],
    target: [0, 0, 0],
    zoom: 1.0,
    mode: "orbit",
    fov: 45,
  },
  driver: {
    position: [10, 8, 30],
    target: [10, 8, 0],
    zoom: 1.2,
    mode: "fixed",
    fov: 60,
  },
  admin: {
    position: [0, 150, 20],
    target: [0, 0, 0],
    zoom: 0.6,
    mode: "orbit",
    fov: 30,
  },
  tracking: {
    position: [15, 20, 45],
    target: [0, 0, 0],
    zoom: 1.3,
    mode: "fixed",
    fov: 50,
  },
  search: {
    position: [35, 25, 35],
    target: [20, 0, 20],
    zoom: 1.1,
    mode: "orbit",
    fov: 45,
  },
  settings: {
    position: [-60, 40, 80],
    target: [0, 0, 0],
    zoom: 0.9,
    mode: "fixed",
    fov: 45,
  },
};
