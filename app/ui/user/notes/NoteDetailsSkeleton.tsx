import React from "react";
import Skeleton from "../../Skeleton";

export default function NoteDetailsSkeleton() {
  return (
    <div className="flex flex-col w-full h-full gap-7">
      <div className="flex items-start justify-between w-full h-max">
        <div className="flex flex-col space-y-2.5">
          <div className="flex gap-2.5 items-start">
            <Skeleton className="w-7 h-7 rounded-md" />
            {/* Title */}
            <Skeleton className="w-[56rem] max-w-4xl h-8" />
          </div>
        </div>
        {/* CTA Buttons */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="w-10 h-10 rounded-md" />
          <span className="text-surface-400">|</span>
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="w-10 h-10 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 overflow-hidden">
        {/* Main content */}
        <div className="lg:col-span-2 flex flex-col gap-5 prose max-w-none overflow-y-auto">
          {Array.from({ length: 12 }).map((i, index) => (
            <Skeleton key={index} className="w-full h-5 rounded-md" />
          ))}
        </div>
        {/* Sidebar Metadata */}
        <div className="flex flex-col h-full gap-7">
          <div className="flex flex-col space-y-2.5">
            <Skeleton className="w-20 h-5" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="w-20 h-7" />
              <Skeleton className="w-20 h-7" />
            </div>
          </div>
          <div className="flex flex-col space-y-2.5">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-20 h-5" />
          </div>
          <div className="flex flex-col space-y-2.5">
            <Skeleton className="w-full h-5" />
            <ul className="space-y-1 text-sm text-surface-800 font-normal">
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-5" />
              <Skeleton className="w-20 h-5" />
            </ul>
          </div>
          <div className="flex flex-col space-y-2.5">
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-20 h-5" />
            <Skeleton className="w-20 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
