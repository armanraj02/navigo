import React from "react";

export interface BusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  busId: string;
  driverName?: string;
  occupancy: number; // 0 to 100
  speedKmh: number;
  status?: "active" | "delayed" | "inactive";
  nextStop?: string;
  isSelected?: boolean;
}
