"use client";

import clsx from "clsx";

interface ToggleSwitchProps {
  checked: boolean;
  onChange?: (value: boolean) => void;
  className?: string;
  inputId?: string;
}

export default function ToggleSwitch({
  checked,
  onChange,
  className,
  inputId,
}: ToggleSwitchProps) {
  const handleToggle = () => {
    onChange?.(!checked);
  };

  return (
    <label
      htmlFor={inputId}
      className={clsx("relative inline-flex items-center cursor-pointer", className)}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={handleToggle}
        className="sr-only"
      />

      {/* Track */}
      <span
        className={clsx(
          "w-12 h-6 rounded-full transition-colors",
          checked ? "bg-blue-600" : "bg-gray-300"
        )}
      ></span>

      {/* Knob */}
      <span
        className={clsx(
          "absolute left-0.5 top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
          checked ? "translate-x-6" : "translate-x-0"
        )}
      ></span>
    </label>
  );
}
