// Singleton Manager caching the Google Maps instance

export class MapManagerClass {
  private static instance: MapManagerClass;
  private mapInstance: google.maps.Map | null = null;

  private constructor() {}

  public static getInstance(): MapManagerClass {
    if (!MapManagerClass.instance) {
      MapManagerClass.instance = new MapManagerClass();
    }
    return MapManagerClass.instance;
  }

  public setMap(map: google.maps.Map): void {
    this.mapInstance = map;
  }

  public getMap(): google.maps.Map | null {
    return this.mapInstance;
  }

  public setCenter(lat: number, lng: number): void {
    if (this.mapInstance) {
      this.mapInstance.setCenter({ lat, lng });
    }
  }

  public setZoom(zoom: number): void {
    if (this.mapInstance) {
      this.mapInstance.setZoom(zoom);
    }
  }

  public setHeading(heading: number): void {
    if (this.mapInstance) {
      this.mapInstance.setHeading(heading);
    }
  }

  public setTilt(tilt: number): void {
    if (this.mapInstance) {
      this.mapInstance.setTilt(tilt);
    }
  }
}

export const MapManager = MapManagerClass.getInstance();
