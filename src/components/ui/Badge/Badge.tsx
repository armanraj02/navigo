import React from "react";
import { cn } from "@/utils";
import { badgeStyles } from "./Badge.styles";
import { BadgeProps } from "./Badge.types";

export const Badge: React.FC<BadgeProps> = ({ className, variant, children, ...props }) => {
  return (
    <span className={cn(badgeStyles({ variant }), className)} {...props}>
      {children}
    </span>
  );
};

Badge.displayName = "Badge";
