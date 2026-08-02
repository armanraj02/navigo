import React from "react";
import { cn } from "@/utils";
import { cardStyles } from "./Card.styles";
import { CardProps } from "./Card.types";

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardStyles({ variant, padding }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
