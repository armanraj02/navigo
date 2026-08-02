"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { useNotificationStore } from "@/store/notificationStore";
import { NotificationCenter } from "@/components/ui";

export const NotificationLayer: React.FC = () => {
  const activeModalId = useUIStore((state) => state.activeModalId);
  const openModal = useUIStore((state) => state.openModal);

  const notifications = useNotificationStore((state) => state.notifications);
  const dismissNotification = useNotificationStore((state) => state.dismissNotification);
  const clearAllNotifications = useNotificationStore((state) => state.clearAllNotifications);

  const isOpen = activeModalId === "notification-center";

  return (
    <NotificationCenter
      isOpen={isOpen}
      onClose={() => openModal(null)}
      notifications={notifications}
      onDismiss={dismissNotification}
      onClearAll={clearAllNotifications}
    />
  );
};

NotificationLayer.displayName = "NotificationLayer";
export default NotificationLayer;
