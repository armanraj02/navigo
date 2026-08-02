// Live bus tracking feature module
export interface TrackerEntity {
  id: string;
  latitude: number;
  longitude: number;
  bearing: number;
}

export const getTrackingPosition = (id: string): TrackerEntity => {
  return { id, latitude: 0, longitude: 0, bearing: 0 };
};
