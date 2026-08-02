export interface RegisteredModel {
  id: string;
  path: string;
  name: string;
}

export const modelRegistry: Record<string, RegisteredModel> = {
  busStandard: {
    id: "bus_standard",
    path: "/models/buses/bus-standard.glb",
    name: "Standard Transit Bus",
  },
  buildingResidential: {
    id: "building_residential",
    path: "/models/buildings/residential.glb",
    name: "Residential Block Mesh",
  },
  treePine: {
    id: "tree_pine",
    path: "/models/props/tree-pine.glb",
    name: "Pine Tree Prop",
  },
};
