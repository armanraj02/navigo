import * as THREE from "three";
import { VehiclePool, VehicleState } from "./VehiclePool";
import { LaneFollower } from "./LaneFollower";
import { TrafficSignalSystem } from "./TrafficSignalSystem";

const VEHICLE_SPAWN_COUNT = 12;

export class TrafficManagerClass {
  private static instance: TrafficManagerClass;
  private initialized = false;

  private constructor() {}

  public static getInstance(): TrafficManagerClass {
    if (!TrafficManagerClass.instance) {
      TrafficManagerClass.instance = new TrafficManagerClass();
    }
    return TrafficManagerClass.instance;
  }

  public init(): void {
    if (this.initialized) return;
    this.spawnInitialTraffic();
    this.initialized = true;
  }

  private spawnInitialTraffic(): void {
    const types: VehicleState["type"][] = ["car", "car", "van", "car", "car", "emergency"];
    for (let i = 0; i < VEHICLE_SPAWN_COUNT; i++) {
      const type = types[i % types.length];
      const startPos = new THREE.Vector3(
        (Math.random() - 0.5) * 80,
        0.3,
        (Math.random() - 0.5) * 80
      );
      const vehicle = VehiclePool.acquire(type, startPos);
      LaneFollower.assignLane(vehicle.id);
    }
  }

  public tick(delta: number): void {
    const vehicles = VehiclePool.getActive();
    vehicles.forEach((v) => LaneFollower.tick(v, delta));
    TrafficSignalSystem.tick(delta);
  }

  public getAllVehicles(): VehicleState[] {
    return VehiclePool.getActive();
  }
}

export const TrafficManager = TrafficManagerClass.getInstance();
