import { DelayStatus } from "./TransitTypes";

export const BusStatusIndicator = {
  getStatus: (delayMinutes: number): DelayStatus => {
    if (delayMinutes === 0) return "On Time";
    if (delayMinutes < 0) return "Early";
    if (delayMinutes < 5) return "Minor Delay";
    return "Major Delay";
  },

  getStatusColor: (status: DelayStatus): string => {
    switch (status) {
      case "Early":
        return "#60a5fa"; // Blue
      case "On Time":
        return "#10b981"; // Emerald
      case "Minor Delay":
        return "#fbbf24"; // Amber
      case "Major Delay":
        return "#f87171"; // Red
    }
  },
};
