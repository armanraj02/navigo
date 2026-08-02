import { AssetPreloader, AssetFile } from "./AssetPreloader";
import { SceneEvents } from "./SceneEvents";
import { useUIStore } from "@/store/uiStore";

export class SceneLifecycleManager {
  private static instance: SceneLifecycleManager;
  private currentStage: "idle" | "preloading" | "initializing" | "running" = "idle";

  private constructor() {}

  public static getInstance(): SceneLifecycleManager {
    if (!SceneLifecycleManager.instance) {
      SceneLifecycleManager.instance = new SceneLifecycleManager();
    }
    return SceneLifecycleManager.instance;
  }

  // Prepares queue registry
  public registerInitialAssets(): void {
    const defaultAssets: AssetFile[] = [
      { id: "bus-model", url: "/models/buses/standard.glb", type: "glb" },
      { id: "sky-env", url: "/hdri/default.hdr", type: "hdri" },
      { id: "road-texture", url: "/textures/asphalt.png", type: "texture" },
    ];
    AssetPreloader.registerBatch(defaultAssets);
  }

  public async startPreload(onProgress?: (progress: number) => void): Promise<void> {
    if (this.currentStage !== "idle") return;
    this.currentStage = "preloading";

    this.registerInitialAssets();
    await AssetPreloader.preloadAll(onProgress);

    await this.initializeEngine();
  }

  private async initializeEngine(): Promise<void> {
    this.currentStage = "initializing";
    SceneEvents.emit("TRANSITION_STARTED");

    // Prepares canvas references and scene Managers
    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    this.currentStage = "running";
    SceneEvents.emit("TRANSITION_COMPLETED");
    
    // Automatically transition UI from loading to active passenger views
    const uiStore = useUIStore.getState();
    uiStore.setView("passenger");
  }

  public getStage(): string {
    return this.currentStage;
  }
}

export const SceneLifecycle = SceneLifecycleManager.getInstance();
