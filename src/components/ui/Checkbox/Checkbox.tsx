import React from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { cn } from "@/utils";
import { CheckboxProps } from "./Checkbox.types";

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, label, error, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <RadixCheckbox.Root
          ref={ref}
          className={cn(
            "peer h-5 w-5 shrink-0 rounded border border-card-border bg-secondary flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:outline-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white",
            error && "border-danger",
            className
          )}
          {...props}
        >
          <RadixCheckbox.Indicator className="flex items-center justify-center text-current">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <label className="text-sm font-medium text-text-primary select-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-50">
            {label}
          </label>
        )}
      </div>
      {error && <span className="text-xs font-medium text-danger">{error}</span>}
    </div>
  );
});

Checkbox.displayName = "Checkbox";
