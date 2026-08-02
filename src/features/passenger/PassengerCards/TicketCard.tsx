"use client";

import React from "react";
import { Card, Button } from "@/components/ui";

interface TicketCardProps {
  fromStopName: string;
  toStopName: string;
  fare: number;
  onClose: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  fromStopName,
  toStopName,
  fare,
  onClose,
}) => {
  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full select-none flex flex-col gap-3.5 relative overflow-hidden">
      {/* Glossy Ticket Cutout Effect */}
      <div className="absolute left-0 right-0 top-1/2 h-2.5 flex justify-between items-center px-0 pointer-events-none transform -translate-y-1/2">
        <div className="w-1.5 h-3 bg-background border-r border-white/10 rounded-r-full -ml-[1px]" />
        <div className="w-1.5 h-3 bg-background border-l border-white/10 rounded-l-full -mr-[1px]" />
      </div>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-text-muted font-bold font-mono tracking-wider">
            NAVIGO TICKET PASS
          </span>
          <span className="text-xs font-bold text-text-primary">Single Fare Entry</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close ticket"
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-3 py-2 border-b border-dashed border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">
              From
            </span>
            <span className="text-xs font-bold text-text-primary truncate max-w-[120px]">
              {fromStopName}
            </span>
          </div>
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
          <div className="flex flex-col items-end">
            <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">
              To
            </span>
            <span className="text-xs font-bold text-text-primary truncate max-w-[120px]">
              {toStopName}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 pt-3">
        {/* Mock QR Code block */}
        <div className="w-28 h-28 bg-white p-2 rounded-xl flex items-center justify-center border border-white/10 shadow-lg">
          <div className="w-full h-full border-4 border-black/80 border-double flex flex-col items-center justify-center bg-zinc-100 p-1">
            {/* Simple abstract block layout resembling QR code */}
            <div className="grid grid-cols-4 gap-1 w-full h-full">
              {Array.from({ length: 16 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    (i * 7) % 3 === 0 || i === 0 || i === 3 || i === 12
                      ? "bg-black"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[9px] uppercase tracking-wider text-text-muted font-mono">
            Transaction Fare
          </span>
          <span className="text-sm font-extrabold text-blue-400 font-mono">
            ${fare.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        onClick={() => window.print()}
        className="w-full text-xs h-9 justify-center gap-2 border border-white/5 bg-white/5 hover:bg-white/10 mt-1"
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        Save receipt / Print
      </Button>
    </Card>
  );
};

TicketCard.displayName = "TicketCard";
export default TicketCard;
