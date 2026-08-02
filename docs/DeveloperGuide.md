# Navigo Developer Guide

Welcome to the Navigo codebase! This guide covers local development setup, workflow guidelines, and engine contracts.

---

## 🛠️ Developer Setup & Setup

1. **Verify Node.js Version:** Use Node.js v20 or newer.
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run Dev Mode:**
   ```bash
   npm run dev
   ```
4. **Compile Production Bundle:**
   ```bash
   npm run build
   ```

---

## 📐 Coordinates & Scale System

- **Unit Scale:** 1 unit in the 3D scene maps to 1 meter in real space.
- **Velocity Conversion:** Speed in the simulation is calculated in meters per second. 
  - Formula: `speedKmh = Math.round(speed * 3.6)`
- **Map Boundaries:** The default procedural city coordinates range from `[-80, 80]` on the X and Z axes. The elevation height of stops is set to `Y = 0.1` and vehicle boxes glide at `Y = 0.5`.

---

## 📢 Singleton Event Hub (`src/three/SceneEvents.ts`)

Components communicate using the `SceneEvents` pub-sub event hub to keep widgets decoupled.

### Subscribing to events:
```typescript
import { SceneEvents } from "@/three/SceneEvents";

useEffect(() => {
  const unsubscribe = SceneEvents.subscribe("BUS_SELECTED", (busId) => {
    console.log(`Vehicle selected: ${busId}`);
  });
  return () => unsubscribe();
}, []);
```

### Publishing events:
```typescript
SceneEvents.emit("TRANSIT_ALERT", "R42");
```

---

## 📸 Camera Control Flow

To avoid conflicting transitions and abrupt camera jumps, follow this orchestration contract:

```
[UI Widgets] ──> [Coordinator.setCameraMode] ──> [SceneManager] ──> [CameraController.flyTo()]
```

Always use `flyTo` for smooth interpolation instead of mutating position coordinates directly.
