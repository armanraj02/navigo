import { BusPool, BusState } from "./BusPool";
import { BusPathFollower } from "./BusPathFollower";
import { MOCK_ROUTES } from "./DummyScheduleEngine";

const BUSES_PER_ROUTE = 2;

export class BusSpawnerClass {
  private static instance: BusSpawnerClass;

  private constructor() {}

  public static getInstance(): BusSpawnerClass {
    if (!BusSpawnerClass.instance) {
      BusSpawnerClass.instance = new BusSpawnerClass();
    }
    return BusSpawnerClass.instance;
  }

  public spawnInitialBuses(): BusState[] {
    const spawned: BusState[] = [];
    MOCK_ROUTES.forEach((route) => {
      for (let i = 0; i < BUSES_PER_ROUTE; i++) {
        const bus = BusPool.acquire(route.id);
        // Stagger starting progress so buses aren't bunched
        bus.progress = i / BUSES_PER_ROUTE;
        // Fast-forward position to staggered starting point
        BusPathFollower.tick(bus, 0);
        spawned.push(bus);
      }
    });
    return spawned;
  }

  public despawnBus(busId: string): void {
    BusPool.release(busId);
  }
}

export const BusSpawner = BusSpawnerClass.getInstance();
