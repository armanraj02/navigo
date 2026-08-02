import { SimulationClock } from "@/three/simulation/SimulationClock";
import { useReplayStore } from "./ReplayStore";

export class ReplayControllerClass {
  private static instance: ReplayControllerClass;
  private unsubscribe: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): ReplayControllerClass {
    if (!ReplayControllerClass.instance) {
      ReplayControllerClass.instance = new ReplayControllerClass();
    }
    return ReplayControllerClass.instance;
  }

  public init(): void {
    if (this.unsubscribe) return;

    this.unsubscribe = SimulationClock.subscribe((delta) => {
      const { isPlaying, progress, speed, replayPath } = useReplayStore.getState();
      if (!isPlaying || replayPath.length === 0) return;

      // Complete a full tour in ~45 seconds at 1x
      const speedFactor = speed / 45;
      const nextProgress = progress + delta * speedFactor;

      if (nextProgress >= 1.0) {
        useReplayStore.getState().setProgress(0.0); // loop
      } else {
        useReplayStore.getState().setProgress(nextProgress);
      }
    });
  }

  public cleanup(): void {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
}

export const ReplayController = ReplayControllerClass.getInstance();
