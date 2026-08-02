import React, { useRef } from "react";
import { cn } from "@/utils";
import { OTPInputProps } from "./OTPInput.types";

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value = "",
  onChange,
  error,
  label,
  className,
}) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Split value into array
  const valueItems = value.split("").slice(0, length);
  while (valueItems.length < length) {
    valueItems.push("");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
    if (!val) return;

    const newValue = [...valueItems];
    newValue[index] = val[val.length - 1]; // Use last digit typed
    const joined = newValue.join("");

    if (onChange) onChange(joined);

    // Focus next input
    if (index < length - 1 && val) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      const newValue = [...valueItems];
      if (newValue[index]) {
        newValue[index] = "";
        const joined = newValue.join("");
        if (onChange) onChange(joined);
      } else if (index > 0) {
        // Clear previous input and focus it
        newValue[index - 1] = "";
        const joined = newValue.join("");
        if (onChange) onChange(joined);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full select-none">
      {label && (
        <label className="text-xs font-semibold text-text-secondary">
          {label}
        </label>
      )}
      <div className="flex gap-2 justify-between">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={valueItems[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={cn(
              "h-12 w-12 text-center rounded-lg border border-card-border bg-secondary text-lg font-bold text-text-primary placeholder:text-text-muted focus:border-primary focus:outline-none transition-all duration-150",
              error && "border-danger focus:border-danger",
              className
            )}
          />
        ))}
      </div>
      {error && <span className="text-xs font-medium text-danger">{error}</span>}
    </div>
  );
};

OTPInput.displayName = "OTPInput";
