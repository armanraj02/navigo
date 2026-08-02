import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "@/utils";
import {
  DrawerContentProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
} from "./Drawer.types";

export const Drawer = RadixDialog.Root;
export const DrawerTrigger = RadixDialog.Trigger;
export const DrawerClose = RadixDialog.Close;

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  DrawerContentProps & { side?: "left" | "right" }
>(({ className, children, side = "right", ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed z-50 gap-4 border border-glass-border bg-glass-bg/95 backdrop-blur-glass p-6 text-text-primary shadow-glass transition ease-in-out duration-300 focus:outline-none",
        side === "right" &&
          "top-4 bottom-4 right-4 w-96 rounded-2xl animate-in slide-in-from-right duration-300",
        side === "left" &&
          "top-4 bottom-4 left-4 w-96 rounded-2xl animate-in slide-in-from-left duration-300",
        className
      )}
      {...props}
    >
      {children}
      <RadixDialog.Close className="absolute right-4 top-4 rounded-sm opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="sr-only">Close</span>
      </RadixDialog.Close>
    </RadixDialog.Content>
  </RadixDialog.Portal>
));
DrawerContent.displayName = "DrawerContent";

export const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  DrawerTitleProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight font-display", className)}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  DrawerDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";
