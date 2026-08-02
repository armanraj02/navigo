// Live notification alerts definitions
export interface AlertMessage {
  id: string;
  type: "info" | "warning" | "error";
  title: string;
  message: string;
  timestamp: string;
}

export const postNotification = (alert: Omit<AlertMessage, "id" | "timestamp">): AlertMessage => {
  return {
    ...alert,
    id: `alert_${Date.now()}`,
    timestamp: new Date().toISOString(),
  };
};
