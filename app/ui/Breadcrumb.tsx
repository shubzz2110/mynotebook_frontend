import { ChevronRightIcon } from "lucide-react";
import { BreadcrumbOption } from "../lib/definitions";
import clsx from "clsx";

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbOption[];
  className?: string;
}

export default function Breadcrumb({
  breadcrumbs,
  className,
}: BreadcrumbProps) {
  return (
    <nav
      className={clsx(
        "flex items-center gap-2.5 w-full h-max bg-surface-50 border border-surface-200 rounded-[15px] p-3.5",
        className
      )}
      aria-label="Breadcrumb"
    >
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center gap-2">
          <button
            onClick={breadcrumb.command}
            className={clsx(
              "flex items-center gap-1 text-sm leading-4 font-normal transition-colors cursor-pointer",
              breadcrumb.active
                ? "text-blue-600 !font-bold"
                : "text-surface-800 hover:text-surface-800",
              breadcrumb.className
            )}
          >
            {breadcrumb.icon && (
              <span className="flex items-center">{breadcrumb.icon}</span>
            )}
            {breadcrumb.label}
          </button>

          {index < breadcrumbs.length - 1 && (
            <ChevronRightIcon size={20} className="text-surface-800" />
          )}
        </div>
      ))}
    </nav>
  );
}
