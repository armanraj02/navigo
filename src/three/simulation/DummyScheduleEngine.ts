export interface BusStop {
  id: string;
  name: string;
  position: [number, number, number];
  routeIds: string[];
}

export interface BusRoute {
  id: string;
  name: string;
  color: string;
  stopIds: string[];
  headwayMinutes: number;
}

export interface Departure {
  routeId: string;
  stopId: string;
  departureMinute: number; // within the day (0–1439)
}

export const MOCK_STOPS: BusStop[] = [
  { id: "STOP-01", name: "City Center",      position: [0, 0.1, 0],    routeIds: ["R42", "R7"] },
  { id: "STOP-02", name: "University Gate",  position: [40, 0.1, -20], routeIds: ["R42"] },
  { id: "STOP-03", name: "Market Square",    position: [-30, 0.1, 25], routeIds: ["R15", "R7"] },
  { id: "STOP-04", name: "Industrial Park",  position: [60, 0.1, 50],  routeIds: ["R15"] },
  { id: "STOP-05", name: "Airport Terminal", position: [-70, 0.1, -60],routeIds: ["R7"] },
  { id: "STOP-06", name: "Waterfront",       position: [30, 0.1, 70],  routeIds: ["R42", "R15"] },
];

export const MOCK_ROUTES: BusRoute[] = [
  { id: "R42", name: "City – University",    color: "#0071e3", stopIds: ["STOP-01","STOP-02","STOP-06"], headwayMinutes: 10 },
  { id: "R7",  name: "Airport – Downtown",   color: "#00e3a5", stopIds: ["STOP-05","STOP-03","STOP-01"], headwayMinutes: 15 },
  { id: "R15", name: "Residential – Industrial", color: "#f59e0b", stopIds: ["STOP-03","STOP-06","STOP-04"], headwayMinutes: 12 },
];

export class DummyScheduleEngineClass {
  private static instance: DummyScheduleEngineClass;
  private departures: Departure[] = [];

  private constructor() {
    this.generateSchedules();
  }

  public static getInstance(): DummyScheduleEngineClass {
    if (!DummyScheduleEngineClass.instance) {
      DummyScheduleEngineClass.instance = new DummyScheduleEngineClass();
    }
    return DummyScheduleEngineClass.instance;
  }

  private generateSchedules(): void {
    // Generate hourly departures for each route from first stop, 06:00–22:00
    MOCK_ROUTES.forEach((route) => {
      const firstStop = route.stopIds[0];
      for (let min = 360; min < 1320; min += route.headwayMinutes) {
        this.departures.push({
          routeId: route.id,
          stopId: firstStop,
          departureMinute: min,
        });
      }
    });
  }

  public getUpcomingDepartures(fromMinute: number, count = 5): Departure[] {
    const upcoming = this.departures.filter(
      (d) => d.departureMinute >= fromMinute
    );
    // Wrap around for looping schedules
    const wrapped = this.departures.filter((d) => d.departureMinute < fromMinute);
    return [...upcoming, ...wrapped].slice(0, count);
  }

  public getDeparturesForStop(stopId: string, fromMinute: number, count = 3): Departure[] {
    return this.getUpcomingDepartures(fromMinute, 50).filter(
      (d) => d.stopId === stopId
    ).slice(0, count);
  }
}

export const DummyScheduleEngine = DummyScheduleEngineClass.getInstance();
