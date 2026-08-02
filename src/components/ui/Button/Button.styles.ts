import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white hover:bg-primary-hover shadow-soft",
        secondary: "bg-secondary text-text-primary hover:bg-secondary-hover border border-card-border",
        ghost: "bg-transparent text-text-secondary hover:text-text-primary hover:bg-secondary",
        danger: "bg-danger text-white hover:bg-red-600 shadow-soft",
        glass: "bg-glass-bg backdrop-blur-glass text-text-primary border border-glass-border hover:bg-white/10 shadow-glass",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);
