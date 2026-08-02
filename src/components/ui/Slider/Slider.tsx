import React from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { cn } from "@/utils";
import { SliderProps } from "./Slider.types";

export const Slider = React.forwardRef<
  React.ElementRef<typeof RadixSlider.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <RadixSlider.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <RadixSlider.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary border border-card-border/50">
      <RadixSlider.Range className="absolute h-full bg-primary" />
    </RadixSlider.Track>
    <RadixSlider.Thumb className="block h-5 w-5 rounded-full border border-card-border bg-white shadow-soft ring-offset-background transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing" />
  </RadixSlider.Root>
));

Slider.displayName = "Slider";
