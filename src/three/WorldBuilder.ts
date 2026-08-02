import * as THREE from "three";
import { ChunkManager } from "./ChunkManager";
import { TerrainSystem } from "./TerrainSystem";
import { RoadNetwork } from "./RoadNetwork";
import { BuildingGenerator } from "./BuildingGenerator";
import { WorldConfig } from "./WorldConfig";

export class WorldBuilderClass {
  private static instance: WorldBuilderClass;

  private constructor() {}

  public static getInstance(): WorldBuilderClass {
    if (!WorldBuilderClass.instance) {
      WorldBuilderClass.instance = new WorldBuilderClass();
    }
    return WorldBuilderClass.instance;
  }

  public buildChunk(cx: number, cz: number, scene: THREE.Group): void {
    if (ChunkManager.getChunk(cx, cz)) return; // Already built

    const chunk = ChunkManager.createChunk(cx, cz);
    const size = WorldConfig.chunkSize;
    const wx = cx * size;
    const wz = cz * size;

    // Terrain base
    const terrain = TerrainSystem.buildFlatPatch(0, 0, size);
    chunk.group.add(terrain.mesh);

    // Road network (small grid per chunk)
    const roads = RoadNetwork.buildGrid({
      gridOriginX: -size / 2,
      gridOriginZ: -size / 2,
      gridColumns: 3,
      gridRows: 3,
    });
    chunk.group.add(roads);

    // Buildings per block in the chunk
    const blockSpacing = WorldConfig.blockSpacing;
    const blocksPerChunk = Math.floor(size / blockSpacing);
    for (let bx = 0; bx < blocksPerChunk; bx++) {
      for (let bz = 0; bz < blocksPerChunk; bz++) {
        const localX = -size / 2 + bx * blockSpacing + blockSpacing / 2;
        const localZ = -size / 2 + bz * blockSpacing + blockSpacing / 2;
        const buildings = BuildingGenerator.generateBlock(
          wx + localX,
          wz + localZ,
          blockSpacing - WorldConfig.roadWidth * 2
        );
        buildings.position.set(localX, 0, localZ);
        chunk.group.add(buildings);
      }
    }

    scene.add(chunk.group);
  }

  public buildInitialChunks(scene: THREE.Group, radius = 2): void {
    for (let cx = -radius; cx <= radius; cx++) {
      for (let cz = -radius; cz <= radius; cz++) {
        this.buildChunk(cx, cz, scene);
      }
    }
  }
}

export const WorldBuilder = WorldBuilderClass.getInstance();
