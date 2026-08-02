import * as THREE from "three";
import { NoiseGenerator } from "./NoiseGenerator";
import { ZoneManager } from "./ZoneManager";
import { BuildingFactory } from "./BuildingFactory";
import { LODManager } from "./LODManager";

export class BuildingGeneratorClass {
  private static instance: BuildingGeneratorClass;

  private constructor() {}

  public static getInstance(): BuildingGeneratorClass {
    if (!BuildingGeneratorClass.instance) {
      BuildingGeneratorClass.instance = new BuildingGeneratorClass();
    }
    return BuildingGeneratorClass.instance;
  }

  public generateBlock(
    blockX: number,
    blockZ: number,
    blockSize = 16
  ): THREE.Group {
    const group = new THREE.Group();
    const zoneParams = ZoneManager.getZoneParamsAt(blockX, blockZ);

    if (zoneParams.buildingDensity === 0) return group;

    const buildingsPerSide = 2;
    const cellSize = (blockSize - 4) / buildingsPerSide;

    for (let bx = 0; bx < buildingsPerSide; bx++) {
      for (let bz = 0; bz < buildingsPerSide; bz++) {
        // Randomize using noise to determine if a building should be placed
        const n = NoiseGenerator.random2D(blockX + bx * 3.7, blockZ + bz * 5.3);
        if (n > zoneParams.buildingDensity) continue;

        const w = 3 + NoiseGenerator.random2D(blockX + bx, blockZ) * 4;
        const d = 3 + NoiseGenerator.random2D(blockX, blockZ + bz) * 4;
        const h = 3 + NoiseGenerator.random2D(blockX + bx * 2, blockZ) * zoneParams.maxBuildingHeight;

        const localX = -blockSize / 2 + cellSize * bx + cellSize / 2 + 2;
        const localZ = -blockSize / 2 + cellSize * bz + cellSize / 2 + 2;

        const roofOptions: Array<"flat" | "pitched" | "modern"> = ["flat", "modern", "flat"];
        const roofIdx = Math.floor(NoiseGenerator.random2D(blockX + bx, blockZ + bz) * roofOptions.length);
        const roofStyle = roofOptions[roofIdx] ?? "flat";

        const matOptions = ["concrete", "glass", "concrete"];
        const matIdx = Math.floor(NoiseGenerator.random2D(blockX, blockZ + bz) * matOptions.length);
        const materialType = matOptions[matIdx] ?? "concrete";

        const lod = LODManager.getLevelAt(blockX + localX, blockZ + localZ);

        const building = BuildingFactory.build({
          x: localX,
          z: localZ,
          width: w,
          depth: d,
          height: h,
          roofStyle,
          windowDensity: zoneParams.windowDensity,
          materialType,
          lod,
        });

        group.add(building);
      }
    }

    return group;
  }
}

export const BuildingGenerator = BuildingGeneratorClass.getInstance();
