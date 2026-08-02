# Navigo Performance & Rendering Guide

Navigo targets a smooth 60 FPS experience by separating R3F rendering contexts from UI overlays and using optimized rendering methods.

---

## 🎨 Three.js / R3F Canvas Settings

- **`AdaptiveDpr`:** Adapts pixel resolution on high-density displays (Retina, mobile screens), reducing frame size scaling if rendering speeds fall below 50 FPS.
- **`Bvh` (Bounding Volume Hierarchy):** Speeds up raycasting by grouping building meshes.
- **`powerPreference: "high-performance"`:** Instructs compatible hardware and GPUs to allocate maximum performance resources to the Canvas thread.

---

## 🏗️ Building Instancing (`src/three/BuildingFactory.ts`)

Instead of compiling separate meshes and materials for each skyscraper (which increases draw calls and GPU stall latency), Navigo utilizes **InstancedMesh** buffers:
- A single box geometry and glass material are instanced across hundreds of coordinates.
- Multi-colored arrays are bound in GPU buffer variables.
- **Outcome:** Lower draw calls, keeping frame times under 16ms.

---

## 🌫️ Level of Detail (LOD) & Culling

- **Frustum Culling:** R3F automatically discards building rendering passes when skyscrapers coordinates fall outside the active camera FOV boundary.
- **Dynamic Chunks Loading:** Subsystems partition terrain meshes. As cameras fly along coordinates, distant street foliage elements drop render passes.
- **Dev Overlays Lazy Loading:** Debug panels, timelines, and dev inspectors are lazily loaded to ensure production builds are stripped of heavy rendering loops.

---

## 🧼 Garbage Collection & Allocations

To prevent rendering pauses caused by garbage collection sweeps:
- **Reuse Vectors:** Coordinate calculations within `useFrame` animations reuse single local vector variables (`new THREE.Vector3()`) instead of instantiating new vectors on every frame.
- **Dispose Unused Resources:** On view switches (e.g. going from Passenger view to Driver Cockpit), old splines, lines materials, and marker shapes are disposed using the `dispose()` callback to avoid GPU memory leaks.
