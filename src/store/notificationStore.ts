import { create } from "zustand";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "danger";
}

export interface NotificationState {
  toasts: ToastMessage[];
  notifications: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;
  addNotification: (notification: Omit<ToastMessage, "id">) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  toasts: [],
  notifications: [
    { id: "init-1", title: "Navigo Platform Online", description: "All simulated transit modules initialized.", type: "success" },
    { id: "init-2", title: "Daylight System Bound", description: "Day/night simulation cycle active.", type: "info" },
  ],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));
  },
  dismissToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification = { ...notification, id };
    set((state) => ({ notifications: [newNotification, ...state.notifications] }));
  },
  dismissNotification: (id) =>
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
  clearAllNotifications: () => set({ notifications: [] }),
}));
