import React from "react";
import { cn } from "@/utils";
import { RadioProps } from "./Radio.types";

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, options, label, error, name, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-xs font-semibold text-text-secondary select-none">
            {label}
          </label>
        )}
        <div className="flex flex-col gap-2">
          {options.map((opt) => (
            <label
              key={opt.value}
              className={cn(
                "flex items-center gap-2 text-sm text-text-primary cursor-pointer select-none",
                opt.disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <input
                ref={ref}
                type="radio"
                name={name}
                value={opt.value}
                disabled={opt.disabled}
                className={cn(
                  "h-4 w-4 rounded-full border border-card-border bg-secondary text-primary focus:ring-primary focus:ring-offset-background",
                  className
                )}
                {...props}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
        {error && <span className="text-xs font-medium text-danger">{error}</span>}
      </div>
    );
  }
);

Radio.displayName = "Radio";
