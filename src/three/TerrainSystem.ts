import * as THREE from "three";
import { MaterialLibrary } from "./MaterialLibrary";

export interface TerrainPatch {
  x: number;
  z: number;
  size: number;
  mesh: THREE.Mesh;
}

export class TerrainSystemClass {
  private static instance: TerrainSystemClass;

  private constructor() {}

  public static getInstance(): TerrainSystemClass {
    if (!TerrainSystemClass.instance) {
      TerrainSystemClass.instance = new TerrainSystemClass();
    }
    return TerrainSystemClass.instance;
  }

  public buildFlatPatch(x: number, z: number, size: number): TerrainPatch {
    // Flat terrain for the procedural city foundation; future heightmap support via NoiseGenerator
    const geometry = new THREE.PlaneGeometry(size, size, 1, 1);
    geometry.rotateX(-Math.PI / 2);

    const material = MaterialLibrary.getMaterial("grass");
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, 0, z);
    mesh.receiveShadow = true;

    return { x, z, size, mesh };
  }
}

export const TerrainSystem = TerrainSystemClass.getInstance();
