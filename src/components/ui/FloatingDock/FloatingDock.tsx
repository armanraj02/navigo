import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils";
import { GlassCard } from "../GlassCard";
import { IconButton } from "../IconButton";
import { FloatingDockProps } from "./FloatingDock.types";

export const FloatingDock: React.FC<FloatingDockProps> = ({
  className,
  items,
  activeId,
  ...props
}) => {
  return (
    <div
      className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-300", className)}
      {...props}
    >
      <GlassCard className="flex items-center gap-4 px-4 py-2 border border-glass-border shadow-glass rounded-full" padding="none">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <div key={item.id} className="relative group">
              <motion.div
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <IconButton
                  variant={isActive ? "primary" : "ghost"}
                  icon={item.icon}
                  aria-label={item.label}
                  onClick={item.onClick}
                  className={cn(
                    "h-12 w-12 rounded-full",
                    isActive ? "shadow-glow bg-primary border-primary" : "hover:bg-white/10"
                  )}
                />
              </motion.div>
              {/* Tooltip Overlay */}
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 origin-bottom">
                <div className="rounded bg-black/90 border border-glass-border px-2.5 py-1 text-xs text-white font-medium shadow-glass whitespace-nowrap">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </GlassCard>
    </div>
  );
};

FloatingDock.displayName = "FloatingDock";
