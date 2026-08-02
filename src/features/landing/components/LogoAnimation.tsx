"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface LogoAnimationProps {
  visible: boolean;
}

const LETTER_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.5, ease: "easeOut" },
  }),
};

export const LogoAnimation: React.FC<LogoAnimationProps> = ({ visible }) => {
  const letters = "NAVIGO".split("");

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Wordmark */}
      <div className="flex items-end gap-px">
        {letters.map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            custom={i}
            variants={LETTER_VARIANTS}
            initial="hidden"
            animate={visible ? "visible" : "hidden"}
            className="font-display font-black text-white text-5xl md:text-6xl tracking-tight leading-none"
            style={{ textShadow: "0 0 40px rgba(0,113,227,0.4)" }}
          >
            {char}
          </motion.span>
        ))}
      </div>

      {/* Tagline reveal */}
      <motion.p
        className="text-[11px] text-[#a1a1aa] tracking-[0.35em] uppercase"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 4 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        Real-Time Smart Public Transportation
      </motion.p>

      {/* Underline accent */}
      <motion.div
        className="h-px rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, #0071e3, #00e3a5, transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: visible ? 1 : 0, opacity: visible ? 1 : 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-48 h-full" />
      </motion.div>
    </motion.div>
  );
};

LogoAnimation.displayName = "LogoAnimation";
export default LogoAnimation;
