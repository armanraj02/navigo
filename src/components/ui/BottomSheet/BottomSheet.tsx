import React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "@/utils";
import {
  BottomSheetContentProps,
  BottomSheetTitleProps,
  BottomSheetDescriptionProps,
} from "./BottomSheet.types";

export const BottomSheet = RadixDialog.Root;
export const BottomSheetTrigger = RadixDialog.Trigger;
export const BottomSheetClose = RadixDialog.Close;

export const BottomSheetContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  BottomSheetContentProps
>(({ className, children, ...props }, ref) => (
  <RadixDialog.Portal>
    <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in-0 duration-200" />
    <RadixDialog.Content
      ref={ref}
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-[50%] md:right-auto md:w-[480px] md:translate-x-[-50%] z-50 gap-4 border border-glass-border bg-glass-bg/95 backdrop-blur-glass p-6 text-text-primary shadow-glass rounded-2xl animate-in slide-in-from-bottom duration-300 focus:outline-none max-h-[85vh] overflow-y-auto",
        className
      )}
      {...props}
    >
      {/* Drag handle decorator */}
      <div className="mx-auto -mt-2 mb-4 h-1.5 w-12 rounded-full bg-zinc-700/50" />
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
BottomSheetContent.displayName = "BottomSheetContent";

export const BottomSheetTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  BottomSheetTitleProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Title
    ref={ref}
    className={cn("text-base font-semibold font-display", className)}
    {...props}
  />
));
BottomSheetTitle.displayName = "BottomSheetTitle";

export const BottomSheetDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  BottomSheetDescriptionProps
>(({ className, ...props }, ref) => (
  <RadixDialog.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
BottomSheetDescription.displayName = "BottomSheetDescription";
