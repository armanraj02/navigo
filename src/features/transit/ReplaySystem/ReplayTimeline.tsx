"use client";

import React from "react";
import { useReplayStore } from "./ReplayStore";
import { Card, Button } from "@/components/ui";

export const ReplayTimeline: React.FC = () => {
  const isPlaying = useReplayStore((s) => s.isPlaying);
  const progress = useReplayStore((s) => s.progress);
  const speed = useReplayStore((s) => s.speed);
  const selectedRouteId = useReplayStore((s) => s.selectedRouteId);
  const replayPath = useReplayStore((s) => s.replayPath);

  const setPlaying = useReplayStore((s) => s.setPlaying);
  const setProgress = useReplayStore((s) => s.setProgress);
  const setSpeed = useReplayStore((s) => s.setSpeed);
  const resetReplay = useReplayStore((s) => s.resetReplay);

  if (!selectedRouteId || replayPath.length === 0) return null;

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, x / rect.width));
    setProgress(newProgress);
  };

  return (
    <Card className="p-4 bg-background-glass border-white/10 backdrop-blur-xl rounded-2xl w-full flex flex-col gap-3 select-none">
      <div className="flex justify-between items-center">
        <span className="text-[10px] uppercase tracking-wider text-text-muted font-mono font-bold">
          Route Replay: {selectedRouteId}
        </span>
        <button
          onClick={resetReplay}
          className="text-[10px] text-rose-400 hover:text-rose-300 font-semibold"
          aria-label="Exit replay"
        >
          Exit Replay
        </button>
      </div>

      {/* Progress Scrubber Bar */}
      <div
        onClick={handleTimelineClick}
        className="relative h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden transition-colors hover:bg-white/15"
      >
        <div
          className="absolute left-0 top-0 bottom-0 bg-blue-500 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
        {/* Ghost Stop Markers */}
        <div className="absolute inset-0 flex justify-between px-2 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 self-center" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 self-center" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/40 self-center" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            onClick={() => setPlaying(!isPlaying)}
            className="w-7 h-7 p-0 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-text-primary"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => setProgress(0)}
            className="w-7 h-7 p-0 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-text-primary"
            aria-label="Restart"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </Button>
        </div>

        {/* Speed Controls */}
        <div className="flex gap-1">
          {([1, 2, 5] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`text-[9px] font-bold px-2 py-1 rounded transition-colors ${
                speed === s
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-text-secondary hover:bg-white/10"
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
};

ReplayTimeline.displayName = "ReplayTimeline";
export default ReplayTimeline;
