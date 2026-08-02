// Semantic Design System Colors (WebGL & DOM unified)
export const rawColors = {
  // Brand
  obsidian: "#09090b",
  zinc900: "#18181b",
  zinc800: "#27272a",
  zinc700: "#3f3f46",
  zinc400: "#a1a1aa",
  zinc100: "#f4f4f5",
  white: "#ffffff",

  // Brand Accents
  teslaRed: "#e82127",
  appleBlue: "#0071e3",
  emeraldGreen: "#10b981",
  amberYellow: "#f59e0b",
  skyBlue: "#38bdf8",

  // Map elements colors (Three.js/WebGL maps)
  mapRoad: "#1e1e24",
  mapWater: "#0f172a",
  mapPark: "#064e3b",
  mapBuilding: "#111115",
  mapBuildingEmissive: "#0071e3",
  mapBusRoute: "#10b981",
  mapTrafficLow: "#10b981",
  mapTrafficMedium: "#f59e0b",
  mapTrafficHigh: "#e82127",
};

// Semantic Tokens (support dark mode by default, referenceable in Three.js & Tailwind)
export const colors = {
  background: "var(--background)",
  foreground: "var(--foreground)",

  primary: "var(--primary)",
  primaryHover: "var(--primary-hover)",
  primaryGlow: "var(--primary-glow)",

  secondary: "var(--secondary)",
  secondaryHover: "var(--secondary-hover)",

  accent: "var(--accent)",
  accentHover: "var(--accent-hover)",

  card: "var(--card)",
  cardBorder: "var(--card-border)",

  glass: "var(--glass-bg)",
  glassBorder: "var(--glass-border)",

  text: {
    primary: "var(--text-primary)",
    secondary: "var(--text-secondary)",
    muted: "var(--text-muted)",
    disabled: "var(--text-disabled)",
  },

  status: {
    success: "var(--success)",
    warning: "var(--warning)",
    danger: "var(--danger)",
    info: "var(--info)",
  },

  map: {
    road: rawColors.mapRoad,
    water: rawColors.mapWater,
    park: rawColors.mapPark,
    building: rawColors.mapBuilding,
    buildingGlow: rawColors.mapBuildingEmissive,
    route: rawColors.mapBusRoute,
    trafficLow: rawColors.mapTrafficLow,
    trafficMedium: rawColors.mapTrafficMedium,
    trafficHigh: rawColors.mapTrafficHigh,
  },
};
