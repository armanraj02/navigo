// Real-Time Transit Intelligence Type Definitions

export type DelayStatus = "Early" | "On Time" | "Minor Delay" | "Major Delay";

export type OccupancyLevel = "empty" | "low" | "moderate" | "high" | "crowded";

export type NotificationPriority = "low" | "medium" | "high" | "critical";

export interface LiveBusData {
  id: string;
  routeId: string;
  routeColor: string;
  position: [number, number, number];
  rotation: number;
  speedKmh: number;
  currentStopId: string;
  currentStopName: string;
  nextStopId: string;
  nextStopName: string;
  etaMinutes: number;
  delayMinutes: number;
  delayStatus: DelayStatus;
  occupancy: number; // 0.0 - 1.0
  occupancyLevel: OccupancyLevel;
  healthStatus: "good" | "warning" | "critical";
}

export interface LiveRouteData {
  routeId: string;
  routeName: string;
  routeColor: string;
  busesActive: number;
  averageDelayMinutes: number;
  status: "on-time" | "delayed" | "disrupted";
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  timestamp: string; // HH:MM
}

export interface AnalyticsSnapshot {
  activeBusesCount: number;
  averageDelayMinutes: number;
  averageOccupancyPercent: number;
  networkStatus: "Nominal" | "Degraded" | "Disrupted";
  simulationSpeed: number;
}

export type CameraTrackingMode = "FollowBus" | "FollowRoute" | "TopView" | "Intersection" | "Destination";
