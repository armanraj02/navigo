export interface SpringConfig {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface MotionConfig {
  defaultSpring: SpringConfig;
  defaultDuration: number;
  cameraTransitionDuration: number;
}

export const motionConfig: MotionConfig = {
  defaultSpring: {
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  defaultDuration: 0.35,
  cameraTransitionDuration: 2.0,
};
