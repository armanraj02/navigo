import React from "react";
import { cn } from "@/utils";
import { GlassCard } from "../GlassCard";
import { TopNavbarProps } from "./TopNavbar.types";

export const TopNavbar: React.FC<TopNavbarProps> = ({
  className,
  title,
  actions,
  ...props
}) => {
  return (
    <div
      className={cn("fixed top-4 left-[22rem] right-4 z-30 transition-all duration-300", className)}
      {...props}
    >
      <GlassCard className="flex items-center justify-between h-14 px-6" padding="none">
        <h1 className="font-display font-semibold text-text-primary text-sm tracking-wide">
          {title}
        </h1>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </GlassCard>
    </div>
  );
};

TopNavbar.displayName = "TopNavbar";
