import { cva } from "class-variance-authority";

export const chipStyles = cva(
  "inline-flex items-center gap-1.5 rounded-full border text-xs px-2.5 py-1 font-medium transition-all duration-150 select-none",
  {
    variants: {
      variant: {
        default: "bg-secondary text-text-primary border-card-border hover:bg-zinc-800",
        active: "bg-primary text-white border-primary shadow-soft",
        glass: "bg-glass-bg backdrop-blur-glass text-text-primary border-glass-border hover:bg-white/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
