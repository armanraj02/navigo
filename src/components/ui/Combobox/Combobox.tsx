import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/utils";
import { Input } from "../Input";
import { ComboboxProps } from "./Combobox.types";

export const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Search options...",
  label,
  error,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.value === value);

  const [prevValue, setPrevValue] = useState(value);
  const [searchTerm, setSearchTerm] = useState(selectedOption ? selectedOption.label : "");

  if (value !== prevValue) {
    setPrevValue(value);
    setSearchTerm(selectedOption ? selectedOption.label : "");
  }

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        // Reset search term back to selected option label
        setSearchTerm(selectedOption ? selectedOption.label : "");
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [selectedOption]);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (val: string) => {
    if (onChange) onChange(val);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold text-text-secondary select-none">
          {label}
        </label>
      )}
      <div className="relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          error={error}
          className={className}
          rightIcon={
            <svg
              className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          }
        />
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute top-[calc(100%+4px)] left-0 z-50 w-full overflow-hidden rounded-lg border border-glass-border bg-glass-bg/95 backdrop-blur-glass text-text-primary shadow-glass p-1 max-h-60 overflow-y-auto">
          {filteredOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={cn(
                "flex w-full items-center rounded px-3 py-2 text-sm text-left outline-none transition-colors duration-100 hover:bg-primary hover:text-white focus:bg-primary focus:text-white",
                opt.value === value && "bg-primary/20 text-primary hover:bg-primary"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Combobox.displayName = "Combobox";
