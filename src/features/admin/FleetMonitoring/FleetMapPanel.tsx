"use client";

import React from "react";
import { useAdminStore } from "../AdminState";
import { Card } from "@/components/ui";

export const FleetMapPanel: React.FC = () => {
  const activeFilter = useAdminStore((s) => s.activeFilter);
  const setFilter = useAdminStore((s) => s.setFilter);

  const filters = [
    { id: "all" as const, label: "All Fleet" },
    { id: "R42" as const, label: "R42" },
    { id: "R7" as const, label: "R7" },
    { id: "R15" as const, label: "R15" },
    { id: "warning" as const, label: "Alerts" },
  ];

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Operations Filters
      </span>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`text-[9px] font-bold uppercase px-2.5 py-1.5 rounded-lg border transition-all ${
                isActive
                  ? "bg-white/10 border-white/15 text-text-primary shadow-[0_2px_8px_rgba(255,255,255,0.04)]"
                  : "bg-transparent border-transparent text-text-muted hover:text-text-secondary"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

FleetMapPanel.displayName = "FleetMapPanel";
export default FleetMapPanel;
