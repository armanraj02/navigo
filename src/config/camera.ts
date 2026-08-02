export interface CameraConfig {
  defaultAltitude: number;
  defaultZoom: number;
  minDistance: number;
  maxDistance: number;
  speed: number;
  rotationSpeed: number;
  dampingFactor: number;
   cinematicHeight: number;
  cinematicRadius: number;
}

export const cameraConfig: CameraConfig = {
  defaultAltitude: 60.0,
  defaultZoom: 1.0,
  minDistance: 10.0,
  maxDistance: 150.0,
  speed: 2.5,
  rotationSpeed: 0.05,
  dampingFactor: 0.05,
  cinematicHeight: 80.0,
  cinematicRadius: 100.0,
};
