import React from "react";
import { cn } from "@/utils";
import { BreadcrumbProps } from "./Breadcrumb.types";

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ className, items, ...props }) => {
  return (
    <nav
      className={cn("flex items-center text-xs font-semibold text-text-secondary select-none", className)}
      aria-label="Breadcrumb"
      {...props}
    >
      <ol className="flex items-center gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && (
                <span className="text-text-muted select-none">/</span>
              )}
              {isLast || !item.href ? (
                <span className="text-text-primary" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className="hover:text-text-primary transition-colors duration-100"
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.displayName = "Breadcrumb";
