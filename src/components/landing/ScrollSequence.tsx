"use client";

import React, { useRef, useEffect, useState } from "react";
import { MotionValue, useTransform, useSpring } from "framer-motion";

interface ScrollSequenceProps {
  scrollYProgress: MotionValue<number>;
}

const TOTAL_FRAMES = 300;

export function ScrollSequence({ scrollYProgress }: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Apply spring physics to scroll progress for buttery smooth cinematic motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    mass: 1,
    restDelta: 0.0001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      // Format: ezgif-frame-001.jpg
      const paddedIndex = i.toString().padStart(3, "0");
      img.src = `/sequence/ezgif-frame-${paddedIndex}.jpg`;
      loadedImages.push(img);
    }
    imagesRef.current = loadedImages;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || imagesRef.current.length === 0 || size.width === 0) return;
    // We use alpha: true because the images might not have a black background, and we blend it.
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size.width * dpr;
    canvas.height = size.height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${size.width}px`;
    canvas.style.height = `${size.height}px`;

    let animationFrameId: number;

    const render = () => {
      const currentFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex.get())));
      const img = imagesRef.current[currentFrame];

      // Always clear to background color for cinematic feel
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, size.width, size.height);

      if (img && img.complete && img.naturalWidth > 0) {
        // Calculate object-fit: cover logic
        const scale = Math.max(size.width / img.width, size.height / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        const x = (size.width - w) / 2;
        const y = (size.height - h) / 2;

        ctx.drawImage(img, x, y, w, h);

        // Add cinematic overlay based on scroll progress (e.g. slight darkening at the end)
        const prog = smoothProgress.get();
        if (prog > 0.8) {
          ctx.fillStyle = `rgba(5, 5, 5, ${(prog - 0.8) * 4})`; // Fade to background color
          ctx.fillRect(0, 0, size.width, size.height);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size, frameIndex, smoothProgress]);

  return (
    <div className="absolute inset-0 pointer-events-none bg-[#050505] overflow-hidden">
      {/* 
        Apply premium cinematic post-processing via CSS:
        - brightness/contrast boost
        - subtle saturate for richer colors 
      */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{
          filter: "brightness(1.05) contrast(1.05) saturate(1.1)",
        }}
      />
      {/* Volumetric glow overlay / vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_120%)] pointer-events-none" />
    </div>
  );
}
