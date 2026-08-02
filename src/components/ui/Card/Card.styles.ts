import { cva } from "class-variance-authority";

export const cardStyles = cva(
  "rounded-2xl border transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-card text-text-primary border-card-border shadow-soft",
        glass: "bg-glass-bg backdrop-blur-glass text-text-primary border-glass-border shadow-glass",
        flat: "bg-secondary text-text-primary border-transparent",
        interactive: "bg-card text-text-primary border-card-border hover:border-primary/50 shadow-soft cursor-pointer hover:shadow-glow hover:translate-y-[-2px]",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);
