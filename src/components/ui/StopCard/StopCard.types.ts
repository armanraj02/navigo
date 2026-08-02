import React from "react";

export interface UpcomingArrival {
  routeNumber: string;
  etaMinutes: number;
}

export interface StopCardProps extends React.HTMLAttributes<HTMLDivElement> {
  stopName: string;
  locationDetails?: string;
  arrivals?: UpcomingArrival[];
  isSelected?: boolean;
}
