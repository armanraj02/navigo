"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  visible: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress, visible }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-[#020205]"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      style={{ pointerEvents: visible ? "all" : "none" }}
    >
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, #0071e3 1px, transparent 1px),
            linear-gradient(to bottom, #0071e3 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 60%, transparent 100%)",
        }}
      />

      {/* Logo mark */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* N Logomark */}
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #0071e3 0%, #00e3a5 100%)",
            boxShadow: "0 0 60px rgba(0, 113, 227, 0.5), 0 0 120px rgba(0, 227, 165, 0.25)",
          }}
          animate={{
            boxShadow: [
              "0 0 40px rgba(0,113,227,0.4), 0 0 80px rgba(0,227,165,0.2)",
              "0 0 80px rgba(0,113,227,0.6), 0 0 150px rgba(0,227,165,0.35)",
              "0 0 40px rgba(0,113,227,0.4), 0 0 80px rgba(0,227,165,0.2)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-display font-black text-white text-2xl tracking-tight">N</span>
        </motion.div>

        {/* Brand name */}
        <div className="flex flex-col items-center gap-1">
          <span className="font-display font-bold text-white text-xl tracking-[0.3em] uppercase">
            Navigo
          </span>
          <span className="text-[10px] text-[#a1a1aa] tracking-[0.2em] uppercase">
            Initializing systems
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: "linear-gradient(90deg, #0071e3, #00e3a5)",
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Progress percentage */}
        <span className="font-mono text-[10px] text-[#52525b] tabular-nums">
          {progress.toFixed(0)}%
        </span>
      </motion.div>
    </motion.div>
  );
};

LoadingScreen.displayName = "LoadingScreen";
export default LoadingScreen;
