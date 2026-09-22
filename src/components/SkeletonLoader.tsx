import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Category Pills Skeleton */}
      <div className="flex items-center gap-2 overflow-hidden py-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-8 w-24 rounded-xl bg-stone-800/80 animate-pulse shrink-0"
          />
        ))}
      </div>

      {/* Menu Cards Skeleton */}
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 animate-pulse"
          >
            <div className="w-full sm:w-36 h-36 bg-stone-800 rounded-xl shrink-0" />
            <div className="flex-1 space-y-3 py-1">
              <div className="flex justify-between items-center">
                <div className="h-5 w-2/5 bg-stone-800 rounded" />
                <div className="h-5 w-16 bg-stone-800 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-stone-800/60 rounded" />
                <div className="h-3 w-4/5 bg-stone-800/60 rounded" />
              </div>
              <div className="pt-2 flex gap-2">
                <div className="h-4 w-16 bg-stone-800/80 rounded" />
                <div className="h-4 w-16 bg-stone-800/80 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
