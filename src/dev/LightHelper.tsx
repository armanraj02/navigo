import React from "react";

export interface LightHelperProps {
  lightType?: "directional" | "ambient" | "point";
}

export const LightHelper: React.FC<LightHelperProps> = ({ lightType = "directional" }) => {
  return (
    <div className="hidden" data-debug-light={lightType}>
      {/* Light helper component for development view */}
    </div>
  );
};
