import { ViewRegistry, ViewConfig } from "./ViewRegistry";
import { CameraController } from "./camera";
import { SceneEvents } from "./SceneEvents";
import { useUIStore } from "@/store/uiStore";

export class NavigationEngineClass {
  private static instance: NavigationEngineClass;
  private cameraController: CameraController;
  private currentViewId: string = "loading";

  private constructor() {
    this.cameraController = new CameraController();
  }

  public static getInstance(): NavigationEngineClass {
    if (!NavigationEngineClass.instance) {
      NavigationEngineClass.instance = new NavigationEngineClass();
    }
    return NavigationEngineClass.instance;
  }

  public async navigateTo(viewId: string): Promise<void> {
    const config = ViewRegistry.getView(viewId);
    if (!config) {
      console.warn(`View ID [${viewId}] is not registered in ViewRegistry.`);
      return;
    }

    if (this.currentViewId === viewId) return;

    this.currentViewId = viewId;
    SceneEvents.emit("VIEW_CHANGED", viewId);

    // Apply overlay layouts
    const uiStore = useUIStore.getState();
    uiStore.setSidebarOpen(config.overlayConfig.sidebarVisible);
    
    // Animate camera to the target coordinates preset
    const preset = config.cameraPreset;
    this.cameraController.setMode(preset.mode);
    
    await this.cameraController.flyTo(
      preset.position,
      preset.target,
      preset.zoom,
      1500 // duration in ms
    );
  }

  public getCurrentView(): ViewConfig | undefined {
    return ViewRegistry.getView(this.currentViewId);
  }

  public getCurrentViewId(): string {
    return this.currentViewId;
  }
}

export const NavigationEngine = NavigationEngineClass.getInstance();
