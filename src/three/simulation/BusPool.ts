import * as THREE from "three";
import { MOCK_ROUTES, MOCK_STOPS } from "./DummyScheduleEngine";

export interface BusState {
  id: string;
  routeId: string;
  routeColor: string;
  position: THREE.Vector3;
  rotation: number; // Y-axis radians
  progress: number; // 0–1 along route path
  speed: number;
  isActive: boolean;
  currentStopIdx: number;
  nextStopId: string;
}

// Generate stop positions as Vector3 for path following (exported for future route preview use)
export function buildRoutePath(routeId: string): THREE.Vector3[] {
  const route = MOCK_ROUTES.find((r) => r.id === routeId);
  if (!route) return [];
  return route.stopIds
    .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
    .filter(Boolean)
    .map((s) => new THREE.Vector3(...(s!.position)));
}

export class BusPoolClass {
  private static instance: BusPoolClass;
  private buses: BusState[] = [];
  private counter = 0;

  private constructor() {}

  public static getInstance(): BusPoolClass {
    if (!BusPoolClass.instance) {
      BusPoolClass.instance = new BusPoolClass();
    }
    return BusPoolClass.instance;
  }

  public acquire(routeId: string): BusState {
    const route = MOCK_ROUTES.find((r) => r.id === routeId);
    const color = route?.color ?? "#ffffff";
    const firstStop = route?.stopIds[0] ?? "STOP-01";
    const firstStopData = MOCK_STOPS.find((s) => s.id === firstStop);
    const pos = firstStopData
      ? new THREE.Vector3(...firstStopData.position)
      : new THREE.Vector3(0, 0.5, 0);

    const bus: BusState = {
      id: `BUS-${String(++this.counter).padStart(3, "0")}`,
      routeId,
      routeColor: color,
      position: pos.clone(),
      rotation: 0,
      progress: 0,
      speed: 8 + Math.random() * 4, // 8–12 units/sec
      isActive: true,
      currentStopIdx: 0,
      nextStopId: route?.stopIds[1] ?? firstStop,
    };
    this.buses.push(bus);
    return bus;
  }

  public release(busId: string): void {
    const bus = this.buses.find((b) => b.id === busId);
    if (bus) bus.isActive = false;
  }

  public getActive(): BusState[] {
    return this.buses.filter((b) => b.isActive);
  }
}

export const BusPool = BusPoolClass.getInstance();
