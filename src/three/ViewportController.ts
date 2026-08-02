export interface ViewportSize {
  width: number;
  height: number;
  aspect: number;
}

export type ViewportResizeCallback = (size: ViewportSize) => void;

export class ViewportControllerClass {
  private static instance: ViewportControllerClass;
  private width = 0;
  private height = 0;
  private aspect = 1;
  private resizeListeners: Set<ViewportResizeCallback> = new Set();

  private constructor() {
    if (typeof window !== "undefined") {
      this.handleResize();
      window.addEventListener("resize", this.handleResize);
    }
  }

  public static getInstance(): ViewportControllerClass {
    if (!ViewportControllerClass.instance) {
      ViewportControllerClass.instance = new ViewportControllerClass();
    }
    return ViewportControllerClass.instance;
  }

  private handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;

    const size: ViewportSize = {
      width: this.width,
      height: this.height,
      aspect: this.aspect,
    };

    this.resizeListeners.forEach((listener) => {
      try {
        listener(size);
      } catch (error) {
        console.error("Error in viewport resize listener:", error);
      }
    });
  };

  public subscribe(callback: ViewportResizeCallback): () => void {
    this.resizeListeners.add(callback);
    // Emit immediate coordinates to listener
    callback({
      width: this.width,
      height: this.height,
      aspect: this.aspect,
    });

    return () => this.resizeListeners.delete(callback);
  }

  public getSize(): ViewportSize {
    return {
      width: this.width,
      height: this.height,
      aspect: this.aspect,
    };
  }

  public destroy(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleResize);
    }
    this.resizeListeners.clear();
  }
}

export const ViewportController = ViewportControllerClass.getInstance();
