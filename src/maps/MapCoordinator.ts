import { MapManager } from "./MapManager";

export class MapCoordinatorClass {
  private static instance: MapCoordinatorClass;

  private constructor() {}

  public static getInstance(): MapCoordinatorClass {
    if (!MapCoordinatorClass.instance) {
      MapCoordinatorClass.instance = new MapCoordinatorClass();
    }
    return MapCoordinatorClass.instance;
  }

  public focusLocation(lat: number, lng: number, zoom = 16): void {
    const map = MapManager.getMap();
    if (map) {
      map.setCenter({ lat, lng });
      map.setZoom(zoom);
    }
  }

  public smoothPanTo(lat: number, lng: number): void {
    const map = MapManager.getMap();
    if (map) {
      map.panTo({ lat, lng });
    }
  }
}

export const MapCoordinator = MapCoordinatorClass.getInstance();
