export interface VehicleInstance {
  id: string;
  type: "bus" | "car";
  position: [number, number, number];
  rotation: number;
}

export class VehiclesLayer {
  private activeVehicles: Map<string, VehicleInstance> = new Map();

  public updateVehicle(id: string, vehicle: VehicleInstance): void {
    this.activeVehicles.set(id, vehicle);
  }

  public removeVehicle(id: string): void {
    this.activeVehicles.delete(id);
  }

  public getVehicles(): VehicleInstance[] {
    return Array.from(this.activeVehicles.values());
  }
}
