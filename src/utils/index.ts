import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind classes merger utility
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Convert coordinates to array format
export function toVector3(coords: { x: number; y: number; z: number }): [number, number, number] {
  return [coords.x, coords.y, coords.z];
}

// Linear interpolation helper
export function lerp(start: number, end: number, amt: number): number {
  return (1 - amt) * start + amt * end;
}
