import React from "react";
import { cn } from "@/utils";
import { DividerProps } from "./Divider.types";

export const Divider: React.FC<DividerProps> = ({
  className,
  orientation = "horizontal",
  flex = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-card-border shrink-0",
        orientation === "horizontal" ? "h-[1px] w-full" : "w-[1px] h-full",
        flex && "flex-1",
        className
      )}
      role="none"
      {...props}
    />
  );
};

Divider.displayName = "Divider";
