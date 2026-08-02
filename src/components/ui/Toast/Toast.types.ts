export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: "info" | "success" | "warning" | "danger";
}

export interface ToastProps {
  message: ToastMessage;
  onClose: (id: string) => void;
}
