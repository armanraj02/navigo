import React from "react";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "@/utils";
import { AvatarProps } from "./Avatar.types";

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  alt = "User Avatar",
  fallbackText = "U",
  size = "md",
  ...props
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
  };

  return (
    <RadixAvatar.Root
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-secondary border border-card-border font-medium text-text-primary justify-center items-center select-none",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <RadixAvatar.Image
        src={src}
        alt={alt}
        className="aspect-square h-full w-full object-cover"
      />
      <RadixAvatar.Fallback
        className="flex h-full w-full items-center justify-center rounded-full bg-secondary font-bold text-text-secondary"
        delayMs={300}
      >
        {fallbackText.slice(0, 2).toUpperCase()}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = "Avatar";
