"use client";

import React, { useEffect } from "react";
import { useUIStore } from "@/store/uiStore";
import { useSceneStore } from "@/store/sceneStore";

export const GlobalShortcuts: React.FC = () => {
  const openModal = useUIStore((state) => state.openModal);
  const activeModalId = useUIStore((state) => state.activeModalId);
  const setView = useUIStore((state) => state.setView);
  const toggleNightMode = useSceneStore((state) => state.toggleNightMode);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      // Close modal on Escape
      if (e.key === "Escape" && activeModalId) {
        openModal(null);
        return;
      }

      // Toggle Command Palette: Cmd/Ctrl + K or simply 'k'
      if ((e.key === "k" || e.key === "K") && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        openModal(activeModalId === "command-palette" ? null : "command-palette");
        return;
      }
      if (e.key === "k" || e.key === "K") {
        openModal(activeModalId === "command-palette" ? null : "command-palette");
        return;
      }

      // Toggle theme (Day/Night cycle toggle)
      if (e.key === "n" || e.key === "N") {
        toggleNightMode();
        return;
      }

      // View selectors: 1 = Passenger, 2 = Driver, 3 = Admin
      if (e.key === "1") {
        setView("passenger");
      } else if (e.key === "2") {
        setView("driver");
      } else if (e.key === "3") {
        setView("admin");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalId, openModal, setView, toggleNightMode]);

  return null;
};

GlobalShortcuts.displayName = "GlobalShortcuts";
export default GlobalShortcuts;
