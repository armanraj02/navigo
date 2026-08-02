import React from "react";

export interface DockItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

export interface FloatingDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  activeId?: string | null;
}
