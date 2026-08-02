import { cva } from "class-variance-authority";

export const surfaceStyles = cva(
  "transition-colors duration-200",
  {
    variants: {
      tone: {
        base: "bg-background text-foreground",
        card: "bg-card text-text-primary",
        secondary: "bg-secondary text-text-secondary",
        glass: "bg-glass-bg backdrop-blur-glass text-text-primary border border-glass-border",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },
    },
    defaultVariants: {
      tone: "base",
      radius: "none",
    },
  }
);
