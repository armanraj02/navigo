export interface MotionPhysics {
  springTension: number;
  friction: number;
  mass: number;
  velocity: number;
}

export const physicsPresets: Record<string, MotionPhysics> = {
  gentle: {
    springTension: 120,
    friction: 14,
    mass: 1,
    velocity: 0,
  },
  stiff: {
    springTension: 210,
    friction: 20,
    mass: 1,
    velocity: 0,
  },
  bouncy: {
    springTension: 180,
    friction: 12,
    mass: 1,
    velocity: 2,
  },
};
