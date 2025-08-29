"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import clsx from "clsx";

interface CheckboxProps {
  checked?: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  inputId?: string;
}

export default function Checkbox({
  checked = false,
  onChange,
  className,
  inputId,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <label
      htmlFor={inputId}
      className={clsx(
        "flex items-center gap-2 cursor-pointer select-none",
        className
      )}
    >
      {/* Hidden native checkbox for accessibility */}
      <input
        id={inputId}
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className="hidden"
      />

      {/* Custom box */}
      <span
        className={clsx(
          "w-5 h-5 flex items-center justify-center border rounded transition-colors",
          isChecked
            ? "bg-blue-600 border-blue-600"
            : "bg-white border-surface-400"
        )}
      >
        {isChecked && <Check size={14} className="text-white" />}
      </span>
    </label>
  );
}
