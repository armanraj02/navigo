"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnterTransitionProps {
  active: boolean;
}

export const EnterTransition: React.FC<EnterTransitionProps> = ({ active }) => {
  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Full-screen white flash wipe */}
          <motion.div
            className="fixed inset-0 z-[9500] pointer-events-none"
            style={{ background: "rgba(0, 113, 227, 0.08)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Horizontal scan-line sweep */}
          <motion.div
            className="fixed inset-x-0 z-[9500] h-px pointer-events-none"
            style={{ background: "linear-gradient(90deg, transparent, #0071e3, #00e3a5, transparent)" }}
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 1, 0] }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

EnterTransition.displayName = "EnterTransition";
export default EnterTransition;
