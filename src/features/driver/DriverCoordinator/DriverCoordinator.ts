import { SimulationClock } from "@/three/simulation/SimulationClock";
import { BusManager } from "@/three/simulation/BusManager";
import { useDriverStore } from "../DriverState";
import { useTransitStore } from "@/features/transit/TrackingEngine/TransitStore";
import { PassengerCoordinator } from "@/features/passenger/PassengerCoordinator/PassengerCoordinator";
import { BusState } from "@/three/simulation/BusPool";

export class DriverCoordinatorClass {
  private static instance: DriverCoordinatorClass;
  private unsubscribe: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): DriverCoordinatorClass {
    if (!DriverCoordinatorClass.instance) {
      DriverCoordinatorClass.instance = new DriverCoordinatorClass();
    }
    return DriverCoordinatorClass.instance;
  }

  public start(): void {
    if (this.unsubscribe) return;

    this.unsubscribe = SimulationClock.subscribe((delta) => {
      const store = useDriverStore.getState();
      const busId = store.activeBusId;
      if (!busId) return;

      const bus = BusManager.getBusById(busId);
      if (!bus) return;

      const transitStore = useTransitStore.getState();
      const liveData = transitStore.liveBuses[busId];

      const speedKmh = liveData ? liveData.speedKmh : Math.round(bus.speed * 3.6);
      const delay = liveData ? liveData.delayMinutes : 0;
      const occupancyVal = liveData ? Math.round(liveData.occupancy * 45) : 12;

      // Increment stats
      const distanceDelta = (bus.speed * delta) / 1000;
      store.updateTelemetry(
        speedKmh,
        delay,
        occupancyVal,
        bus.currentStopIdx,
        distanceDelta
      );
      store.tickDuration(delta);

      // Perform camera locking to follow the driving bus position
      this.updateCameraLock(bus, store.cameraMode);
    });
  }

  public stop(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  public setCameraMode(mode: "cockpit" | "follow" | "orbit" | "top" | "intersection" | "depot"): void {
    useDriverStore.getState().setCameraMode(mode);
    const busId = useDriverStore.getState().activeBusId;
    if (busId) {
      const bus = BusManager.getBusById(busId);
      if (bus) {
        this.updateCameraLock(bus, mode);
      }
    }
  }

  private updateCameraLock(bus: BusState, mode: "cockpit" | "follow" | "orbit" | "top" | "intersection" | "depot"): void {
    const cameraController = PassengerCoordinator["sceneManager"].cameraController;
    const rot = bus.rotation; // Y-axis radians

    let pos: [number, number, number] = [0, 60, 100];
    let target: [number, number, number] = [0, 0, 0];

    // Recalculate camera positions based on bus rotation heading
    if (mode === "cockpit") {
      // Positioned just behind/above driver viewpoint
      pos = [
        bus.position.x - Math.sin(rot) * 5,
        4.5,
        bus.position.z - Math.cos(rot) * 5,
      ];
      // Target points forward in heading direction
      target = [
        bus.position.x + Math.sin(rot) * 15,
        2.5,
        bus.position.z + Math.cos(rot) * 15,
      ];
      PassengerCoordinator.handleCameraModeChange("fixed");
      cameraController.lookAt(...target);
      // Fast flyTo with minimal duration to avoid delay lag
      cameraController.flyTo(pos, target, 1.2, 50);
    } else if (mode === "follow") {
      // Positioned further back and higher for third-person follow view
      pos = [
        bus.position.x - Math.sin(rot) * 16,
        10,
        bus.position.z - Math.cos(rot) * 16,
      ];
      target = [
        bus.position.x,
        bus.position.y + 1,
        bus.position.z,
      ];
      PassengerCoordinator.handleCameraModeChange("fixed");
      cameraController.lookAt(...target);
      cameraController.flyTo(pos, target, 1.0, 50);
    } else if (mode === "orbit") {
      PassengerCoordinator.handleCameraModeChange("orbit");
    } else if (mode === "top") {
      // High bird's eye view
      pos = [bus.position.x, 50, bus.position.z];
      target = [bus.position.x, bus.position.y, bus.position.z];
      PassengerCoordinator.handleCameraModeChange("fixed");
      cameraController.flyTo(pos, target, 1.0, 100);
    } else if (mode === "intersection") {
      // Main central city intersection viewpoint
      pos = [15, 25, 30];
      target = [0, 0, 0];
      PassengerCoordinator.handleCameraModeChange("fixed");
      cameraController.flyTo(pos, target, 1.1, 800);
    } else if (mode === "depot") {
      // Focus stop 01
      pos = [0, 20, 25];
      target = [0, 0, 0];
      PassengerCoordinator.handleCameraModeChange("fixed");
      cameraController.flyTo(pos, target, 1.0, 800);
    }
  }
}

export const DriverCoordinator = DriverCoordinatorClass.getInstance();
