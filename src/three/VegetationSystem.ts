import * as THREE from "three";
import { MaterialLibrary } from "./MaterialLibrary";

export class TreeGeneratorClass {
  public buildTree(x: number, z: number, scale = 1.0): THREE.Group {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.scale.setScalar(scale);

    // Trunk
    const trunkGeo = new THREE.CylinderGeometry(0.15, 0.25, 1.5, 6);
    const trunkMat = new THREE.MeshStandardMaterial({ color: "#78350f", roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 0.75;
    trunk.castShadow = true;
    group.add(trunk);

    // Canopy
    const canopyGeo = new THREE.ConeGeometry(1.0, 2.5, 7);
    const canopyMat = MaterialLibrary.getMaterial("grass");
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.y = 2.8;
    canopy.castShadow = true;
    group.add(canopy);

    return group;
  }
}

export class GrassGeneratorClass {
  public buildPatch(x: number, z: number, size: number): THREE.Mesh {
    const geo = new THREE.PlaneGeometry(size, size);
    geo.rotateX(-Math.PI / 2);
    const mat = MaterialLibrary.getMaterial("grass");
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, 0.01, z);
    mesh.receiveShadow = true;
    return mesh;
  }
}

export class ParkGeneratorClass {
  public buildPark(x: number, z: number, width: number, depth: number): THREE.Group {
    const group = new THREE.Group();

    // Ground
    const grassGen = new GrassGeneratorClass();
    const ground = grassGen.buildPatch(x, z, Math.max(width, depth));
    group.add(ground);

    // Trees scattered across the park
    const treeGen = new TreeGeneratorClass();
    const treeCount = Math.floor((width * depth) / 20);
    for (let i = 0; i < treeCount; i++) {
      const tx = x - width / 2 + Math.random() * width;
      const tz = z - depth / 2 + Math.random() * depth;
      const scale = 0.7 + Math.random() * 0.6;
      const tree = treeGen.buildTree(tx, tz, scale);
      group.add(tree);
    }

    return group;
  }
}

export const TreeGenerator = new TreeGeneratorClass();
export const GrassGenerator = new GrassGeneratorClass();
export const ParkGenerator = new ParkGeneratorClass();
