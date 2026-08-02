# Navigo Future Roadmap

This document outlines upcoming integrations and improvements planned for Navigo.

---

## 📡 1. Production API & Database Bindings

- **REST & gRPC endpoints:** Implement production API repositories mapping search triggers and schedule inquiries to backend databases.
- **WebSocket Streaming:** Replace mock coordinates with live GPS coordinate updates streamed over WebSockets or Server-Sent Events.
- **State Syncing:** Integrate user login sessions and ticket bookings using production databases.

---

## 🏎️ 2. 3D Engine & Shader Enhancements

- **Dynamic Pathfinding:** Replace preset spline routes with real-time A* pathfinding along the procedural city street coordinates.
- **Instanced Vehicle Geometries:** Upgrade simple bus blocks to full instanced 3D vehicle geometries with dynamic headlights.
- **Custom Shaders:** Add custom screen-space ambient occlusion (SSAO) and weather rain shaders.

---

## 📱 3. Responsive Layout Extensions

- **PWA Configuration:** Convert the frontend into a Progressive Web App (PWA) to support install prompts and offline maps caching.
- **Mobile Touch Overrides:** Refine mobile touch targets and gesture controls for panning and rotating the 3D map.
