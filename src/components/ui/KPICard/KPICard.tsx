import React from "react";
import { cn } from "@/utils";
import { GlassCard } from "../GlassCard";
import { KPICardProps } from "./KPICard.types";

export const KPICard: React.FC<KPICardProps> = ({
  className,
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  ...props
}) => {
  const changeColors = {
    positive: "text-success",
    negative: "text-danger",
    neutral: "text-text-muted",
  };

  const changeSymbols = {
    positive: "↑",
    negative: "↓",
    neutral: "→",
  };

  return (
    <GlassCard className={cn("flex flex-col gap-3 min-w-[200px]", className)} {...props}>
      <div className="flex items-center justify-between w-full select-none">
        <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">{title}</span>
        {icon && <span className="text-text-muted shrink-0">{icon}</span>}
      </div>
      <div className="flex flex-col gap-1 select-none">
        <span className="font-display font-bold text-2xl text-text-primary">{value}</span>
        {change && (
          <div className="flex items-center gap-1 text-[11px] font-semibold">
            <span className={changeColors[changeType]}>{changeSymbols[changeType]} {change}</span>
            <span className="text-text-muted">vs last period</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

KPICard.displayName = "KPICard";
