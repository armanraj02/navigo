"use client";

import React from "react";
import { ProfileMenu } from "./ProfileMenu";
import { SettingsDrawer } from "./SettingsDrawer";
import { CommandPaletteHost } from "./CommandPaletteHost";

export const DialogLayer: React.FC = () => {
  return (
    <>
      <ProfileMenu />
      <SettingsDrawer />
      <CommandPaletteHost />
    </>
  );
};

DialogLayer.displayName = "DialogLayer";
export default DialogLayer;
