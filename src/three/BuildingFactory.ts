import * as THREE from "three";
import { MaterialLibrary } from "./MaterialLibrary";
import { LODLevel } from "./LODManager";

export interface BuildingParams {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  roofStyle: "flat" | "pitched" | "modern";
  windowDensity: number;
  materialType: string;
  lod: LODLevel;
}

export class BuildingFactoryClass {
  private static instance: BuildingFactoryClass;

  private constructor() {}

  public static getInstance(): BuildingFactoryClass {
    if (!BuildingFactoryClass.instance) {
      BuildingFactoryClass.instance = new BuildingFactoryClass();
    }
    return BuildingFactoryClass.instance;
  }

  public build(params: BuildingParams): THREE.Group {
    const group = new THREE.Group();
    group.position.set(params.x, 0, params.z);

    // Main building body
    const bodyGeo = this.buildBodyGeometry(params);
    const bodyMat = MaterialLibrary.getMaterial(params.materialType);
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = params.height / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Roof (skip for far LOD)
    if (params.lod !== "far") {
      const roof = this.buildRoof(params);
      if (roof) group.add(roof);
    }

    // Windows (near only)
    if (params.lod === "near" && params.windowDensity > 0.3) {
      const windows = this.buildWindows(params);
      group.add(windows);
    }

    return group;
  }

  private buildBodyGeometry(params: BuildingParams): THREE.BoxGeometry {
    return new THREE.BoxGeometry(params.width, params.height, params.depth);
  }

  private buildRoof(params: BuildingParams): THREE.Mesh | null {
    const { width, depth, height, roofStyle } = params;

    if (roofStyle === "flat") {
      const geo = new THREE.BoxGeometry(width + 0.4, 0.4, depth + 0.4);
      const mat = MaterialLibrary.getMaterial("concrete");
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = height + 0.2;
      mesh.castShadow = true;
      return mesh;
    }

    if (roofStyle === "modern") {
      // Offset top element for modern stepped look
      const geo = new THREE.BoxGeometry(width * 0.6, 1.5, depth * 0.6);
      const mat = MaterialLibrary.getMaterial("glass");
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = height + 0.75;
      mesh.castShadow = true;
      return mesh;
    }

    return null;
  }

  private buildWindows(params: BuildingParams): THREE.Group {
    const { width, depth, height, windowDensity } = params;
    const group = new THREE.Group();
    const mat = MaterialLibrary.getMaterial("emissiveWindow");

    const floors = Math.max(1, Math.floor(height / 3.5));
    const cols = Math.max(1, Math.floor(width * windowDensity * 0.4));

    const winW = 0.7;
    const winH = 1.0;

    for (let f = 0; f < floors; f++) {
      for (let c = 0; c < cols; c++) {
        const geo = new THREE.PlaneGeometry(winW, winH);
        const win = new THREE.Mesh(geo, mat);

        const stepX = width / (cols + 1);
        const wx = -width / 2 + stepX * (c + 1);
        const wy = 1.5 + f * 3.5;

        // Front face only for performance
        win.position.set(wx, wy, depth / 2 + 0.01);
        group.add(win);
      }
    }

    return group;
  }
}

export const BuildingFactory = BuildingFactoryClass.getInstance();
