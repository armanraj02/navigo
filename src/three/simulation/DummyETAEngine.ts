import { MOCK_STOPS, MOCK_ROUTES } from "./DummyScheduleEngine";

export interface ETAResult {
  routeId: string;
  routeName: string;
  routeColor: string;
  stopId: string;
  stopName: string;
  etaMinutes: number;
}

export class DummyETAEngineClass {
  private static instance: DummyETAEngineClass;

  private constructor() {}

  public static getInstance(): DummyETAEngineClass {
    if (!DummyETAEngineClass.instance) {
      DummyETAEngineClass.instance = new DummyETAEngineClass();
    }
    return DummyETAEngineClass.instance;
  }

  // Returns simulated ETAs for a given stop, driven by current sim minute
  public getETAsForStop(stopId: string, currentMinute: number): ETAResult[] {
    const stop = MOCK_STOPS.find((s) => s.id === stopId);
    if (!stop) return [];

    return stop.routeIds.map((routeId) => {
      const route = MOCK_ROUTES.find((r) => r.id === routeId);
      if (!route) return null;

      // Deterministic ETA based on headway and current minute
      const phase = currentMinute % route.headwayMinutes;
      const etaMinutes = (route.headwayMinutes - phase) % route.headwayMinutes || route.headwayMinutes;

      return {
        routeId: route.id,
        routeName: route.name,
        routeColor: route.color,
        stopId,
        stopName: stop.name,
        etaMinutes: Math.round(etaMinutes),
      };
    }).filter(Boolean) as ETAResult[];
  }

  public formatETA(minutes: number): string {
    if (minutes <= 1) return "Due";
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }
}

export const DummyETAEngine = DummyETAEngineClass.getInstance();
