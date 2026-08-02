export interface CameraTransition {
  duration: number;
  ease: string;
}

export const cameraTransitions: Record<string, CameraTransition> = {
  default: {
    duration: 1.5,
    ease: "power2.inOut",
  },
  fast: {
    duration: 0.8,
    ease: "power1.out",
  },
  cinematic: {
    duration: 4.0,
    ease: "sine.inOut",
  },
};
