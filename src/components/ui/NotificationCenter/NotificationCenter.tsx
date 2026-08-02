import React from "react";
import { cn } from "@/utils";
import { GlassCard } from "../GlassCard";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { NotificationCenterProps } from "./NotificationCenter.types";

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  className,
  notifications,
  onDismiss,
  onClearAll,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-40 w-80 animate-in fade-in-50 slide-in-from-top-4 duration-200 select-none",
        className
      )}
    >
      <GlassCard className="flex flex-col max-h-[480px] overflow-hidden" padding="none">
        <div className="flex items-center justify-between p-4 border-b border-glass-border">
          <span className="text-xs font-semibold text-text-primary">Notifications</span>
          <div className="flex items-center gap-1">
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={onClearAll} className="h-7 text-[11px] px-2">
                Clear all
              </Button>
            )}
            <IconButton
              variant="ghost"
              icon={
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
              aria-label="Close panel"
              onClick={onClose}
              className="h-7 w-7"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center p-8 text-center text-xs text-text-muted">
              No new alerts
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2.5 rounded bg-white/5 border border-glass-border/40 p-3 hover:bg-white/10 transition-colors duration-100"
              >
                <div className="flex-1 flex flex-col gap-0.5">
                  <span className="text-[11px] font-semibold text-text-primary">{item.title}</span>
                  {item.description && (
                    <span className="text-[10px] text-text-secondary leading-normal">{item.description}</span>
                  )}
                </div>
                <button
                  onClick={() => onDismiss(item.id)}
                  className="text-text-muted hover:text-white rounded p-0.5"
                >
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </GlassCard>
    </div>
  );
};

NotificationCenter.displayName = "NotificationCenter";
