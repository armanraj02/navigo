import * as THREE from "three";
import { BusState } from "./BusPool";
import { MOCK_ROUTES, MOCK_STOPS } from "./DummyScheduleEngine";

export class BusPathFollowerClass {
  private static instance: BusPathFollowerClass;
  private routePaths: Map<string, THREE.Vector3[]> = new Map();

  private constructor() {
    this.buildPaths();
  }

  public static getInstance(): BusPathFollowerClass {
    if (!BusPathFollowerClass.instance) {
      BusPathFollowerClass.instance = new BusPathFollowerClass();
    }
    return BusPathFollowerClass.instance;
  }

  private buildPaths(): void {
    MOCK_ROUTES.forEach((route) => {
      const points = route.stopIds
        .map((sid) => MOCK_STOPS.find((s) => s.id === sid))
        .filter(Boolean)
        .map((s) => new THREE.Vector3(s!.position[0], s!.position[1] + 0.4, s!.position[2]));
      this.routePaths.set(route.id, points);
    });
  }

  public getPath(routeId: string): THREE.Vector3[] {
    return this.routePaths.get(routeId) ?? [];
  }

  public tick(bus: BusState, delta: number): void {
    const path = this.getPath(bus.routeId);
    if (path.length < 2) return;

    // Total path length approximation
    const totalPoints = path.length - 1;
    const progressPerSec = bus.speed / (totalPoints * 25);
    bus.progress = (bus.progress + progressPerSec * delta) % 1;

    // Interpolate position along path segments
    const rawIdx = bus.progress * totalPoints;
    const segIdx = Math.floor(rawIdx);
    const segFrac = rawIdx - segIdx;
    const clampedSeg = Math.min(segIdx, totalPoints - 1);

    const from = path[clampedSeg];
    const to = path[Math.min(clampedSeg + 1, path.length - 1)];

    if (!from || !to || isNaN(segFrac)) return;

    bus.position.lerpVectors(from, to, segFrac);

    // Face direction of travel
    const dir = new THREE.Vector3().subVectors(to, from);
    if (dir.lengthSq() > 0.001) {
      bus.rotation = Math.atan2(dir.x, dir.z);
    }
  }
}

export const BusPathFollower = BusPathFollowerClass.getInstance();
