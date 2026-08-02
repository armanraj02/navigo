// Animation helpers for map coordinates interpolation

export class MapAnimationClass {
  private static instance: MapAnimationClass;

  private constructor() {}

  public static getInstance(): MapAnimationClass {
    if (!MapAnimationClass.instance) {
      MapAnimationClass.instance = new MapAnimationClass();
    }
    return MapAnimationClass.instance;
  }

  // Interpolates between start and end coordinates over duration
  public interpolateCoords(
    start: { lat: number; lng: number },
    end: { lat: number; lng: number },
    progress: number
  ): { lat: number; lng: number } {
    return {
      lat: start.lat + (end.lat - start.lat) * progress,
      lng: start.lng + (end.lng - start.lng) * progress,
    };
  }
}

export const MapAnimation = MapAnimationClass.getInstance();
