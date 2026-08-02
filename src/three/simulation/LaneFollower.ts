import * as THREE from "three";
import { VehicleState } from "./VehiclePool";

// Simple looping lane splines for civilian traffic
const LANE_PATHS: THREE.Vector3[][] = [
  [
    new THREE.Vector3(-80, 0.3, -2),
    new THREE.Vector3(-40, 0.3, -2),
    new THREE.Vector3(0,   0.3, -2),
    new THREE.Vector3(40,  0.3, -2),
    new THREE.Vector3(80,  0.3, -2),
  ],
  [
    new THREE.Vector3(80,  0.3, 2),
    new THREE.Vector3(40,  0.3, 2),
    new THREE.Vector3(0,   0.3, 2),
    new THREE.Vector3(-40, 0.3, 2),
    new THREE.Vector3(-80, 0.3, 2),
  ],
  [
    new THREE.Vector3(-2, 0.3, -80),
    new THREE.Vector3(-2, 0.3, -40),
    new THREE.Vector3(-2, 0.3, 0),
    new THREE.Vector3(-2, 0.3, 40),
    new THREE.Vector3(-2, 0.3, 80),
  ],
];

export class LaneFollowerClass {
  private static instance: LaneFollowerClass;
  private laneAssignments: Map<string, number> = new Map();

  private constructor() {}

  public static getInstance(): LaneFollowerClass {
    if (!LaneFollowerClass.instance) {
      LaneFollowerClass.instance = new LaneFollowerClass();
    }
    return LaneFollowerClass.instance;
  }

  public assignLane(vehicleId: string): void {
    const laneIdx = this.laneAssignments.size % LANE_PATHS.length;
    this.laneAssignments.set(vehicleId, laneIdx);
  }

  public tick(vehicle: VehicleState, delta: number): void {
    const laneIdx = this.laneAssignments.get(vehicle.id);
    if (laneIdx === undefined) return;

    const path = LANE_PATHS[laneIdx];
    const totalSeg = path.length - 1;
    const progressPerSec = vehicle.speed / (totalSeg * 80);
    vehicle.pathProgress = (vehicle.pathProgress + progressPerSec * delta) % 1;

    const rawIdx = vehicle.pathProgress * totalSeg;
    const segIdx = Math.min(Math.floor(rawIdx), totalSeg - 1);
    const frac = rawIdx - segIdx;

    const from = path[segIdx];
    const to = path[segIdx + 1] ?? path[segIdx];

    vehicle.position.lerpVectors(from, to, frac);
    vehicle.position.x += vehicle.laneOffset * 0.5;

    const dir = new THREE.Vector3().subVectors(to, from);
    if (dir.lengthSq() > 0.001) {
      vehicle.rotation = Math.atan2(dir.x, dir.z);
    }
  }
}

export const LaneFollower = LaneFollowerClass.getInstance();
