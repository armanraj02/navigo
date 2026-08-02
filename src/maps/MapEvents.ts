// MapEvents hooks custom mouse clicks and interactions back to the Coordinator

export class MapEventsClass {
  private static instance: MapEventsClass;

  private constructor() {}

  public static getInstance(): MapEventsClass {
    if (!MapEventsClass.instance) {
      MapEventsClass.instance = new MapEventsClass();
    }
    return MapEventsClass.instance;
  }

  public bindMapListeners(map: google.maps.Map, onMapClick?: (lat: number, lng: number) => void): () => void {
    if (!window.google?.maps) return () => {};

    const listener = map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng && onMapClick) {
        onMapClick(e.latLng.lat(), e.latLng.lng());
      }
    });

    return () => {
      listener.remove();
    };
  }
}

export const MapEvents = MapEventsClass.getInstance();
