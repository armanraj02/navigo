"use client";

import React from "react";
import { Card } from "@/components/ui";

export const Reports: React.FC = () => {
  const handleExport = (reportName: string) => {
    alert(`Operations log [${reportName}] compiled and exported successfully to fleet systems.`);
  };

  const docs = ["Fleet Efficiency Log", "Disruptions Audit Summary", "Energy Consumption Audit"];

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
        Operations Reports Log
      </span>

      <div className="flex flex-col gap-2">
        {docs.map((doc, idx) => (
          <button
            key={idx}
            onClick={() => handleExport(doc)}
            className="flex items-center justify-between text-left text-xs bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 p-2.5 rounded-xl transition-all w-full"
          >
            <span className="font-semibold text-text-secondary truncate pr-3">{doc}</span>
            <span className="text-[9px] text-blue-400 font-bold uppercase shrink-0">
              Export
            </span>
          </button>
        ))}
      </div>
    </Card>
  );
};

Reports.displayName = "Reports";
export default Reports;
