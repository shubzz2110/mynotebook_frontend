import { Edit3, Pin } from "lucide-react";
import React from "react";

export default function PinnedNotes() {
  return (
    <div className="dashboard-card">
      <h1 className="text-surface-800 font-semibold text-xl leading-5">
        Pinned Notes
      </h1>
      <div className="grid grid-cols-1 gap-2.5">
        <div className="rounded-2xl shadow-md hover:shadow-lg transition border border-indigo-300 bg-indigo-50 cursor-pointer">
          <div className="p-4 space-y-2 relative">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-gray-900 truncate flex items-center gap-1">
                <Pin className="w-4 h-4 text-indigo-600" /> A notebook to learn
                Solar System
              </h3>
              <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              adipisci fugit, distinctio, qui itaque facilis illum excepturi
              neque, expedita est quas! Fuga facilis obcaecati dolor placeat
              doloribus saepe voluptate enim.
            </p>
            <span className="text-xs text-gray-500">Created 5d ago</span>
          </div>
        </div>
        <div className="rounded-2xl shadow-md hover:shadow-lg transition border border-indigo-300 bg-indigo-50 cursor-pointer">
          <div className="p-4 space-y-2 relative">
            <div className="flex items-start justify-between">
              <h3 className="text-base font-semibold text-gray-900 truncate flex items-center gap-1">
                <Pin className="w-4 h-4 text-indigo-600" /> A notebook to learn
                Solar System
              </h3>
              <button className="text-gray-500 hover:text-gray-800 cursor-pointer">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              adipisci fugit, distinctio, qui itaque facilis illum excepturi
              neque, expedita est quas! Fuga facilis obcaecati dolor placeat
              doloribus saepe voluptate enim.
            </p>
            <span className="text-xs text-gray-500">Created 5d ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
