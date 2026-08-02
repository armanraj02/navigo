import * as THREE from "three";

export interface InstancedBatch {
  mesh: THREE.InstancedMesh;
  count: number;
  capacity: number;
}

export class InstancingManagerClass {
  private static instance: InstancingManagerClass;
  private batches: Map<string, InstancedBatch> = new Map();
  private dummy = new THREE.Object3D();

  private constructor() {}

  public static getInstance(): InstancingManagerClass {
    if (!InstancingManagerClass.instance) {
      InstancingManagerClass.instance = new InstancingManagerClass();
    }
    return InstancingManagerClass.instance;
  }

  public createBatch(
    id: string,
    geometry: THREE.BufferGeometry,
    material: THREE.Material,
    capacity: number
  ): THREE.InstancedMesh {
    const mesh = new THREE.InstancedMesh(geometry, material, capacity);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.count = 0;
    this.batches.set(id, { mesh, count: 0, capacity });
    return mesh;
  }

  public addInstance(
    id: string,
    position: THREE.Vector3,
    rotation: THREE.Euler,
    scale: THREE.Vector3
  ): boolean {
    const batch = this.batches.get(id);
    if (!batch || batch.count >= batch.capacity) return false;

    this.dummy.position.copy(position);
    this.dummy.rotation.copy(rotation);
    this.dummy.scale.copy(scale);
    this.dummy.updateMatrix();

    batch.mesh.setMatrixAt(batch.count, this.dummy.matrix);
    batch.count++;
    batch.mesh.count = batch.count;
    batch.mesh.instanceMatrix.needsUpdate = true;
    return true;
  }

  public resetBatch(id: string): void {
    const batch = this.batches.get(id);
    if (batch) {
      batch.count = 0;
      batch.mesh.count = 0;
    }
  }

  public getBatch(id: string): InstancedBatch | undefined {
    return this.batches.get(id);
  }

  public getStats(): Record<string, { count: number; capacity: number }> {
    const stats: Record<string, { count: number; capacity: number }> = {};
    this.batches.forEach((batch, id) => {
      stats[id] = { count: batch.count, capacity: batch.capacity };
    });
    return stats;
  }
}

export const InstancingManager = InstancingManagerClass.getInstance();
