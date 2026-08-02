// Motion curves and durations inspired by Apple and Linear easing
export const easings = {
  // Cubic Beziers
  appleDefault: "cubic-bezier(0.25, 0.1, 0.25, 1)",
  appleIn: "cubic-bezier(0.42, 0, 1, 1)",
  appleOut: "cubic-bezier(0, 0, 0.58, 1)",
  appleInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
  linearDefault: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  smoothSpring: "cubic-bezier(0.175, 0.885, 0.32, 1.1)", // For overlay bounces
};

export const durations = {
  fast: 0.15,       // 150ms
  normal: 0.25,     // 250ms
  slow: 0.4,        // 400ms
  page: 0.5,        // 500ms
  camera: 1.8,      // 1800ms
  hover: 0.2,
  selection: 0.3,
  drawer: 0.35,
  dialog: 0.3,
  toast: 0.25,
};

export const motionTokens = {
  easings,
  durations,
};
