import React from "react";
import { VariantProps } from "class-variance-authority";
import { chipStyles } from "./Chip.styles";

export interface ChipProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipStyles> {
  active?: boolean;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}
