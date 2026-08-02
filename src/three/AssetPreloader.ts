export interface AssetFile {
  id: string;
  url: string;
  type: "glb" | "hdri" | "texture" | "font" | "audio";
}

export type ProgressCallback = (progress: number) => void;
export type CompleteCallback = () => void;

export class AssetPreloaderManager {
  private static instance: AssetPreloaderManager;
  private queue: AssetFile[] = [];
  private loadedCount = 0;
  private isPreloaded = false;

  private constructor() {}

  public static getInstance(): AssetPreloaderManager {
    if (!AssetPreloaderManager.instance) {
      AssetPreloaderManager.instance = new AssetPreloaderManager();
    }
    return AssetPreloaderManager.instance;
  }

  public registerAsset(asset: AssetFile): void {
    if (!this.queue.some((item) => item.id === asset.id)) {
      this.queue.push(asset);
    }
  }

  public registerBatch(assets: AssetFile[]): void {
    assets.forEach((asset) => this.registerAsset(asset));
  }

  public async preloadAll(onProgress?: ProgressCallback): Promise<void> {
    if (this.isPreloaded) {
      if (onProgress) onProgress(100);
      return;
    }

    if (this.queue.length === 0) {
      this.isPreloaded = true;
      if (onProgress) onProgress(100);
      return;
    }

    this.loadedCount = 0;
    const total = this.queue.length;

    // Simulate high-performance chunked preloading of models and HDRIs
    for (const asset of this.queue) {
      await new Promise<void>((resolve) => {
        const simulatedLoadTime = asset.type === "glb" ? 150 : 50;
        setTimeout(() => {
          this.loadedCount++;
          if (onProgress) {
            onProgress(Math.floor((this.loadedCount / total) * 100));
          }
          resolve();
        }, simulatedLoadTime);
      });
    }

    this.isPreloaded = true;
  }

  public getProgressPercent(): number {
    if (this.queue.length === 0) return 100;
    return Math.floor((this.loadedCount / this.queue.length) * 100);
  }

  public isLoaded(): boolean {
    return this.isPreloaded;
  }

  public clearQueue(): void {
    this.queue = [];
    this.loadedCount = 0;
    this.isPreloaded = false;
  }
}

export const AssetPreloader = AssetPreloaderManager.getInstance();
