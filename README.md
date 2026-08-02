# Navigo — Living City 3D Transit Simulation & Operations Center

Navigo is a premium 3D public transit simulation, journey planner, and operations control deck built on Next.js, React Three Fiber (Three.js), TailwindCSS, and Zustand. The entire city map acts as the application itself, with glassmorphic interfaces floating seamlessly above the interactive simulation.

---

## 🚀 Key Highlights & Architectural Layout

### 1. Cinematic Landing & Procedural City
- Animated camera paths glide through a procedurally generated city grid of skyscrapers, lighting grids, foliage, and live traffic.
- Day/Night cycle transitions and weather preset controls (Clear, Rain, Fog) alter global lighting and shaders in real time.

### 2. Live Transit Tracking & Telemetry
- Tracking algorithms evaluate vehicle positions, route checkmarks, speed vectors, and battery charge levels.
- Prediction engine generates confidence ratings and schedules alerts for service delays or passenger capacity warnings.

### 3. Interactive Journey Planning
- 3D route spline rendering, transfer markers, and walking pathways drawn directly on the city plane.
- Quick-select past queries chips persisted via localStorage.

### 4. Interactive Cockpit & Operations HUDs
- **Driver Terminal:** Locks camera target to vehicle paths, showing lane guidance updates, telemetry status, and incident selectors.
- **Operations Control Center:** Multi-column supervisor deck offering route filtering, roadblock logging, maintenance reports, and simulation clock speed dials.

---

## 🛠️ Tech Stack & Optimization Strategies

- **Core:** Next.js (Turbopack compiler), React, TypeScript.
- **3D Canvas:** Three.js, React Three Fiber, Drei, Post-processing.
- **State & Telemetry:** Zustand stores.
- **Styling & Motion:** TailwindCSS, Framer Motion.
- **Performance Gates:**
  - **Instancing:** Reusable building meshes and street lights to lower draw call counts.
  - **Frustum Culling & BVH:** Drei `Bvh` wrapper bounds raycasts.
  - **Dynamic Resolution:** `AdaptiveDpr` scales resolution on high-density displays.
  - **Lazy Loading:** Dev panels, comparison sheets, and debug helpers are lazy loaded via `React.lazy`.

---

## ⚙️ Quick Start

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build Production Assets
```bash
npm run build
```

---

## 📂 Documentation Directory

To explore specific modules and design documentation:
- [High-Level Architecture](file:///docs/Architecture.md)
- [Workspace Folder Layout](file:///docs/FolderStructure.md)
- [Three.js Engine Mechanics](file:///docs/ThreeEngine.md)
- [Developer Workflow & Guides](file:///docs/DeveloperGuide.md)
- [Deployment Instructions](file:///docs/DeploymentGuide.md)
- [Performance & Optimization Logs](file:///docs/PerformanceGuide.md)
- [Enterprise Integration Layer Adapters](file:///docs/IntegrationGuide.md)
- [Contributing Standards](file:///docs/Contributing.md)
- [Feature Details Summary](file:///docs/FeatureOverview.md)
- [Known Limitations Checklist](file:///docs/KnownLimitations.md)
- [Future Roadmap](file:///docs/FutureRoadmap.md)
