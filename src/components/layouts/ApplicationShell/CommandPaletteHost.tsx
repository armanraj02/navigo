"use client";

import React, { useState } from "react";
import { useUIStore } from "@/store/uiStore";
import { useSceneStore } from "@/store/sceneStore";
import { useSettingsStore } from "@/store/settingsStore";
import { Dialog, DialogContent, DialogTitle, Input, Divider } from "@/components/ui";

export const CommandPaletteHost: React.FC = () => {
  const activeModalId = useUIStore((state) => state.activeModalId);
  const openModal = useUIStore((state) => state.openModal);
  const setView = useUIStore((state) => state.setView);

  const toggleNightMode = useSceneStore((state) => state.toggleNightMode);
  const setEnableAudio = useSettingsStore((state) => state.setEnableAudio);
  const enableAudio = useSettingsStore((state) => state.enableAudio);

  const [searchQuery, setSearchQuery] = useState("");

  const isOpen = activeModalId === "command-palette";

  const commandItems = [
    {
      id: "view-passenger",
      title: "Switch to Passenger Console",
      category: "Navigation",
      action: () => {
        setView("passenger");
        openModal(null);
      },
    },
    {
      id: "view-driver",
      title: "Switch to Driver Terminal",
      category: "Navigation",
      action: () => {
        setView("driver");
        openModal(null);
      },
    },
    {
      id: "view-admin",
      title: "Switch to Fleet Analytics",
      category: "Navigation",
      action: () => {
        setView("admin");
        openModal(null);
      },
    },
    {
      id: "theme-toggle",
      title: "Toggle Daylight Mode / Ambient simulation",
      category: "Environment",
      action: () => {
        toggleNightMode();
        openModal(null);
      },
    },
    {
      id: "audio-toggle",
      title: enableAudio ? "Disable Audio Sound FX" : "Enable Audio Sound FX",
      category: "Preferences",
      action: () => {
        setEnableAudio(!enableAudio);
        openModal(null);
      },
    },
  ];

  const filteredCommands = commandItems.filter((cmd) =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => openModal(open ? "command-palette" : null)}>
      <DialogContent className="max-w-md p-3">
        <DialogTitle className="sr-only">Command Menu Palette</DialogTitle>
        <div className="flex flex-col gap-2">
          <Input
            placeholder="Type a command or search action..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-none bg-transparent text-sm focus:ring-0 placeholder:text-text-muted px-2"
            autoFocus
          />
          <Divider />
          <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <span className="text-xs text-text-muted text-center py-6">No matching actions found</span>
            ) : (
              filteredCommands.map((cmd) => (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={cmd.action}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-left text-text-primary hover:bg-primary hover:text-white transition-colors duration-100 outline-none focus:bg-primary focus:text-white select-none"
                >
                  <span>{cmd.title}</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold opacity-60 bg-white/10 px-1.5 py-0.5 rounded">
                    {cmd.category}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

CommandPaletteHost.displayName = "CommandPaletteHost";
export default CommandPaletteHost;
