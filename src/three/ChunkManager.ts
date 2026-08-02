import * as THREE from "three";
import { WorldConfig } from "./WorldConfig";

export interface ChunkKey {
  cx: number;
  cz: number;
}

export interface Chunk {
  key: string;
  cx: number;
  cz: number;
  worldX: number;
  worldZ: number;
  group: THREE.Group;
  isLoaded: boolean;
}

export class ChunkManagerClass {
  private static instance: ChunkManagerClass;
  private loadedChunks: Map<string, Chunk> = new Map();
  private viewDistance = 3;

  private constructor() {}

  public static getInstance(): ChunkManagerClass {
    if (!ChunkManagerClass.instance) {
      ChunkManagerClass.instance = new ChunkManagerClass();
    }
    return ChunkManagerClass.instance;
  }

  private toKey(cx: number, cz: number): string {
    return `${cx}_${cz}`;
  }

  public getChunksAroundCamera(
    cameraX: number,
    cameraZ: number
  ): ChunkKey[] {
    const size = WorldConfig.chunkSize;
    const cx = Math.floor(cameraX / size);
    const cz = Math.floor(cameraZ / size);
    const results: ChunkKey[] = [];

    for (let dx = -this.viewDistance; dx <= this.viewDistance; dx++) {
      for (let dz = -this.viewDistance; dz <= this.viewDistance; dz++) {
        results.push({ cx: cx + dx, cz: cz + dz });
      }
    }
    return results;
  }

  public createChunk(cx: number, cz: number): Chunk {
    const key = this.toKey(cx, cz);
    const size = WorldConfig.chunkSize;
    const worldX = cx * size;
    const worldZ = cz * size;

    const group = new THREE.Group();
    group.position.set(worldX, 0, worldZ);

    const chunk: Chunk = { key, cx, cz, worldX, worldZ, group, isLoaded: true };
    this.loadedChunks.set(key, chunk);
    return chunk;
  }

  public getChunk(cx: number, cz: number): Chunk | undefined {
    return this.loadedChunks.get(this.toKey(cx, cz));
  }

  public removeChunk(cx: number, cz: number): void {
    const key = this.toKey(cx, cz);
    const chunk = this.loadedChunks.get(key);
    if (chunk) {
      chunk.group.clear();
      this.loadedChunks.delete(key);
    }
  }

  public getLoadedCount(): number {
    return this.loadedChunks.size;
  }

  public setViewDistance(dist: number): void {
    this.viewDistance = dist;
  }
}

export const ChunkManager = ChunkManagerClass.getInstance();
