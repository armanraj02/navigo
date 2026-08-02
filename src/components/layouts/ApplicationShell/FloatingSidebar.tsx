"use client";

import React from "react";
import { useUIStore } from "@/store/uiStore";
import { Sidebar, Button, Divider, Avatar } from "@/components/ui";

export const FloatingSidebar: React.FC = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const setSidebarOpen = useUIStore((state) => state.setSidebarOpen);
  const currentView = useUIStore((state) => state.currentView);
  const setView = useUIStore((state) => state.setView);
  const openModal = useUIStore((state) => state.openModal);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navItems = [
    {
      id: "passenger" as const,
      label: "Passenger Console",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      id: "driver" as const,
      label: "Driver Terminal",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h5a1 1 0 011 1v8a1 1 0 01-1 1h-1m-6 0h-2" />
        </svg>
      ),
    },
    {
      id: "admin" as const,
      label: "Fleet Analytics",
      icon: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2zm6 0V11a2 2 0 012-2h2a2 2 0 012 2v8m-6 0a2 2 0 002 2h2a2 2 0 00-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar}>
      <div className="flex flex-col gap-1.5 w-full mt-4">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? "primary" : "ghost"}
              onClick={() => setView(item.id)}
              className="justify-start gap-3 h-10 w-full"
            >
              {item.icon}
              {isSidebarOpen && <span className="text-xs font-semibold">{item.label}</span>}
            </Button>
          );
        })}
      </div>

      <div className="flex flex-col gap-2 w-full mt-auto">
        <Divider />
        <Button
          variant="ghost"
          onClick={() => openModal("settings-drawer")}
          className="justify-start gap-3 h-10 w-full"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {isSidebarOpen && <span className="text-xs font-semibold">Preferences</span>}
        </Button>
        <div className="flex items-center gap-3 p-1.5 select-none hover:bg-white/5 rounded-lg transition-colors cursor-pointer" onClick={() => openModal("profile-menu")}>
          <Avatar size="sm" fallbackText="DR" />
          {isSidebarOpen && (
            <div className="flex flex-col gap-0.5 truncate">
              <span className="text-xs font-bold text-text-primary leading-none">Director Panel</span>
              <span className="text-[10px] text-text-muted leading-none">agency@navigo.net</span>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
};

FloatingSidebar.displayName = "FloatingSidebar";
export default FloatingSidebar;
