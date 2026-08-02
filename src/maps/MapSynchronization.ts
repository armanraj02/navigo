import { MapManager } from "./MapManager";
import { MapTheme } from "./MapTheme";

export class MapSynchronizationClass {
  private static instance: MapSynchronizationClass;

  private constructor() {}

  public static getInstance(): MapSynchronizationClass {
    if (!MapSynchronizationClass.instance) {
      MapSynchronizationClass.instance = new MapSynchronizationClass();
    }
    return MapSynchronizationClass.instance;
  }

  public synchronizeTheme(isNightMode: boolean): void {
    const map = MapManager.getMap();
    if (map) {
      const mode = isNightMode ? "dark" : "light";
      map.setOptions({ styles: MapTheme.getStyleByMode(mode) });
    }
  }
}

export const MapSynchronization = MapSynchronizationClass.getInstance();
