import React from 'react';
import { motion } from 'framer-motion';
import type { Category } from '../types/menu';

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categoryName: string) => void;
  categoryItemCounts: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
  categoryItemCounts,
}) => {
  return (
    <div className="bg-stone-900/90 border-b border-stone-800/80 sticky top-[137px] sm:top-[141px] z-20 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {/* "All Categories" Tab */}
          <button
            onClick={() => onSelectCategory('All')}
            className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
              activeCategory === 'All'
                ? 'text-amber-300'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <span>All Items</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeCategory === 'All'
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                  : 'bg-stone-800 text-stone-400'
              }`}
            >
              {categoryItemCounts['All'] || 0}
            </span>
            {activeCategory === 'All' && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-stone-800 border border-amber-500/40 rounded-xl -z-10 shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>

          {/* Dynamic Categories */}
          {categories.map((cat) => {
            const count = categoryItemCounts[cat.name] || 0;
            const isActive = activeCategory === cat.name;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                  isActive
                    ? 'text-amber-300'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'bg-stone-800 text-stone-400'
                  }`}
                >
                  {count}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-stone-800 border border-amber-500/40 rounded-xl -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
