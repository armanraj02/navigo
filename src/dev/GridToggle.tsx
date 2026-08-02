import React from "react";

export interface GridToggleProps {
  onToggle?: (enabled: boolean) => void;
}

export const GridToggle: React.FC<GridToggleProps> = ({ onToggle }) => {
  const handleClick = () => {
    if (onToggle) onToggle(true);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-24 z-50 rounded bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs text-zinc-400 hover:text-white"
    >
      Toggle Debug Grid
    </button>
  );
};
