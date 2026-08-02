# Navigo Known Limitations

This document lists design limitations and boundaries in the current client-side prototype.

---

## 🛑 Mock Integration Boundaries

- **Client-Side Storage:** User search histories and recent journeys use localStorage instead of a database, meaning they do not sync across devices.
- **Mock Predictions:** Delay projections, traffic conditions, and passenger occupancy values are calculated deterministically using time-of-day curves and pseudo-random offsets instead of real-time server streams.
- **Interactive Incidents:** Incidents reported from the Driver and Admin consoles update the UI state locally and trigger alerts, but they do not alter the physical pathfinding routes of the simulated buses.

---

## 🕰️ Simulation Clock Constraints

- **Frame Rate Lock:** The simulation updates use standard requestAnimationFrame ticks. Minimizing the browser tab can pause or slow down the clock.
- **Headway Wrap:** Schedule departures loop every 24 hours. The time wraps around at midnight without date increments.
- **Single-Bus focus:** The driver experience follow mode is pinned to `BUS-001`.
