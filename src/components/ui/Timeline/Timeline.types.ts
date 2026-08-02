import React from "react";

export interface TimelineNode {
  title: string;
  description?: string;
  time?: string;
  status?: "pending" | "active" | "completed";
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  nodes: TimelineNode[];
}
