export class RenderManagerClass {
  private static instance: RenderManagerClass;
  private isLoopRunning = false;
  private animationFrameId: number | null = null;
  private renderCallbacks: Set<(deltaTime: number) => void> = new Set();
  private lastTime = 0;

  private constructor() {}

  public static getInstance(): RenderManagerClass {
    if (!RenderManagerClass.instance) {
      RenderManagerClass.instance = new RenderManagerClass();
    }
    return RenderManagerClass.instance;
  }

  public startLoop(): void {
    if (this.isLoopRunning) return;
    this.isLoopRunning = true;
    this.lastTime = performance.now();
    this.tick(this.lastTime);
  }

  public stopLoop(): void {
    this.isLoopRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  public addCallback(callback: (deltaTime: number) => void): () => void {
    this.renderCallbacks.add(callback);
    return () => this.renderCallbacks.delete(callback);
  }

  private tick = (now: number) => {
    if (!this.isLoopRunning) return;

    const deltaTime = Math.min((now - this.lastTime) / 1000, 0.1); // Cap deltaTime at 100ms
    this.lastTime = now;

    // Trigger render frame updates
    this.renderCallbacks.forEach((cb) => {
      try {
        cb(deltaTime);
      } catch (error) {
        console.error("Error in render animation callback loop:", error);
      }
    });

    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  public isRunning(): boolean {
    return this.isLoopRunning;
  }
}

export const RenderManager = RenderManagerClass.getInstance();
