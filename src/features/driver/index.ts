// Driver Cockpit Feature Module Barrel Exports

export interface DriverShift {
  shiftId: string;
  driverId: string;
  busId: string;
  routeId: string;
  isActive: boolean;
}

export const driverActions = {
  startShift: (driverId: string, busId: string, routeId: string): DriverShift => {
    return { shiftId: "shift_mock", driverId, busId, routeId, isActive: true };
  },
};

export * from "./DriverState";
export * from "./DriverCoordinator/DriverCoordinator";
export * from "./DriverHUD/DriverOverlay";
export * from "./DriverHUD/DriverHUD";
export * from "./DriverRoute/CurrentRoutePanel";
export * from "./DriverRoute/StopSequencePanel";
export * from "./DriverNavigation/DriverNavigationPanel";
export * from "./DriverIncidents/IncidentPanel";
export * from "./DriverAnalytics/DriverAnalytics";
export * from "./DriverCamera/DriverCameraModes";
export * from "./DriverSettings/DriverSettings";
export * from "./DriverExperience/DriverExperience";
