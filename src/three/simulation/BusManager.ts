import { BusPool, BusState } from "./BusPool";
import { BusPathFollower } from "./BusPathFollower";
import { BusSpawner } from "./BusSpawner";
import { SceneEvents } from "../SceneEvents";

export class BusManagerClass {
  private static instance: BusManagerClass;
  private initialized = false;

  private constructor() {}

  public static getInstance(): BusManagerClass {
    if (!BusManagerClass.instance) {
      BusManagerClass.instance = new BusManagerClass();
    }
    return BusManagerClass.instance;
  }

  public init(): void {
    if (this.initialized) return;
    BusSpawner.spawnInitialBuses();
    this.initialized = true;
  }

  public tick(delta: number): void {
    const activeBuses = BusPool.getActive();
    activeBuses.forEach((bus) => {
      BusPathFollower.tick(bus, delta);
    });
  }

  public getAllBuses(): BusState[] {
    return BusPool.getActive();
  }

  public getBusById(id: string): BusState | undefined {
    return BusPool.getActive().find((b) => b.id === id);
  }

  public selectBus(busId: string): void {
    SceneEvents.emit("BUS_SELECTED", busId);
  }
}

export const BusManager = BusManagerClass.getInstance();
