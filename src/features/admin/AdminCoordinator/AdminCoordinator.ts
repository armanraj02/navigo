import { SimulationClock } from "@/three/simulation/SimulationClock";
import { WorldClock } from "@/three/simulation/WorldClock";
import { SceneState } from "@/three/SceneState";
import { useAdminStore } from "../AdminState";
import { PassengerCoordinator } from "@/features/passenger/PassengerCoordinator/PassengerCoordinator";

export class AdminCoordinatorClass {
  private static instance: AdminCoordinatorClass;

  private constructor() {}

  public static getInstance(): AdminCoordinatorClass {
    if (!AdminCoordinatorClass.instance) {
      AdminCoordinatorClass.instance = new AdminCoordinatorClass();
    }
    return AdminCoordinatorClass.instance;
  }

  public setPaused(isPaused: boolean): void {
    useAdminStore.getState().setPaused(isPaused);
    if (isPaused) {
      SimulationClock.stop();
    } else {
      SimulationClock.start();
    }
  }

  public setSpeed(speed: number): void {
    useAdminStore.getState().setSpeed(speed);
    WorldClock.setSpeed(speed);
  }

  public setWeather(weather: "clear" | "rain" | "fog"): void {
    useAdminStore.getState().setWeather(weather);
    if (weather === "rain") {
      SceneState.setWeather("rainy");
      SceneState.setFogDensity(0.015);
    } else if (weather === "fog") {
      SceneState.setWeather("foggy");
      SceneState.setFogDensity(0.08);
    } else {
      SceneState.setWeather("sunny");
      SceneState.setFogDensity(0.0);
    }
  }

  public toggleNightMode(isNight: boolean): void {
    useAdminStore.getState().setNightMode(isNight);
    SceneState.setNightMode(isNight);
  }

  // Camera views
  public focusCityOverview(): void {
    PassengerCoordinator.resetCamera();
  }

  public focusDepot(): void {
    const cameraController = PassengerCoordinator["sceneManager"].cameraController;
    PassengerCoordinator.handleCameraModeChange("fixed");
    cameraController.flyTo([10, 20, 30], [0, 0, 0], 1.0, 1000);
  }

  public focusVehicle(busId: string): void {
    useAdminStore.getState().selectVehicle(busId);
    PassengerCoordinator.handleBusSelect(busId);
  }

  public clearVehicleFocus(): void {
    useAdminStore.getState().selectVehicle(null);
    PassengerCoordinator.handleBusSelect(null);
  }
}

export const AdminCoordinator = AdminCoordinatorClass.getInstance();
