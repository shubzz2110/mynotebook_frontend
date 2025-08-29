"use client";

import React, { useMemo } from "react";
import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface PaginationProps {
  totalPages: number;                 // Total number of pages from API
  currentPage: number;                // Current active page
  onPageChange: (page: number) => void; // Callback when page changes
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  /**
   * Compute the visible page numbers for the pagination.
   * Shows a maximum of 5 pages, centered around the current page.
   */
  const pages = useMemo(() => {
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [totalPages, currentPage]);

  const buttonClass =
    "flex items-center justify-center min-w-[42px] min-h-[42px] w-[42px] h-[42px] rounded-full text-gray-700 transition-all text-sm leading-5 hover:bg-gray-200 cursor-pointer";

  const activeClass = "!bg-blue-500 !text-white";
  const disabledClass = "opacity-50 cursor-not-allowed pointer-events-none";

  return (
    <div className="flex items-center justify-center space-x-1 py-5 w-full">
      {/* First Page Button */}
      <button
        className={`${buttonClass} ${currentPage === 1 ? disabledClass : ""}`}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        <ChevronsLeftIcon className="w-5 h-5" />
      </button>

      {/* Previous Button */}
      <button
        className={`${buttonClass} ${currentPage === 1 ? disabledClass : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          className={`${buttonClass} ${currentPage === page ? activeClass : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={`${buttonClass} ${currentPage === totalPages ? disabledClass : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Last Page Button */}
      <button
        className={`${buttonClass} ${currentPage === totalPages ? disabledClass : ""}`}
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        <ChevronsRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
