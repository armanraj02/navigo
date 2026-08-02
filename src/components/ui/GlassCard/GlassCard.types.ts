import React from "react";
import { CardProps } from "../Card";

export interface GlassCardProps extends Omit<CardProps, "variant"> {
  children?: React.ReactNode;
}
