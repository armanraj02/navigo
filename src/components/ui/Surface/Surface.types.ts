import React from "react";
import { VariantProps } from "class-variance-authority";
import { surfaceStyles } from "./Surface.styles";

export interface SurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof surfaceStyles> {
  children?: React.ReactNode;
}
