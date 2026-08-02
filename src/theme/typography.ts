export interface TypographyToken {
  fontFamily: string;
  fontWeight: string | number;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

export const fontFamilies = {
  sans: "var(--font-sans), Inter, system-ui, sans-serif",
  display: "Outfit, var(--font-sans), sans-serif",
  mono: "var(--font-mono), monospace",
};

export const fontWeights = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
};

export const typography: Record<string, TypographyToken> = {
  display: {
    fontFamily: fontFamilies.display,
    fontWeight: fontWeights.bold,
    fontSize: "3.5rem", // 56px
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  },
  h1: {
    fontFamily: fontFamilies.display,
    fontWeight: fontWeights.bold,
    fontSize: "2.5rem", // 40px
    lineHeight: "1.2",
    letterSpacing: "-0.015em",
  },
  h2: {
    fontFamily: fontFamilies.display,
    fontWeight: fontWeights.semibold,
    fontSize: "2rem", // 32px
    lineHeight: "1.25",
    letterSpacing: "-0.01em",
  },
  h3: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.semibold,
    fontSize: "1.5rem", // 24px
    lineHeight: "1.3",
    letterSpacing: "-0.01em",
  },
  h4: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.semibold,
    fontSize: "1.25rem", // 20px
    lineHeight: "1.35",
    letterSpacing: "-0.005em",
  },
  title: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.semibold,
    fontSize: "1.125rem", // 18px
    lineHeight: "1.4",
    letterSpacing: "0",
  },
  subtitle: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    fontSize: "1.125rem",
    lineHeight: "1.4",
    letterSpacing: "0",
  },
  bodyLarge: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    fontSize: "1.0625rem", // 17px
    lineHeight: "1.5",
    letterSpacing: "-0.005em",
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    fontSize: "0.9375rem", // 15px
    lineHeight: "1.5",
    letterSpacing: "0",
  },
  bodySmall: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    fontSize: "0.875rem", // 14px
    lineHeight: "1.45",
    letterSpacing: "0",
  },
  caption: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.normal,
    fontSize: "0.75rem", // 12px
    lineHeight: "1.4",
    letterSpacing: "0.01em",
  },
  label: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.medium,
    fontSize: "0.8125rem", // 13px
    lineHeight: "1.4",
    letterSpacing: "0.02em",
  },
  mono: {
    fontFamily: fontFamilies.mono,
    fontWeight: fontWeights.normal,
    fontSize: "0.875rem",
    lineHeight: "1.5",
    letterSpacing: "0",
  },
};
