"use client";

import React from "react";

interface PassengerOverlayProps {
  children?: React.ReactNode;
}

export const PassengerOverlay: React.FC<PassengerOverlayProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-4 pb-20 select-none">
      {children}
    </div>
  );
};

PassengerOverlay.displayName = "PassengerOverlay";
export default PassengerOverlay;
