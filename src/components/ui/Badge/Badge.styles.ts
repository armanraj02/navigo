import { cva } from "class-variance-authority";

export const badgeStyles = cva(
  "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold transition-colors duration-150 border",
  {
    variants: {
      variant: {
        default: "bg-secondary text-text-primary border-card-border",
        primary: "bg-primary/10 text-primary border-primary/20",
        success: "bg-success/10 text-success border-success/20",
        warning: "bg-warning/10 text-warning border-warning/20",
        danger: "bg-danger/10 text-danger border-danger/20",
        info: "bg-info/10 text-info border-info/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
