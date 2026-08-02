import { ToastMessage } from "../Toast";

export interface NotificationCenterProps {
  notifications: ToastMessage[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}
