import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
import React from "react";

type ButtonProps = {
  onClick?: () => void;
  className?: string;
  loading?: boolean;
  severity: "primary" | "secondary" | "danger";
  label: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean
  icon?: React.ReactElement
};

export default function Button({
  onClick,
  className,
  loading,
  severity,
  label,
  type,
  disabled,
  icon,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        `${className} flex items-center gap-2 cursor-pointer justify-center transition-all duration-500 ease-in-out`,
        {
          "bg-gradient-to-r from bg-blue-500 to-indigo-600 text-sm font-semibold text-surface-0 rounded-full hover:opacity-80":
            severity === "primary",
          "bg-gradient-to-r from bg-red-500 to-pink-600 text-sm font-semibold text-surface-0 rounded-full hover:opacity-80":
            severity === "danger",
          "bg-white text-sm font-semibold text-surface-800 rounded-full border border-surface-300 hover:opacity-80":
            severity === "secondary",
          "opacity-60 !cursor-default": disabled
        }
      )}
    >
      {loading && <LoaderCircle size={20} className="animate-spin" />}
      {icon}
      {label}
    </button>
  );
}
