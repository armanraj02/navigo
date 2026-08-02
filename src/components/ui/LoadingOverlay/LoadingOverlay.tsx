import React from "react";
import { Spinner } from "../Spinner";
import { LoadingOverlayProps } from "./LoadingOverlay.types";

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show, message = "Loading system..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md select-none animate-in fade-in-0 duration-200">
      <div className="flex flex-col items-center gap-4 text-center">
        <Spinner size="lg" />
        <span className="font-display font-semibold text-sm text-text-primary uppercase tracking-wider animate-pulse">
          {message}
        </span>
      </div>
    </div>
  );
};

LoadingOverlay.displayName = "LoadingOverlay";
