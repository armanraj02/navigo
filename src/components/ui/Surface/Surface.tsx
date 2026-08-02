import React from "react";
import { cn } from "@/utils";
import { surfaceStyles } from "./Surface.styles";
import { SurfaceProps } from "./Surface.types";

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, tone, radius, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(surfaceStyles({ tone, radius }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Surface.displayName = "Surface";
