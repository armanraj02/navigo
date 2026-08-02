# Navigo Contributor Guidelines

This document outlines coding standards and design principles for the Navigo codebase.

---

## 📐 SOLID Principles

- **Single Responsibility Principle (SRP):** Keep UI components presentation-only. Offload business logic, state changes, and camera movements to designated Zustand stores and coordinators.
- **Dependency Inversion Principle (DIP):** Depend on interfaces under `src/integration/Contracts/` rather than concrete mock adapters directly.

---

## 🧩 Architectural Guidelines

- **Composition over Inheritance:** Compose widgets inside `PassengerHUD`, `DriverHUD`, and `OperationsHUD` rather than extending base view panels.
- **Decoupled 3D Scenes:** UI overlay widgets must never render 3D meshes inside themselves. Keep R3F components cleanly in the `src/three/` directory tree.
- **Coordinators:** All camera movements, selections, and notifications must go through coordinators (`PassengerCoordinator`, `DriverCoordinator`, `AdminCoordinator`) instead of direct component-to-component messaging.

---

## 📂 Barrel Exports (The BARREL Rule)

Every subdirectory under `src/features/` must export its public components through a single `index.ts` file in its root. 

### Guidelines:
- External components must import feature assets from the barrel (e.g. `@/features/passenger` or `@/features/driver`) rather than deep importing file paths.
- Avoid circular imports across barrels to prevent runtime bundler issues.
- All domain interface files must have clean barrel exports in `src/integration/index.ts`.
