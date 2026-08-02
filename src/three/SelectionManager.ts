import { SceneEvents } from "./SceneEvents";
import { useCameraStore } from "@/store/cameraStore";

export class SelectionManagerClass {
  private static instance: SelectionManagerClass;
  private selectedBusId: string | null = null;
  private selectedStopId: string | null = null;
  private selectedRouteId: string | null = null;

  private constructor() {}

  public static getInstance(): SelectionManagerClass {
    if (!SelectionManagerClass.instance) {
      SelectionManagerClass.instance = new SelectionManagerClass();
    }
    return SelectionManagerClass.instance;
  }

  public selectBus(busId: string | null): void {
    if (this.selectedBusId !== busId) {
      this.selectedBusId = busId;
      this.selectedStopId = null; // Clear other selections for focus
      SceneEvents.emit("BUS_SELECTED", busId);

      if (busId) {
        // Set camera mode and focus target (Simulation coords)
        const cameraStore = useCameraStore.getState();
        cameraStore.setMode("fixed");
        // Simulated bus location focus
        cameraStore.setTarget([15, 0, -20]);
      }
    }
  }

  public selectStop(stopId: string | null): void {
    if (this.selectedStopId !== stopId) {
      this.selectedStopId = stopId;
      this.selectedBusId = null;
      SceneEvents.emit("STOP_SELECTED", stopId);

      if (stopId) {
        const cameraStore = useCameraStore.getState();
        cameraStore.setMode("orbit");
        cameraStore.setTarget([35, 0, 10]);
      }
    }
  }

  public selectRoute(routeId: string | null): void {
    if (this.selectedRouteId !== routeId) {
      this.selectedRouteId = routeId;
      SceneEvents.emit("ROUTE_SELECTED", routeId);
    }
  }

  public getSelectedBusId(): string | null {
    return this.selectedBusId;
  }

  public getSelectedStopId(): string | null {
    return this.selectedStopId;
  }

  public getSelectedRouteId(): string | null {
    return this.selectedRouteId;
  }

  public clearAll(): void {
    this.selectBus(null);
    this.selectStop(null);
    this.selectRoute(null);
  }
}

export const SelectionManager = SelectionManagerClass.getInstance();
