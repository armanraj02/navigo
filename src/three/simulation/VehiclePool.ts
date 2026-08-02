import * as THREE from "three";

export interface VehicleState {
  id: string;
  type: "car" | "van" | "emergency";
  position: THREE.Vector3;
  rotation: number;
  speed: number;
  laneOffset: number;
  pathProgress: number;
  isActive: boolean;
}

export class VehiclePoolClass {
  private static instance: VehiclePoolClass;
  private vehicles: VehicleState[] = [];
  private counter = 0;

  private constructor() {}

  public static getInstance(): VehiclePoolClass {
    if (!VehiclePoolClass.instance) {
      VehiclePoolClass.instance = new VehiclePoolClass();
    }
    return VehiclePoolClass.instance;
  }

  public acquire(
    type: VehicleState["type"],
    startPos: THREE.Vector3
  ): VehicleState {
    const id = `VEH-${String(++this.counter).padStart(4, "0")}`;
    const vehicle: VehicleState = {
      id,
      type,
      position: startPos.clone(),
      rotation: 0,
      speed: type === "van" ? 5 : type === "emergency" ? 14 : 7 + Math.random() * 4,
      laneOffset: (Math.random() - 0.5) * 2,
      pathProgress: Math.random(),
      isActive: true,
    };
    this.vehicles.push(vehicle);
    return vehicle;
  }

  public release(vehicleId: string): void {
    const v = this.vehicles.find((v) => v.id === vehicleId);
    if (v) v.isActive = false;
  }

  public getActive(): VehicleState[] {
    return this.vehicles.filter((v) => v.isActive);
  }
}

export const VehiclePool = VehiclePoolClass.getInstance();
