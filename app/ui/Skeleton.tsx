import React from "react";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-gray-300 ${className}`}
    >
      <div
        className="absolute inset-0 
                   bg-gradient-to-r from-transparent via-white/60 to-transparent 
                   [background-size:200%_200%] 
                   animate-[shimmer_1s_linear_infinite]"
      />
    </div>
  );
}
