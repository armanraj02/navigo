import React from "react";
import { Card } from "../Card";
import { GlassCardProps } from "./GlassCard.types";

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, ...props }, ref) => {
    return (
      <Card ref={ref} variant="glass" {...props}>
        {children}
      </Card>
    );
  }
);

GlassCard.displayName = "GlassCard";
