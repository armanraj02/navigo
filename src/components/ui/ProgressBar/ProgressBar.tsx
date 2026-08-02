import React from "react";
import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "@/utils";
import { ProgressBarProps } from "./ProgressBar.types";

export const ProgressBar: React.FC<ProgressBarProps> = ({
  className,
  value,
  variant = "primary",
  ...props
}) => {
  const variantColors = {
    primary: "bg-primary",
    accent: "bg-accent",
    success: "bg-success",
  };

  return (
    <RadixProgress.Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary border border-card-border/50",
        className
      )}
      value={value}
      {...props}
    >
      <RadixProgress.Indicator
        className={cn(
          "h-full w-full flex-1 transition-all duration-300 ease-out",
          variantColors[variant]
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </RadixProgress.Root>
  );
};

ProgressBar.displayName = "ProgressBar";
