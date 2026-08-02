export interface RoadSegment {
  id: string;
  points: [number, number, number][];
  lanes: number;
}

export class RoadsLayer {
  private segments: RoadSegment[] = [];

  public addSegment(segment: RoadSegment): void {
    this.segments.push(segment);
  }

  public getSegments(): RoadSegment[] {
    return this.segments;
  }
}
