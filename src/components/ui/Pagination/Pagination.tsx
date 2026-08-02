import React from "react";
import { cn } from "@/utils";
import { Button } from "../Button";
import { PaginationProps } from "./Pagination.types";

export const Pagination: React.FC<PaginationProps> = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  ...props
}) => {
  return (
    <div
      className={cn("flex items-center gap-2 select-none justify-center", className)}
      {...props}
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span className="text-xs text-text-secondary">
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

Pagination.displayName = "Pagination";
