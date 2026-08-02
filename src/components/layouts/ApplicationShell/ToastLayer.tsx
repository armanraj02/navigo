"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { useNotificationStore } from "@/store/notificationStore";
import { Toast } from "@/components/ui";

export const ToastLayer: React.FC = () => {
  const toasts = useNotificationStore((state) => state.toasts);
  const dismissToast = useNotificationStore((state) => state.dismissToast);

  return (
    <div className="fixed bottom-20 right-4 z-50 flex flex-col gap-2 pointer-events-none select-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast} onClose={dismissToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

ToastLayer.displayName = "ToastLayer";
export default ToastLayer;
