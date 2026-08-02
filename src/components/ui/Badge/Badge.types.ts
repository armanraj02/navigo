import React from "react";
import { VariantProps } from "class-variance-authority";
import { badgeStyles } from "./Badge.styles";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeStyles> {
  children?: React.ReactNode;
}
