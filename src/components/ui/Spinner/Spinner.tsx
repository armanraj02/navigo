import React from "react";
import { cn } from "@/utils";
import { SpinnerProps } from "./Spinner.types";

export const Spinner: React.FC<SpinnerProps> = ({
  className,
  size = "md",
  variant = "primary",
  ...props
}) => {
  const sizeClasses = {
    sm: "h-4 w-4 stroke-[2.5]",
    md: "h-8 w-8 stroke-[2]",
    lg: "h-12 w-12 stroke-[1.5]",
  };

  const variantColors = {
    primary: "text-primary",
    secondary: "text-text-secondary",
    white: "text-white",
  };

  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      {...props}
    >
      <svg
        className={cn("animate-spin", sizeClasses[size], variantColors[variant])}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
        />
        <path
          className="opacity-80"
          d="M12 2C6.477 2 2 6.477 2 12"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

Spinner.displayName = "Spinner";
