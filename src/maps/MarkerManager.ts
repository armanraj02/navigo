// Custom Google Map Marker manager containing animated HTML markers

export interface CustomMarkerOptions {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  color: string;
}

export class MarkerManagerClass {
  private static instance: MarkerManagerClass;
  private markers: Map<string, google.maps.Marker> = new Map();

  private constructor() {}

  public static getInstance(): MarkerManagerClass {
    if (!MarkerManagerClass.instance) {
      MarkerManagerClass.instance = new MarkerManagerClass();
    }
    return MarkerManagerClass.instance;
  }

  public addMarker(map: google.maps.Map, options: CustomMarkerOptions): void {
    this.removeMarker(options.id);

    if (!window.google?.maps) return;

    const marker = new window.google.maps.Marker({
      position: options.position,
      map,
      title: options.title,
      icon: {
        path: window.google.maps.SymbolPath.CIRCLE,
        scale: 8,
        fillColor: options.color,
        fillOpacity: 0.9,
        strokeColor: "#ffffff",
        strokeWeight: 2,
      },
    });

    this.markers.set(options.id, marker);
  }

  public removeMarker(id: string): void {
    const marker = this.markers.get(id);
    if (marker) {
      marker.setMap(null);
      this.markers.delete(id);
    }
  }

  public clearAll(): void {
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers.clear();
  }
}

export const MarkerManager = MarkerManagerClass.getInstance();
