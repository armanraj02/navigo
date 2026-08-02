import { useSceneStore } from "@/store/sceneStore";
import { SceneEvents } from "./SceneEvents";

export class SceneStateManager {
  private static instance: SceneStateManager;

  private constructor() {}

  public static getInstance(): SceneStateManager {
    if (!SceneStateManager.instance) {
      SceneStateManager.instance = new SceneStateManager();
    }
    return SceneStateManager.instance;
  }

  public getNightMode(): boolean {
    return useSceneStore.getState().isNightMode;
  }

  public setNightMode(enabled: boolean): void {
    const isNightMode = useSceneStore.getState().isNightMode;
    if (isNightMode !== enabled) {
      useSceneStore.getState().toggleNightMode();
      SceneEvents.emit("THEME_CHANGED", enabled ? "dark" : "light");
    }
  }

  public getWeather(): string {
    return useSceneStore.getState().weather;
  }

  public setWeather(weather: "sunny" | "cloudy" | "foggy" | "rainy"): void {
    useSceneStore.getState().setWeather(weather);
  }

  public getFogDensity(): number {
    return useSceneStore.getState().fogDensity;
  }

  public setFogDensity(density: number): void {
    useSceneStore.getState().setFogDensity(density);
  }

  public getTimeOfDay(): number {
    return useSceneStore.getState().timeOfDay;
  }

  public setTimeOfDay(time: number): void {
    useSceneStore.getState().setTimeOfDay(time);
  }
}

export const SceneState = SceneStateManager.getInstance();
