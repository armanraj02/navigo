# Navigo 3D Engine & Rendering Mechanics

This document covers details on the Three.js, React Three Fiber (R3F), and Drei rendering engine that powers Navigo.

---

## 🎨 Scene Graph Hierarchy

```
Canvas (ThreeCanvas.tsx)
  └── Bvh (Raycast Acceleration)
        └── SceneRoot
              ├── EnvironmentLayer (Sky, Clouds)
              ├── LightingLayer (Day/Night Directional Rigs)
              ├── ProceduralCity (Instanced Buildings, Roads, Stop Markers)
              ├── SimulationLayer (Live vehicle meshes, Passenger markers)
              └── EffectsLayer (Post-processing, Spline paths, Transfer markers, Replay boxes)
```

---

## 🏎️ Geometry Instancing & Batching

To maintain 60 FPS while rendering hundreds of buildings and lights, Navigo uses geometry instancing:
- **`BuildingFactory.ts`**: Merges skyscraper structures into a single `InstancedMesh` representation. Color attributes are modified directly on instance indices.
- **`StreetLightSystem.tsx`**: Batches street lamp poles and light source meshes, keeping draw calls below 100 on average.

---

## 📸 Dynamic Camera Tracking & Damping

- **Motion Damping:** Frame updates use custom damping functions to smoothly transition positions.
- **Flight Interpolation:** `TransitionEngine.ts` uses cubic ease-out transitions (`easeOutCubic`) to glide targets smoothly without jarring coordinate jumps.
- **Locked Tracking:** Follow views calculate offset vectors behind moving vehicle coordinates, adjusting for rotation heading on tick.
