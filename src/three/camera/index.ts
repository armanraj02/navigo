import { useCameraStore } from "@/store/cameraStore";
import { SceneEvents } from "../SceneEvents";
import { TransitionEngine } from "../TransitionEngine";

export interface CameraControllerOptions {
  fov?: number;
  near?: number;
  far?: number;
}

export class CameraController {
  public fov: number;
  public near: number;
  public far: number;

  constructor(options?: CameraControllerOptions) {
    this.fov = options?.fov ?? 45;
    this.near = options?.near ?? 0.1;
    this.far = options?.far ?? 1000;
  }

  public getPosition(): [number, number, number] {
    return useCameraStore.getState().position;
  }

  public getTarget(): [number, number, number] {
    return useCameraStore.getState().target;
  }

  public getZoom(): number {
    return useCameraStore.getState().zoom;
  }

  public getMode(): "orbit" | "fixed" | "cinematic" {
    return useCameraStore.getState().mode;
  }

  public setMode(mode: "orbit" | "fixed" | "cinematic"): void {
    useCameraStore.getState().setMode(mode);
  }

  public lookAt(x: number, y: number, z: number): void {
    useCameraStore.getState().setTarget([x, y, z]);
  }

  // Smooth interpolated fly-to transition
  public async flyTo(
    newPosition: [number, number, number],
    newTarget: [number, number, number],
    newZoom = 1.0,
    durationMs = 1200
  ): Promise<void> {
    SceneEvents.emit("CAMERA_STARTED");
    const cameraStore = useCameraStore.getState();

    const startPos = [...cameraStore.position] as [number, number, number];
    const startTarget = [...cameraStore.target] as [number, number, number];
    const startZoom = cameraStore.zoom;

    await TransitionEngine.transitionValue(0, 1, durationMs, "easeOutCubic", (t) => {
      const currentPos: [number, number, number] = [
        startPos[0] + (newPosition[0] - startPos[0]) * t,
        startPos[1] + (newPosition[1] - startPos[1]) * t,
        startPos[2] + (newPosition[2] - startPos[2]) * t,
      ];

      const currentTarget: [number, number, number] = [
        startTarget[0] + (newTarget[0] - startTarget[0]) * t,
        startTarget[1] + (newTarget[1] - startTarget[1]) * t,
        startTarget[2] + (newTarget[2] - startTarget[2]) * t,
      ];

      const currentZoom = startZoom + (newZoom - startZoom) * t;

      cameraStore.setPosition(currentPos);
      cameraStore.setTarget(currentTarget);
      cameraStore.setZoom(currentZoom);
    });

    SceneEvents.emit("CAMERA_FINISHED");
  }
}
