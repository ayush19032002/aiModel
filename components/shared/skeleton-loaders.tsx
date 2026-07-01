import React from "react";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded-md bg-[#e2e8f0]/50 ${className}`}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-36" />
    </div>
  );
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="border border-[#e2e8f0] rounded-2xl overflow-hidden bg-[#ffffff]/40">
      <div className="p-5 border-b border-[#e2e8f0] flex gap-4">
        <Skeleton className="h-9 w-40" />
        <Skeleton className="h-9 w-24 ml-auto" />
      </div>
      <div className="divide-y divide-[#e2e8f0] p-5 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[30%]" />
              <Skeleton className="h-3 w-[20%]" />
            </div>
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-[#ffffff] border border-[#e2e8f0] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-8 w-24 rounded-lg" />
      </div>
      <div className="h-[200px] flex items-end gap-2 pt-4">
        {Array.from({ length: 12 }).map((_, i) => {
          const heights = ["h-[20%]", "h-[45%]", "h-[30%]", "h-[60%]", "h-[50%]", "h-[80%]", "h-[70%]", "h-[90%]", "h-[40%]", "h-[65%]", "h-[55%]", "h-[85%]"];
          return (
            <Skeleton
              key={i}
              className={`flex-1 ${heights[i % heights.length]} rounded-t-md`}
            />
          );
        })}
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-3 w-8" />
      </div>
    </div>
  );
}

export function ChatSkeleton() {
  return (
    <div className="flex h-[500px] border border-[#e2e8f0] rounded-2xl overflow-hidden bg-[#ffffff]/40">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-[#e2e8f0] p-4 space-y-4">
        <Skeleton className="h-9 w-full rounded-lg" />
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-3 items-center py-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-3.5 w-[70%]" />
                <Skeleton className="h-3 w-[50%]" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Area */}
      <div className="flex-1 flex flex-col p-4 justify-between">
        <div className="flex items-center gap-3 border-b border-[#e2e8f0] pb-3">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-4 w-28" />
        </div>
        <div className="space-y-4 flex-1 py-4 overflow-y-auto">
          <div className="flex gap-2.5 max-w-[70%]">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-12 w-full rounded-2xl rounded-tl-none" />
          </div>
          <div className="flex gap-2.5 max-w-[70%] ml-auto justify-end">
            <Skeleton className="h-16 w-full rounded-2xl rounded-tr-none" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
}
