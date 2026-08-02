export interface DashboardConfig {
  passengerRefreshInterval: number;
  driverRefreshInterval: number;
  adminRefreshInterval: number;
  maxNotificationsCount: number;
}

export const dashboardConfig: DashboardConfig = {
  passengerRefreshInterval: 5000,
  driverRefreshInterval: 2000,
  adminRefreshInterval: 10000,
  maxNotificationsCount: 50,
};
