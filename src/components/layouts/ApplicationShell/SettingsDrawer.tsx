"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useSceneStore } from "@/store/sceneStore";
import { Drawer, DrawerContent, DrawerTitle, DrawerDescription, Switch, Select, Divider } from "@/components/ui";

export const SettingsDrawer: React.FC = () => {
  const activeModalId = useUIStore((state) => state.activeModalId);
  const openModal = useUIStore((state) => state.openModal);

  const isNightMode = useSceneStore((state) => state.isNightMode);
  const toggleNightMode = useSceneStore((state) => state.toggleNightMode);

  const enableAudio = useSettingsStore((state) => state.enableAudio);
  const setEnableAudio = useSettingsStore((state) => state.setEnableAudio);

  const enablePostProcessing = useSettingsStore((state) => state.enablePostProcessing);
  const setEnablePostProcessing = useSettingsStore((state) => state.setEnablePostProcessing);

  const graphicsQuality = useSettingsStore((state) => state.graphicsQuality);
  const setGraphicsQuality = useSettingsStore((state) => state.setGraphicsQuality);

  const isOpen = activeModalId === "settings-drawer";

  return (
    <Drawer open={isOpen} onOpenChange={(open) => openModal(open ? "settings-drawer" : null)}>
      <DrawerContent side="right" className="flex flex-col gap-6">
        <div>
          <DrawerTitle>System Preferences</DrawerTitle>
          <DrawerDescription>Configure active client rendering and WebGL city simulation parameters.</DrawerDescription>
        </div>
        <Divider />

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold text-text-secondary select-none uppercase tracking-wider">Visual Rendering</span>
            <Select
              label="Graphics Quality Profile"
              options={[
                { value: "low", label: "Low (No Shadows)" },
                { value: "medium", label: "Medium (Hard Shadows)" },
                { value: "high", label: "High (Soft Shadows + Glows)" },
              ]}
              value={graphicsQuality}
              onChange={(val) => setGraphicsQuality(val as "low" | "medium" | "high")}
            />
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[11px] font-bold text-text-secondary select-none uppercase tracking-wider">Simulation parameters</span>
            <Switch
              label="Atmospheric Night Mode"
              checked={isNightMode}
              onCheckedChange={toggleNightMode}
            />
            <Switch
              label="Post-Processing Effects"
              checked={enablePostProcessing}
              onCheckedChange={setEnablePostProcessing}
            />
            <Switch
              label="Operational Ambient Audio"
              checked={enableAudio}
              onCheckedChange={setEnableAudio}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

SettingsDrawer.displayName = "SettingsDrawer";
export default SettingsDrawer;
