# Navigo Feature Overview

This document provides a walkthrough of Navigo's user-facing consoles.

---

## 🧭 Passenger Console & Journey Search

The Passenger Console focuses on route planning and live schedule tracking:
- **Search Panel:** Origin/destination select widgets with a swap button. Includes quick suggestions and autocomplete options.
- **Results List:** Displays route cards indicating duration, carbon footprint, fares, and active transfer alerts.
- **Comparison Panel:** Side-by-side comparison matrix highlighting the fastest, cheapest, and most eco-friendly routes.
- **Search Suggestions:** Displays recent searches from localStorage.
- **3D Renderings:** Highlights route segments in the 3D view: walking paths (dashed lines), transfers (amber stop rings), and route lines (glowing paths).

---

## 🎛️ Driver Operations Cockpit

The Driver Console focuses on vehicle operations:
- **Dashboard Widget:** Live display of current speed, battery level, passenger count, and route progress.
- **Navigation Panel:** Flashing indicators that preview upcoming turns.
- **Timeline Progress:** Chronological stop list checking off completed segments.
- **Incident Logger:** Panel to log roadblocks or vehicle alerts, which triggers active service warnings.
- **Camera Presets:** Switch between Cockpit (first-person), Follow (third-person), and Orbit views.

---

## 📡 Operations Control Center (Admin Desk)

The Admin Console provides fleet-wide management:
- **Fleet List:** Status grid showing coordinates, delays, and battery levels for all active buses.
- **Simulation Control:** Options to play/pause the simulation clock, change speed multipliers (10x, 60x, 240x), select weather presets, and toggle night mode.
- **Incident Queue:** Active dispatch queue that lets supervisors log new roadblock reports and resolve ongoing alerts.
- **Reports Export:** Interface to export efficiency summaries.
