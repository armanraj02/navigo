"use client";

import React from "react";
import { Card } from "@/components/ui";

interface AlertCardProps {
  id: string;
  message: string;
  severity: "low" | "medium" | "high";
  routeId?: string;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  message,
  severity,
  routeId,
}) => {
  const isHigh = severity === "high";

  return (
    <Card
      className={`p-3 border transition-all ${
        isHigh
          ? "bg-rose-500/10 border-rose-500/30"
          : "bg-amber-500/10 border-amber-500/30"
      }`}
    >
      <div className="flex justify-between items-start gap-2.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full ${
              isHigh ? "bg-rose-500 animate-pulse" : "bg-amber-500"
            }`}
          />
          <span className="text-[10px] font-bold text-text-primary uppercase tracking-wider font-mono">
            {isHigh ? "Service Alert" : "Minor Delays"}
          </span>
        </div>
        {routeId && (
          <span className="text-[9px] font-bold px-1.5 py-0.2 bg-white/5 border border-white/5 rounded text-text-secondary font-mono">
            Line {routeId}
          </span>
        )}
      </div>
      <p className="text-xs text-text-secondary font-medium mt-2 leading-relaxed">
        {message}
      </p>
    </Card>
  );
};

AlertCard.displayName = "AlertCard";
export default AlertCard;
