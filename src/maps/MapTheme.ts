import { TeslaDarkStyle, AppleLightStyle, MinimalDarkStyle } from "./MapStyles";

export type MapThemeMode = "dark" | "light" | "minimal";

export const MapTheme = {
  getStyleByMode: (mode: MapThemeMode): google.maps.MapTypeStyle[] => {
    switch (mode) {
      case "dark":
        return TeslaDarkStyle;
      case "light":
        return AppleLightStyle;
      case "minimal":
        return MinimalDarkStyle;
      default:
        return TeslaDarkStyle;
    }
  },
};
