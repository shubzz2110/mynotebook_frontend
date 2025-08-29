"use client";

import { ReactElement } from "react";
import clsx from "clsx";

export type Tab = {
  icon?: ReactElement;
  label: string;
  value: string;
};

interface TabProps {
  tabs: Tab[];
  currentTab: string;
  onChange: (value: string) => void;
}

export default function TabsMenu({ tabs, currentTab, onChange }: TabProps) {
  return (
    <div className="bg-white flex items-center overflow-x-auto border-b border-surface-200 rounded-t-[15px] h-max min-h-max">
      {tabs.map((tab) => {
        const isActive = tab.value === currentTab;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={clsx(
              "flex items-center gap-2.5 px-5 py-3 text-sm font-normal border-b-2 transition-colors cursor-pointer",
              isActive
                ? "text-blue-600 border-blue-600 !font-bold"
                : "text-surface-600 border-transparent hover:text-blue-500 hover:border-blue-300"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
