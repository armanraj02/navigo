import { modelRegistry } from "./modelRegistry";
import { textureRegistry } from "./textureRegistry";

export interface LoadedAssets {
  models: Record<string, unknown>;
  textures: Record<string, unknown>;
  hdris: Record<string, unknown>;
  loadedCount: number;
  totalCount: number;
}

export class AssetManager {
  private static instance: AssetManager;
  private assets: LoadedAssets = {
    models: {},
    textures: {},
    hdris: {},
    loadedCount: 0,
    totalCount: 0,
  };

  private constructor() {
    this.assets.totalCount =
      Object.keys(modelRegistry).length + Object.keys(textureRegistry).length;
  }

  public static getInstance(): AssetManager {
    if (!AssetManager.instance) {
      AssetManager.instance = new AssetManager();
    }
    return AssetManager.instance;
  }

  public async preloadAll(onProgress?: (progress: number) => void): Promise<LoadedAssets> {
    // Simulated loading wrapper to avoid blocking compilations
    return new Promise((resolve) => {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 0.25;
        this.assets.loadedCount = Math.floor(currentProgress * this.assets.totalCount);
        if (onProgress) {
          onProgress(currentProgress);
        }
        if (currentProgress >= 1) {
          clearInterval(interval);
          resolve(this.assets);
        }
      }, 50);
    });
  }

  public getModel(id: string): unknown {
    return this.assets.models[id];
  }

  public getTexture(id: string): unknown {
    return this.assets.textures[id];
  }
}
