import React from "react";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { cn } from "@/utils";
import {
  ContextMenuContentProps,
  ContextMenuItemProps,
} from "./ContextMenu.types";

export const ContextMenu = RadixContextMenu.Root;
export const ContextMenuTrigger = RadixContextMenu.Trigger;

export const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.Content>,
  ContextMenuContentProps
>(({ className, ...props }, ref) => (
  <RadixContextMenu.Portal>
    <RadixContextMenu.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-glass-border bg-glass-bg/95 backdrop-blur-glass p-1 text-text-primary shadow-glass animate-in fade-in-80 zoom-in-95",
        className
      )}
      {...props}
    />
  </RadixContextMenu.Portal>
));
ContextMenuContent.displayName = RadixContextMenu.Content.displayName;

export const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixContextMenu.Item>,
  ContextMenuItemProps
>(({ className, ...props }, ref) => (
  <RadixContextMenu.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded px-2.5 py-2 text-sm outline-none transition-colors duration-100 hover:bg-primary hover:text-white focus:bg-primary focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = RadixContextMenu.Item.displayName;
