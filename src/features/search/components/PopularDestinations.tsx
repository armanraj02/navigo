"use client";

import React from "react";
import { Button } from "@/components/ui";

interface PopularDestinationsProps {
  onSelect: (dest: string) => void;
}

export const PopularDestinations: React.FC<PopularDestinationsProps> = ({ onSelect }) => {
  const destinations = ["Airport Terminal", "City Center", "Waterfront", "University Gate"];

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono">
        Popular Locations
      </span>
      <div className="flex flex-wrap gap-1.5">
        {destinations.map((dest) => (
          <Button
            key={dest}
            variant="ghost"
            className="text-[11px] h-7 px-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-text-secondary font-medium"
            onClick={() => onSelect(dest)}
          >
            {dest}
          </Button>
        ))}
      </div>
    </div>
  );
};

PopularDestinations.displayName = "PopularDestinations";
export default PopularDestinations;
