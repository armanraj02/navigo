# Navigo Workspace Folder structure

Navigo is organized into modular vertical domains to keep UI views separate from Three.js scene architectures.

---

## 📂 Core Folder Layout

```
src/
├── app/                  ← Next.js pages, layouts, and style entries
├── components/           ← Reusable atom UI elements (Card, Button, Dialog)
├── store/                ← Global UIState, SceneState, and CameraState stores
├── config/               ← Menu maps and static display settings
├── three/                ← R3F Canvas and 3D simulation systems
│   ├── camera/           ← Camera controllers
│   ├── simulation/       ← Headway schedules, Clocks, and spawner scripts
│   ├── world/            ← Terrain, Lighting, Skybox, and Effects layers
│   └── SceneEvents.ts    ← Singleton event hub
├── features/             ← Modular console slices
│   ├── landing/          ← Cinematic intro overlays
│   ├── passenger/        ← Stop selections, location widgets, coordinates
│   ├── journey/          ← Route generators, comparisons, history lists
│   ├── transit/          ← Prediction engine, alerts queue, timelines, heatmaps
│   └── driver/           ← Telemetry cockpit cards, incident managers
├── integration/          ← Enterprise integration contracts and mock adapters
│   ├── Contracts/        ← Repository and provider type definitions
│   ├── ApiClient/        ← Network protocol connectors
│   ├── DependencyInjection/ ← Service registries
│   └── MockImplementations/ ← Simulators mock adapters
```

---

## 🔒 Dependency Rules & Constraints
1. **R3F Scene / UI Overlays separation:** Components under `src/features/` must only render 2D glassmorphic overlay widgets. They must never directly render R3F mesh geometries inside themselves. Instead, 3D elements are rendered inside `src/three/world/EffectsLayer.tsx` or `src/three/world/WorldComposer.tsx`.
2. **Camera Contract:** UI components must never mutate `useCameraStore` properties directly. They must call the designated feature `Coordinator`, which forwards commands to `CameraController.flyTo()`.
3. **Enterprise Contract swappability:** All data loading actions in repositories must leverage types defined under `src/integration/Contracts/` so they remain decoupled from final server protocols.
