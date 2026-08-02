import React from "react";
import { cn } from "@/utils";
import { SkeletonProps } from "./Skeleton.types";

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded bg-secondary/80", className)}
      {...props}
    />
  );
};

Skeleton.displayName = "Skeleton";
