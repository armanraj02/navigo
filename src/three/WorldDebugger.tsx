"use client";

import React from "react";
import { ChunkManager } from "./ChunkManager";
import { InstancingManager } from "./InstancingManager";
import { WorldConfig } from "./WorldConfig";

interface WorldDebuggerProps {
  visible?: boolean;
}

export const WorldDebugger: React.FC<WorldDebuggerProps> = ({ visible = false }) => {
  if (!visible) return null;

  const chunks = ChunkManager.getLoadedCount();
  const instanceStats = InstancingManager.getStats();
  const worldCfg = WorldConfig;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "5rem",
        left: "1rem",
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        color: "#00e3a5",
        fontFamily: "monospace",
        fontSize: "11px",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid rgba(0, 227, 165, 0.3)",
        lineHeight: "1.8",
        pointerEvents: "none",
      }}
    >
      <div style={{ fontWeight: "bold", marginBottom: "4px" }}>WORLD DEBUG</div>
      <div>Chunks Loaded: {chunks}</div>
      <div>Chunk Size: {worldCfg.chunkSize}m</div>
      <div>Block Spacing: {worldCfg.blockSpacing}m</div>
      {Object.entries(instanceStats).map(([id, stats]) => (
        <div key={id}>
          {id}: {stats.count}/{stats.capacity}
        </div>
      ))}
    </div>
  );
};

WorldDebugger.displayName = "WorldDebugger";
export default WorldDebugger;
