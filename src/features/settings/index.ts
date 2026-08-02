// Application customization settings module
export interface AppSettings {
  accessibilitySize: "standard" | "large";
  themeStyle: "dark" | "light" | "system";
  ambientSoundVolume: number;
}

export const loadSettings = (): AppSettings => {
  return {
    accessibilitySize: "standard",
    themeStyle: "dark",
    ambientSoundVolume: 50,
  };
};
