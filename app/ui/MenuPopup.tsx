"use client";

import { MenuProp } from "../lib/definitions";
import ReactDOM from "react-dom";

interface MenuPopupProps {
  onClose: () => void;
  position: {
    top: number;
    right: number;
  };
  items: MenuProp[];
}

export default function MenuPopup({
  onClose,
  items,
  position,
}: MenuPopupProps) {
  return ReactDOM.createPortal(
    <>
      {/* Overlay to close when clicking outside */}
      <div
        className="fixed inset-0 z-40"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        role="button"
      />
      <div
        className="absolute bg-white w-52 border border-surface-200 rounded-2.5xl p-2.5 flex flex-col z-50"
        style={{
          top: `${position.top}px`,
          right: `${position.right}px`,
          boxShadow: "0px 2px 12px 0px #0000001A",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => {
              onClose();
              item.onClick();
            }}
            className="flex items-center space-x-2.5 w-full h-max text-surface-800 font-semibold text-sm p-3.5 hover:bg-gray-100 rounded-2.5xl cursor-pointer transition-all duration-300 ease-in-out"
          >
            {item.icon}
            <h1>{item.label}</h1>
          </button>
        ))}
      </div>
    </>,
    document.getElementById("portal-root")!
  );
}
