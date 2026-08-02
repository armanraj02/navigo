import React from "react";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { cn } from "@/utils";
import { MenuContentProps, MenuItemProps } from "./Menu.types";

export const Menu = RadixDropdown.Root;
export const MenuTrigger = RadixDropdown.Trigger;

export const MenuContent = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Content>,
  MenuContentProps
>(({ className, sideOffset = 4, ...props }, ref) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-glass-border bg-glass-bg/95 backdrop-blur-glass p-1 text-text-primary shadow-glass animate-in fade-in-80 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </RadixDropdown.Portal>
));
MenuContent.displayName = RadixDropdown.Content.displayName;

export const MenuItem = React.forwardRef<
  React.ElementRef<typeof RadixDropdown.Item>,
  MenuItemProps
>(({ className, ...props }, ref) => (
  <RadixDropdown.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded px-2.5 py-2 text-sm outline-none transition-colors duration-100 hover:bg-primary hover:text-white focus:bg-primary focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
));
MenuItem.displayName = RadixDropdown.Item.displayName;
