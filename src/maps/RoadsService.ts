// Google Roads API integration service

export interface RoadPoint {
  latitude: number;
  longitude: number;
  placeId: string;
}

export class RoadsServiceClass {
  private static instance: RoadsServiceClass;

  private constructor() {}

  public static getInstance(): RoadsServiceClass {
    if (!RoadsServiceClass.instance) {
      RoadsServiceClass.instance = new RoadsServiceClass();
    }
    return RoadsServiceClass.instance;
  }

  public async snapToRoads(points: [number, number][]): Promise<RoadPoint[]> {
    // Interface mock signature supporting snaps coordinates
    return points.map(([lat, lng], idx) => ({
      latitude: lat,
      longitude: lng,
      placeId: `road-segment-${idx}`,
    }));
  }
}

export const RoadsService = RoadsServiceClass.getInstance();
