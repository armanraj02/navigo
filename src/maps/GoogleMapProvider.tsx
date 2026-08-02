"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { MapTheme, MapThemeMode } from "./MapTheme";
import { MapManager } from "./MapManager";

interface MapContextProps {
  map: google.maps.Map | null;
  isLoaded: boolean;
  theme: MapThemeMode;
  setTheme: (theme: MapThemeMode) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const useGoogleMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useGoogleMap must be used within a GoogleMapProvider");
  }
  return context;
};

interface GoogleMapProviderProps {
  children: React.ReactNode;
}

export const GoogleMapProvider: React.FC<GoogleMapProviderProps> = ({ children }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setThemeState] = useState<MapThemeMode>("dark");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    if (!apiKey || apiKey.includes("MockKey")) {
      // Fallback state: mock load success to draw background grid
      setTimeout(() => setIsLoaded(true), 0);
      return;
    }

    if (window.google?.maps) {
      setTimeout(() => setIsLoaded(true), 0);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry,drawing`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setTimeout(() => setIsLoaded(true), 0);
    };
    script.onerror = () => {
      // Fallback to mock on load failure
      setTimeout(() => setIsLoaded(true), 0);
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLoaded || !containerRef.current || map) return;

    if (window.google?.maps) {
      // Initialize real map instance
      const mapInstance = new window.google.maps.Map(containerRef.current, {
        center: { lat: 37.7894, lng: -122.4014 }, // Default: SF Financial District
        zoom: 16,
        styles: MapTheme.getStyleByMode(theme),
        disableDefaultUI: true,
        gestureHandling: "cooperative",
      });
      setMap(mapInstance);
      MapManager.setMap(mapInstance);
    }
  }, [isLoaded, map, theme]);

  const setTheme = (newTheme: MapThemeMode) => {
    setThemeState(newTheme);
    if (map && window.google?.maps) {
      map.setOptions({ styles: MapTheme.getStyleByMode(newTheme) });
    }
  };

  return (
    <MapContext.Provider value={{ map, isLoaded, theme, setTheme }}>
      <div className="absolute inset-0 z-0">
        <div ref={containerRef} className="w-full h-full bg-zinc-950" />
        {/* Render fallback background grid if using simulated key */}
        {(!map) && (
          <div className="absolute inset-0 bg-zinc-950 opacity-90 flex items-center justify-center pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest animate-pulse z-10">
              Digital Twin Background (Key Simulation Offline)
            </span>
          </div>
        )}
      </div>
      {children}
    </MapContext.Provider>
  );
};
