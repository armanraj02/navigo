"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { Dialog, DialogContent, DialogTitle, DialogDescription, Button, Avatar, Divider } from "@/components/ui";

export const ProfileMenu: React.FC = () => {
  const activeModalId = useUIStore((state) => state.activeModalId);
  const openModal = useUIStore((state) => state.openModal);

  const isOpen = activeModalId === "profile-menu";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => openModal(open ? "profile-menu" : null)}>
      <DialogContent className="max-w-xs">
        <DialogTitle className="flex items-center gap-3">
          <Avatar size="md" fallbackText="DR" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-text-primary leading-none">Director Profile</span>
            <span className="text-[10px] text-text-muted leading-none mt-1">agency@navigo.net</span>
          </div>
        </DialogTitle>
        <DialogDescription className="text-xs text-text-secondary select-none">
          Active system administrator profile. Authorizations active for fleet adjustments.
        </DialogDescription>
        <Divider />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between items-center text-[10px] text-text-muted font-mono select-none">
            <span>Access Role:</span>
            <span className="text-primary font-bold">SYSTEM_DIRECTOR</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-text-muted font-mono select-none">
            <span>Active Shift:</span>
            <span>08:00 - 20:00</span>
          </div>
        </div>
        <Divider />
        <Button variant="danger" size="sm" className="w-full" onClick={() => openModal(null)}>
          Log Out Shift
        </Button>
      </DialogContent>
    </Dialog>
  );
};

ProfileMenu.displayName = "ProfileMenu";
export default ProfileMenu;
