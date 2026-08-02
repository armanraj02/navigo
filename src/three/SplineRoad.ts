import * as THREE from "three";

export interface SplineRoadParams {
  points: THREE.Vector3[];
  width?: number;
  segments?: number;
}

export class SplineRoadClass {
  public buildFromPoints(params: SplineRoadParams): THREE.Mesh {
    const { points, width = 4, segments = 20 } = params;

    const curve = new THREE.CatmullRomCurve3(points);
    const path = new THREE.TubeGeometry(curve, segments, width / 2, 4, false);
    const material = new THREE.MeshStandardMaterial({
      color: "#27272a",
      roughness: 0.85,
      metalness: 0.1,
    });

    const mesh = new THREE.Mesh(path, material);
    mesh.receiveShadow = true;
    return mesh;
  }

  public buildCurvePoints(curve: THREE.CatmullRomCurve3, count: number): THREE.Vector3[] {
    return curve.getPoints(count);
  }
}

export const SplineRoad = new SplineRoadClass();
