import { MOCK_ROUTES } from "@/three/simulation/DummyScheduleEngine";
import type { LiveBusData, LiveRouteData } from "./TransitTypes";

export const LiveRouteTracker = {
  aggregate: (routeId: string, buses: LiveBusData[]): LiveRouteData => {
    const route = MOCK_ROUTES.find((r) => r.id === routeId);
    const routeName = route?.name ?? "Unknown Route";
    const routeColor = route?.color ?? "#94a3b8";

    const activeBuses = buses.filter((b) => b.routeId === routeId);
    const totalDelay = activeBuses.reduce((acc, curr) => acc + curr.delayMinutes, 0);
    const averageDelay = activeBuses.length > 0 ? totalDelay / activeBuses.length : 0;

    let status: "on-time" | "delayed" | "disrupted" = "on-time";
    if (averageDelay > 8) {
      status = "disrupted";
    } else if (averageDelay > 3) {
      status = "delayed";
    }

    return {
      routeId,
      routeName,
      routeColor,
      busesActive: activeBuses.length,
      averageDelayMinutes: Math.round(averageDelay * 10) / 10,
      status,
    };
  },
};
