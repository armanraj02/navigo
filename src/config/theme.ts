export interface ThemeConfig {
  defaultMode: "light" | "dark" | "system";
  glassmorphism: {
    opacity: number;
    blur: string;
    border: string;
  };
  icons: {
    strokeWidth: number;
    sizes: {
      xs: number;  // 16
      sm: number;  // 20
      md: number;  // 24
      lg: number;  // 32
      xl: number;  // 48
    };
  };
}

export const themeConfig: ThemeConfig = {
  defaultMode: "dark",
  glassmorphism: {
    opacity: 0.1,
    blur: "20px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  icons: {
    strokeWidth: 1.5,
    sizes: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 32,
      xl: 48,
    },
  },
};
