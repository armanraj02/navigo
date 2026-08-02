import SceneManager from "@/three/scene";
import { useCameraStore } from "@/store/cameraStore";
import { BusManager } from "@/three/simulation/BusManager";
import { BusStopManager } from "@/three/simulation/BusStopManager";
import { useUIStore } from "@/store/uiStore";

export class PassengerCoordinatorClass {
  private static instance: PassengerCoordinatorClass;
  private sceneManager: SceneManager;

  private constructor() {
    this.sceneManager = new SceneManager();
  }

  public static getInstance(): PassengerCoordinatorClass {
    if (!PassengerCoordinatorClass.instance) {
      PassengerCoordinatorClass.instance = new PassengerCoordinatorClass();
    }
    return PassengerCoordinatorClass.instance;
  }

  // Orchestrate Bus Selection
  public handleBusSelect(busId: string | null): void {
    this.sceneManager.selectBus(busId);
    if (busId) {
      const bus = BusManager.getBusById(busId);
      if (bus) {
        // UI -> PassengerCoordinator -> SceneManager -> NavigationEngine -> CameraController
        const cameraStore = useCameraStore.getState();
        cameraStore.setMode("fixed");
        
        // Target bus position directly
        this.sceneManager.cameraController.flyTo(
          [bus.position.x, 30, bus.position.z + 40],
          [bus.position.x, bus.position.y, bus.position.z],
          1.2,
          1000
        );
      }
    } else {
      this.resetCamera();
    }
  }

  // Orchestrate Stop Selection
  public handleStopSelect(stopId: string | null): void {
    this.sceneManager.selectStop(stopId);
    if (stopId) {
      const stop = BusStopManager.getStopById(stopId);
      if (stop) {
        const cameraStore = useCameraStore.getState();
        cameraStore.setMode("orbit");

        this.sceneManager.cameraController.flyTo(
          [stop.position[0], 25, stop.position[2] + 35],
          [stop.position[0], stop.position[1], stop.position[2]],
          1.4,
          1000
        );
      }
    } else {
      this.resetCamera();
    }
  }

  // Orchestrate Camera State Mode Changes
  public handleCameraModeChange(mode: "orbit" | "fixed" | "cinematic"): void {
    this.sceneManager.cameraController.setMode(mode);
  }

  // Orchestrate Route Spline Preview
  public handleRouteSelect(routeId: string | null): void {
    this.sceneManager.selectRoute(routeId);
  }

  // Standard camera view reset
  public resetCamera(): void {
    const cameraStore = useCameraStore.getState();
    cameraStore.setMode("cinematic");
    this.sceneManager.cameraController.flyTo([0, 60, 100], [0, 0, 0], 1.0, 1200);
  }

  // Exit passenger experience
  public exitToLanding(): void {
    this.sceneManager.selectBus(null);
    this.sceneManager.selectStop(null);
    this.sceneManager.selectRoute(null);
    const uiStore = useUIStore.getState();
    uiStore.setView("landing");
  }

  // Orchestrate Journey Spline Overview Focus
  public handleJourneyFocus(fromPos: [number, number, number], toPos: [number, number, number]): void {
    const midX = (fromPos[0] + toPos[0]) / 2;
    const midZ = (fromPos[2] + toPos[2]) / 2;
    this.sceneManager.cameraController.flyTo(
      [midX, 70, midZ + 55],
      [midX, 0, midZ],
      1.1,
      1100
    );
  }
}

export const PassengerCoordinator = PassengerCoordinatorClass.getInstance();
