import React from "react";

export interface RouteStop {
  name: string;
  time: string;
}

export interface RouteCardProps extends React.HTMLAttributes<HTMLDivElement> {
  routeNumber: string;
  routeName: string;
  stopsCount: number;
  durationMinutes: number;
  stops?: RouteStop[];
  isSelected?: boolean;
}
