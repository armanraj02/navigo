export interface ZoneParameters {
  maxBuildingHeight: number;
  buildingDensity: number;
  vegetationDensity: number;
  windowDensity: number;
  primaryColor: string;
}

export interface WorldParameters {
  chunkSize: number;
  gridSize: number;
  roadWidth: number;
  blockSpacing: number;
  zones: Record<string, ZoneParameters>;
}

export const WorldConfig: WorldParameters = {
  chunkSize: 100,
  gridSize: 50,
  roadWidth: 4,
  blockSpacing: 20,
  zones: {
    downtown: {
      maxBuildingHeight: 45,
      buildingDensity: 0.85,
      vegetationDensity: 0.1,
      windowDensity: 0.9,
      primaryColor: "#0071e3",
    },
    residential: {
      maxBuildingHeight: 12,
      buildingDensity: 0.4,
      vegetationDensity: 0.6,
      windowDensity: 0.5,
      primaryColor: "#10b981",
    },
    industrial: {
      maxBuildingHeight: 20,
      buildingDensity: 0.7,
      vegetationDensity: 0.05,
      windowDensity: 0.3,
      primaryColor: "#f59e0b",
    },
    park: {
      maxBuildingHeight: 0,
      buildingDensity: 0.0,
      vegetationDensity: 0.9,
      windowDensity: 0.0,
      primaryColor: "#10b981",
    },
    waterfront: {
      maxBuildingHeight: 15,
      buildingDensity: 0.5,
      vegetationDensity: 0.3,
      windowDensity: 0.7,
      primaryColor: "#00e3a5",
    },
  },
};
