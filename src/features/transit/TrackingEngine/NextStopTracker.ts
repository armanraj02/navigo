import { MOCK_ROUTES, MOCK_STOPS, BusStop } from "@/three/simulation/DummyScheduleEngine";

export const NextStopTracker = {
  getNextStop: (routeId: string, currentStopIdx: number): BusStop => {
    const route = MOCK_ROUTES.find((r) => r.id === routeId);
    if (!route || route.stopIds.length === 0) {
      return MOCK_STOPS[0];
    }
    const nextIdx = (currentStopIdx + 1) % route.stopIds.length;
    const nextStopId = route.stopIds[nextIdx];
    return MOCK_STOPS.find((s) => s.id === nextStopId) || MOCK_STOPS[0];
  },
};
