import React from "react";
import { cn } from "@/utils";
import { chipStyles } from "./Chip.styles";
import { ChipProps } from "./Chip.types";

export const Chip: React.FC<ChipProps> = ({
  className,
  variant,
  active = false,
  onRemove,
  children,
  ...props
}) => {
  const activeVariant = active ? "active" : variant;

  return (
    <div
      className={cn(chipStyles({ variant: activeVariant }), className)}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="hover:bg-black/20 rounded-full p-0.5 inline-flex items-center justify-center text-current hover:text-white transition-colors duration-100"
          aria-label="Remove"
        >
          <svg
            className="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

Chip.displayName = "Chip";
