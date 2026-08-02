import { CameraController } from "../camera";
import { EnvironmentManager } from "../environment";
import { LightingManager } from "../lighting";
import { NavigationEngine } from "../NavigationEngine";
import { SelectionManager } from "../SelectionManager";
import { SceneState } from "../SceneState";
import { SceneEvents } from "../SceneEvents";

export class SceneManager {
  public cameraController: CameraController;
  public environmentManager: EnvironmentManager;
  public lightingManager: LightingManager;
  private initialized = false;

  constructor() {
    this.cameraController = new CameraController();
    this.environmentManager = new EnvironmentManager();
    this.lightingManager = new LightingManager();
  }

  public init(): void {
    this.initialized = true;
    SceneEvents.emit("VIEW_CHANGED", "landing");
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  // NavigationEngine View transition routing
  public async setView(viewId: string): Promise<void> {
    await NavigationEngine.navigateTo(viewId);
  }

  // SelectionManager hooks
  public selectBus(busId: string | null): void {
    SelectionManager.selectBus(busId);
  }

  public selectStop(stopId: string | null): void {
    SelectionManager.selectStop(stopId);
  }

  public selectRoute(routeId: string | null): void {
    SelectionManager.selectRoute(routeId);
  }

  // SceneState Theme toggler
  public toggleNightMode(): void {
    const isNight = SceneState.getNightMode();
    SceneState.setNightMode(!isNight);
  }

  public focusBus(busId: string): void {
    this.selectBus(busId);
  }

  public focusStop(stopId: string): void {
    this.selectStop(stopId);
  }

  public resetCamera(): void {
    const config = NavigationEngine.getCurrentView();
    if (config) {
      const preset = config.cameraPreset;
      this.cameraController.flyTo(preset.position, preset.target, preset.zoom, 1000);
    }
  }
}
export default SceneManager;
