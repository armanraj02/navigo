// Admin feature module barrel exports

export interface AdminMetrics {
  totalActiveBuses: number;
  totalActiveRoutes: number;
  onTimePerformance: number;
  totalDailyPassengers: number;
}

export const getAdminMetrics = (): AdminMetrics => {
  return {
    totalActiveBuses: 0,
    totalActiveRoutes: 0,
    onTimePerformance: 100.0,
    totalDailyPassengers: 0,
  };
};

export * from "./AdminState";
export * from "./AdminCoordinator/AdminCoordinator";
export * from "./OperationsCenter/OperationsOverlay";
export * from "./OperationsCenter/OperationsHUD";
export * from "./FleetMonitoring/FleetMapPanel";
export * from "./FleetMonitoring/FleetStatusGrid";
export * from "./IncidentCenter/IncidentQueue";
export * from "./NetworkAnalytics/NetworkAnalytics";
export * from "./MaintenanceCenter/MaintenanceCenter";
export * from "./SimulationControl/SimulationControl";
export * from "./AdminCamera/AdminCameraModes";
export * from "./Reports/Reports";
export * from "./AdminExperience/AdminExperience";
