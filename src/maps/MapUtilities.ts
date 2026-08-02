// Geographical utility equations for coordinate translation

const BASE_LAT = 37.7894;
const BASE_LNG = -122.4014;
const LAT_SCALE = 111111;

export const MapUtilities = {
  // Translate 3D Local space coordinates [x, y, z] to Lat/Lng
  localToGps: (x: number, z: number): { lat: number; lng: number } => {
    const lat = BASE_LAT - z / LAT_SCALE;
    const lng = BASE_LNG + x / (LAT_SCALE * Math.cos((BASE_LAT * Math.PI) / 180));
    return { lat, lng };
  },

  // Translate GPS Lat/Lng back to 3D local space coordinates [x, 0.1, z]
  gpsToLocal: (lat: number, lng: number): [number, number] => {
    const z = (BASE_LAT - lat) * LAT_SCALE;
    const x = (lng - BASE_LNG) * LAT_SCALE * Math.cos((BASE_LAT * Math.PI) / 180);
    return [x, z];
  },

  // Calculate straight line distance (Haversine Formula) in meters
  getDistanceMeters: (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // metres
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  },
};
