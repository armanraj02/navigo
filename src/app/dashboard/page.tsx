"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapExperience } from "@/components/landing/MapExperience";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
            className="fixed inset-0 bg-[#F5F7FA] flex flex-col items-center justify-center z-[9999] overflow-hidden select-none"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center shadow-lg"
              >
                <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-ping opacity-60" />
                <span className="text-3xl font-bold text-blue-600">N</span>
              </motion.div>

              <motion.h1
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl font-bold tracking-widest text-slate-900 font-sans"
              >
                NAVIGO
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showSplash && <MapExperience fullScreen={true} />}
    </>
  );
}
