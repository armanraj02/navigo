// Common Shared Type Definitions for Navigo
export type EntityId = string;

export interface Coordinates2D {
  x: number;
  y: number;
}

export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export type ThemeMode = "dark" | "light" | "system";
export type QualityPreset = "low" | "medium" | "high";
export type AlertSeverity = "info" | "warning" | "error";
export type VehicleType = "bus" | "car";
