import React from "react";

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "success" | "warning" | "danger" | "info" | "offline";
  pulse?: boolean;
  label?: string;
}
