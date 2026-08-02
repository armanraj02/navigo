import * as THREE from "three";
import { MaterialLibrary } from "./MaterialLibrary";

export interface RoadSegmentParams {
  start: THREE.Vector3;
  end: THREE.Vector3;
  width?: number;
}

export interface IntersectionParams {
  center: THREE.Vector3;
  size?: number;
}

export class RoadGeneratorClass {
  private static instance: RoadGeneratorClass;

  private constructor() {}

  public static getInstance(): RoadGeneratorClass {
    if (!RoadGeneratorClass.instance) {
      RoadGeneratorClass.instance = new RoadGeneratorClass();
    }
    return RoadGeneratorClass.instance;
  }

  public buildSegment(params: RoadSegmentParams): THREE.Mesh {
    const { start, end, width = 4 } = params;

    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();

    const geometry = new THREE.PlaneGeometry(width, length);
    geometry.rotateX(-Math.PI / 2);

    const material = MaterialLibrary.getMaterial("asphalt");
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;

    // Position at midpoint of segment
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mesh.position.copy(midpoint);

    // Rotate to align with direction
    const angle = Math.atan2(direction.x, direction.z);
    mesh.rotation.y = angle;

    return mesh;
  }

  public buildIntersection(params: IntersectionParams): THREE.Mesh {
    const { center, size = 6 } = params;

    const geometry = new THREE.PlaneGeometry(size, size);
    geometry.rotateX(-Math.PI / 2);

    const material = MaterialLibrary.getMaterial("asphalt");
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.position.copy(center);

    return mesh;
  }
}

export const RoadGenerator = RoadGeneratorClass.getInstance();
