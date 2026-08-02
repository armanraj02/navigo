"use client";

import React from "react";
import { useTransitStore } from "@/features/transit/TrackingEngine/TransitStore";
import { Card } from "@/components/ui";

export const NetworkAnalytics: React.FC = () => {
  const analytics = useTransitStore((s) => s.analyticsSnapshot);

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3.5 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Network Performance
      </span>

      <div className="flex flex-col gap-2.5">
        {/* Metric 1 */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-text-secondary">Average Network Delay:</span>
          <span className="font-bold text-text-primary font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded">
            {analytics.averageDelayMinutes} mins
          </span>
        </div>

        {/* Metric 2 */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-text-secondary">Load Utilization:</span>
          <span className="font-bold text-text-primary font-mono bg-white/5 border border-white/5 px-2 py-0.5 rounded">
            {analytics.averageOccupancyPercent}%
          </span>
        </div>

        {/* Metric 3 */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-text-secondary">Fleet Operational Rate:</span>
          <span className="font-bold text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            94.2%
          </span>
        </div>

        {/* Metric 4 */}
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-text-secondary">Net Carbon Savings:</span>
          <span className="font-bold text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            184 kg CO2
          </span>
        </div>
      </div>
    </Card>
  );
};

NetworkAnalytics.displayName = "NetworkAnalytics";
export default NetworkAnalytics;
