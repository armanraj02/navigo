export interface CityConfig {
  size: number;
  blockSpacing: number;
  roadWidth: number;
  buildingHeightRange: {
    min: number;
    max: number;
  };
  busScale: number;
  stopRadius: number;
}

export const cityConfig: CityConfig = {
  size: 200.0,
  blockSpacing: 20.0,
  roadWidth: 4.0,
  buildingHeightRange: {
    min: 8.0,
    max: 45.0,
  },
  busScale: 1.4,
  stopRadius: 2.0,
};
