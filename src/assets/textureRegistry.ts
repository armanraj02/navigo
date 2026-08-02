export interface RegisteredTexture {
  id: string;
  path: string;
  repeat: [number, number];
}

export const textureRegistry: Record<string, RegisteredTexture> = {
  roadAsphalt: {
    id: "road_asphalt",
    path: "/textures/road-asphalt.jpg",
    repeat: [1, 10],
  },
  concreteGrid: {
    id: "concrete_grid",
    path: "/textures/concrete-grid.jpg",
    repeat: [5, 5],
  },
};
