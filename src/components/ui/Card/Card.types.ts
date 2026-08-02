import React from "react";
import { VariantProps } from "class-variance-authority";
import { cardStyles } from "./Card.styles";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardStyles> {
  children?: React.ReactNode;
}
