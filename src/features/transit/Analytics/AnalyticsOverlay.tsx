"use client";

import React from "react";
import { useTransitStore } from "../TrackingEngine/TransitStore";
import { useHeatMapStore } from "../HeatMap/HeatMapStore";
import { Card } from "@/components/ui";

export const AnalyticsOverlay: React.FC = () => {
  const analytics = useTransitStore((s) => s.analyticsSnapshot);
  const heatMapEnabled = useHeatMapStore((s) => s.enabled);
  const activeHeatLayer = useHeatMapStore((s) => s.activeLayer);

  const setHeatMapEnabled = useHeatMapStore((s) => s.setEnabled);
  const setHeatMapLayer = useHeatMapStore((s) => s.setActiveLayer);

  const isDegraded = analytics.averageDelayMinutes > 4;
  const statusColor = isDegraded ? "text-amber-400" : "text-emerald-400";

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none pointer-events-auto">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
          Transit Intelligence
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isDegraded ? "bg-amber-400 animate-pulse" : "bg-emerald-500"}`} />
          <span className={`text-[10px] font-bold font-mono ${statusColor}`}>
            {analytics.networkStatus}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[8px] uppercase tracking-wider text-text-muted font-mono">Vehicles</span>
          <span className="text-sm font-extrabold text-text-primary font-mono">{analytics.activeBusesCount} active</span>
        </div>
        <div className="bg-white/5 border border-white/5 p-2 rounded-xl flex flex-col">
          <span className="text-[8px] uppercase tracking-wider text-text-muted font-mono">Net Occupancy</span>
          <span className="text-sm font-extrabold text-text-primary font-mono">{analytics.averageOccupancyPercent}%</span>
        </div>
      </div>

      {/* HeatMap Control Sector */}
      <div className="flex flex-col gap-1.5 border-t border-white/5 pt-2">
        <div className="flex justify-between items-center">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono font-bold">
            Heat Map Overlays
          </span>
          <button
            onClick={() => setHeatMapEnabled(!heatMapEnabled)}
            className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded transition-all ${
              heatMapEnabled
                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/5 text-text-secondary border border-white/5"
            }`}
          >
            {heatMapEnabled ? "Active" : "Disabled"}
          </button>
        </div>

        {heatMapEnabled && (
          <div className="grid grid-cols-3 gap-1">
            {(["density", "demand", "buses"] as const).map((layer) => (
              <button
                key={layer}
                onClick={() => setHeatMapLayer(layer)}
                className={`text-[8px] font-bold uppercase py-1 rounded transition-colors ${
                  activeHeatLayer === layer
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-text-secondary hover:bg-white/10"
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

AnalyticsOverlay.displayName = "AnalyticsOverlay";
export default AnalyticsOverlay;
