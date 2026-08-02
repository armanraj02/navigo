import React, { useEffect } from "react";
import { useSceneStore } from "@/store/sceneStore";

export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const isNightMode = useSceneStore((state) => state.isNightMode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isNightMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isNightMode]);

  return <>{children}</>;
};

ThemeProvider.displayName = "ThemeProvider";
