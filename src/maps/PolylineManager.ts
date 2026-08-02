// Manager handling custom route paths drawing on Google Map

export interface CustomPolylineOptions {
  id: string;
  path: { lat: number; lng: number }[];
  color: string;
  weight?: number;
}

export class PolylineManagerClass {
  private static instance: PolylineManagerClass;
  private polylines: Map<string, google.maps.Polyline> = new Map();

  private constructor() {}

  public static getInstance(): PolylineManagerClass {
    if (!PolylineManagerClass.instance) {
      PolylineManagerClass.instance = new PolylineManagerClass();
    }
    return PolylineManagerClass.instance;
  }

  public addPolyline(map: google.maps.Map, options: CustomPolylineOptions): void {
    this.removePolyline(options.id);

    if (!window.google?.maps) return;

    const polyline = new window.google.maps.Polyline({
      path: options.path,
      map,
      geodesic: true,
      strokeColor: options.color,
      strokeOpacity: 0.8,
      strokeWeight: options.weight || 4,
    });

    this.polylines.set(options.id, polyline);
  }

  public removePolyline(id: string): void {
    const polyline = this.polylines.get(id);
    if (polyline) {
      polyline.setMap(null);
      this.polylines.delete(id);
    }
  }

  public clearAll(): void {
    this.polylines.forEach((line) => line.setMap(null));
    this.polylines.clear();
  }
}

export const PolylineManager = PolylineManagerClass.getInstance();
