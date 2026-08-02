import React from "react";
import { cn } from "@/utils";
import { Button } from "../Button";
import { IconButtonProps } from "./IconButton.types";

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, icon, "aria-label": ariaLabel, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("p-2 min-w-0 flex items-center justify-center rounded-lg", className)}
        aria-label={ariaLabel}
        {...props}
      >
        {icon}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
