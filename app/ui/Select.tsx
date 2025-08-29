"use client";

import { useRef, useState, useEffect } from "react";
import { ReactElement } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";
import { SelectOption } from "../lib/definitions";
import { ChevronDownIcon } from "lucide-react";

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: ReactElement;
}

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Select option",
  className,
  icon,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    right: 0,
  });
  const imgRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const selected = options.find((opt) => opt.value === value);

  const handleToggleMenu = () => {
    let rect;
    if (imgRef.current) {
      rect = imgRef.current.getBoundingClientRect();
    } else if (buttonRef.current) {
      rect = buttonRef.current.getBoundingClientRect();
    }

    if (rect) {
      setPopupPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setOpen((prev) => !prev);
  };

  // Close dropdown on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <button
        type="button"
        ref={buttonRef}
        onClick={() => handleToggleMenu()}
        className={clsx(
          `flex items-center justify-between transition-colors cursor-pointer min-w-24 focus:outline-none ${className}`
        )}
      >
        {selected?.icon}
        {selected ? (
          selected.label
        ) : (
          <span className="text-surface-400">{placeholder}</span>
        )}
        <ChevronDownIcon
          size={18}
          className={clsx("transition-transform", open && "rotate-180")}
        />
      </button>

      {/* Dropdown via portal */}
      {open &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              role="button"
            />
            {/* Dropdown content */}
            <div
              className="absolute z-50 bg-white border border-surface-200 rounded-[15px] p-1.5 min-w-40"
              style={{
                top: popupPosition.top,
                right: popupPosition.right,
                boxShadow: "0px 2px 12px 0px #0000001A",
              }}
            >
              {options.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className={clsx(
                    "flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer font-normal",
                    opt.value === value
                      ? "bg-blue-50 text-blue-600 !font-bold"
                      : "hover:bg-surface-100 text-surface-700"
                  )}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
