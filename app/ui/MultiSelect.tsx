"use client";

import { useRef, useState } from "react";
import { MultiSelectOption } from "../lib/definitions";
import clsx from "clsx";
import { ChevronDownIcon, Search, XCircle } from "lucide-react";
import { createPortal } from "react-dom";
import Checkbox from "./Checkbox";

interface MultiSelectProps {
  className?: string;
  placeholder?: string;
  options: MultiSelectOption[];
  value: any[]; // selected values
  onChange: (value: any[]) => void;
}

export default function MultiSelect({
  className,
  placeholder,
  options,
  value,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    right: 0,
    width: 0,
  });
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleToggleMenu = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropdownHeight = 300;

    let top = rect.bottom + 8;
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      top = rect.top - dropdownHeight - 20;
    }

    setPopupPosition({
      top,
      right: window.innerWidth - rect.right,
      width: rect.width,
    });
    setOpen((prev) => !prev);
  };

  const toggleOption = (optionValue: any) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="relative inline-block w-full">
      <button
        type="button"
        ref={buttonRef}
        onClick={handleToggleMenu}
        className={clsx(
          `flex items-center justify-between transition-colors cursor-pointer min-w-24 focus:outline-none ${className}`
        )}
      >
        {value.length > 0 ? (
          <div className="flex items-center gap-2.5 flex-wrap">
            {value.length > 3 ? (
              <span className="text-sm text-surface-800 font-normal">
                {value.length} options selected
              </span>
            ) : (
              <>
                {options
                  .filter((opt) => value.includes(opt.value))
                  .map((opt) => (
                    <div
                      key={opt.value}
                      role="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onChange(value.filter((v) => v !== opt.value));
                      }}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded capitalize"
                    >
                      <span>{opt.label}</span>
                      <XCircle size={14} color="red" />
                    </div>
                  ))}
              </>
            )}
          </div>
        ) : (
          <span className="text-surface-500 font-normal">{placeholder}</span>
        )}
        <ChevronDownIcon
          size={18}
          className={clsx("transition-transform", open && "rotate-180")}
        />
      </button>

      {open &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
              role="button"
            />
            <div
              className="absolute z-50 bg-white border border-surface-200 rounded-[15px] min-h-80 max-h-80 w-full overflow-hidden flex flex-col"
              style={{
                top: popupPosition.top,
                right: popupPosition.right,
                width: popupPosition.width,
                boxShadow: "0px 2px 12px 0px #0000001A",
              }}
            >
              <div className="flex items-center gap-2.5 w-full px-5 pt-5 pb-2.5">
                {/* Search could filter options in future */}
                <div className="relative w-full">
                  <Search
                    className="absolute top-[11px] right-3.5"
                    color="#9e9e9e"
                    size={16}
                  />
                  <input
                    type="search"
                    name="search"
                    placeholder="Search..."
                    className="form-input w-full !pr-10 !py-2"
                  />
                </div>
              </div>
              <div className="flex flex-col w-full h-full overflow-y-auto grow shrink basis-0 pb-2.5">
                {options.map((option) => (
                  <label
                    key={option.value}
                    htmlFor={`option-${option.value}`}
                    className="flex items-center gap-2.5 capitalize text-sm font-normal text-surface-900 px-5 py-2.5 hover:bg-surface-100 transition-all cursor-pointer"
                  >
                    <Checkbox
                      inputId={`option-${option.value}`}
                      checked={value.includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
}
