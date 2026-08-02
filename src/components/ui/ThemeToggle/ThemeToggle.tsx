import React from "react";
import { useSceneStore } from "@/store/sceneStore";
import { IconButton } from "../IconButton";

export const ThemeToggle: React.FC = () => {
  const isNightMode = useSceneStore((state) => state.isNightMode);
  const toggleNightMode = useSceneStore((state) => state.toggleNightMode);

  return (
    <IconButton
      variant="ghost"
      icon={
        isNightMode ? (
          <svg className="h-5 w-5 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
        ) : (
          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )
      }
      aria-label="Toggle Theme Mode"
      onClick={toggleNightMode}
    />
  );
};

ThemeToggle.displayName = "ThemeToggle";
