export interface MockBusResponse {
  id: string;
  speed: number;
  latitude: number;
  longitude: number;
  occupancy: number;
}

export interface MockRouteResponse {
  routeId: string;
  routeName: string;
  waypoints: [number, number][];
}

export const generateMockBuses = (): MockBusResponse[] => {
  return [];
};

export const generateMockRoutes = (): MockRouteResponse[] => {
  return [];
};
