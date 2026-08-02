import { SceneEvents } from "./SceneEvents";

export type EasingType = "linear" | "easeOutQuad" | "easeOutCubic" | "easeOutElastic";

export class TransitionEngineClass {
  private static instance: TransitionEngineClass;

  private constructor() {}

  public static getInstance(): TransitionEngineClass {
    if (!TransitionEngineClass.instance) {
      TransitionEngineClass.instance = new TransitionEngineClass();
    }
    return TransitionEngineClass.instance;
  }

  // Interpolation helper function
  public interpolate(start: number, end: number, progress: number, ease: EasingType): number {
    const t = this.getEasing(progress, ease);
    return start + (end - start) * t;
  }

  private getEasing(t: number, ease: EasingType): number {
    switch (ease) {
      case "linear":
        return t;
      case "easeOutQuad":
        return t * (2 - t);
      case "easeOutCubic":
        return --t * t * t + 1;
      case "easeOutElastic": {
        const c4 = (2 * Math.PI) / 3;
        return t === 0
          ? 0
          : t === 1
          ? 1
          : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
      }
      default:
        return t;
    }
  }

  // Triggers visual layer transitions
  public async transitionValue(
    start: number,
    end: number,
    durationMs: number,
    ease: EasingType,
    onStep: (val: number) => void
  ): Promise<void> {
    SceneEvents.emit("TRANSITION_STARTED");
    const startTime = performance.now();

    return new Promise<void>((resolve) => {
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const currentVal = this.interpolate(start, end, progress, ease);

        onStep(currentVal);

        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          SceneEvents.emit("TRANSITION_COMPLETED");
          resolve();
        }
      };

      requestAnimationFrame(tick);
    });
  }
}

export const TransitionEngine = TransitionEngineClass.getInstance();
