// Google Directions API integration service

export interface RouteGeometryDto {
  coordinates: [number, number, number][]; // Snap paths to 3D coordinate space
  distanceMeter: number;
  durationSecond: number;
  transfersCount: number;
}

export class DirectionsServiceClass {
  private static instance: DirectionsServiceClass;
  private directionsService: google.maps.DirectionsService | null = null;

  private constructor() {}

  public static getInstance(): DirectionsServiceClass {
    if (!DirectionsServiceClass.instance) {
      DirectionsServiceClass.instance = new DirectionsServiceClass();
    }
    return DirectionsServiceClass.instance;
  }

  private getService(): google.maps.DirectionsService | null {
    if (!this.directionsService && window.google?.maps) {
      this.directionsService = new window.google.maps.DirectionsService();
    }
    return this.directionsService;
  }

  public async getRouteDirections(
    origin: { lat: number; lng: number } | string,
    destination: { lat: number; lng: number } | string
  ): Promise<RouteGeometryDto> {
    const service = this.getService();
    if (!service || !window.google?.maps) {
      // Fallback spline coordinate generation
      return {
        coordinates: [
          [0, 0.1, 0],
          [-20, 0.1, -15],
          [-40, 0.1, -30],
          [-60, 0.1, -45],
          [-80, 0.1, -60],
        ],
        distanceMeter: 4800,
        durationSecond: 640,
        transfersCount: 1,
      };
    }

    return new Promise((resolve) => {
      const travelMode = window.google.maps.TravelMode.TRANSIT;
      service.route(
        {
          origin,
          destination,
          travelMode,
        },
        (result, status) => {
          if (status !== window.google.maps.DirectionsStatus.OK || !result || !result.routes[0]) {
            // Fallback route on error
            resolve({
              coordinates: [
                [0, 0.1, 0],
                [-40, 0.1, -30],
                [-80, 0.1, -60],
              ],
              distanceMeter: 3200,
              durationSecond: 450,
              transfersCount: 0,
            });
            return;
          }

          const route = result.routes[0];
          const leg = route.legs[0];
          const pathCoords: [number, number, number][] = [];

          // Parse route path points
          route.overview_path.forEach((point) => {
            // Project back to local Three.js coordinates
            // lat = baseLat - z / 111111  =>  z = (baseLat - lat) * 111111
            // lng = baseLng + x / (111111 * cos) => x = (lng - baseLng) * 111111 * cos
            const lat = point.lat();
            const lng = point.lng();
            const z = (37.7894 - lat) * 111111;
            const x = (lng - -122.4014) * 111111 * Math.cos((37.7894 * Math.PI) / 180);
            pathCoords.push([x, 0.15, z]);
          });

          resolve({
            coordinates: pathCoords,
            distanceMeter: leg.distance?.value || 1000,
            durationSecond: leg.duration?.value || 300,
            transfersCount: leg.steps.filter((s) => s.travel_mode === window.google.maps.TravelMode.TRANSIT).length - 1,
          });
        }
      );
    });
  }
}

export const DirectionsService = DirectionsServiceClass.getInstance();
