import * as THREE from "three";
import { RoadGenerator } from "./RoadGenerator";
import { WorldConfig } from "./WorldConfig";

export interface RoadNetworkConfig {
  gridOriginX: number;
  gridOriginZ: number;
  gridColumns: number;
  gridRows: number;
}

export class RoadNetworkClass {
  private static instance: RoadNetworkClass;

  private constructor() {}

  public static getInstance(): RoadNetworkClass {
    if (!RoadNetworkClass.instance) {
      RoadNetworkClass.instance = new RoadNetworkClass();
    }
    return RoadNetworkClass.instance;
  }

  // Generate a grid-based road network segment meshes
  public buildGrid(config: RoadNetworkConfig): THREE.Group {
    const { gridOriginX, gridOriginZ, gridColumns, gridRows } = config;
    const spacing = WorldConfig.blockSpacing;
    const group = new THREE.Group();

    // Horizontal roads (along X axis)
    for (let row = 0; row <= gridRows; row++) {
      const z = gridOriginZ + row * spacing;
      const start = new THREE.Vector3(gridOriginX, 0.01, z);
      const end = new THREE.Vector3(gridOriginX + gridColumns * spacing, 0.01, z);
      const segment = RoadGenerator.buildSegment({ start, end });
      group.add(segment);
    }

    // Vertical roads (along Z axis)
    for (let col = 0; col <= gridColumns; col++) {
      const x = gridOriginX + col * spacing;
      const start = new THREE.Vector3(x, 0.01, gridOriginZ);
      const end = new THREE.Vector3(x, 0.01, gridOriginZ + gridRows * spacing);
      const segment = RoadGenerator.buildSegment({ start, end });
      group.add(segment);
    }

    // Intersections at each grid corner
    for (let row = 0; row <= gridRows; row++) {
      for (let col = 0; col <= gridColumns; col++) {
        const center = new THREE.Vector3(
          gridOriginX + col * spacing,
          0.01,
          gridOriginZ + row * spacing
        );
        const intersection = RoadGenerator.buildIntersection({ center });
        group.add(intersection);
      }
    }

    return group;
  }
}

export const RoadNetwork = RoadNetworkClass.getInstance();
