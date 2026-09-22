import React from 'react';
import { Search, X, QrCode, RefreshCw, Flame, Leaf, Award, UtensilsCrossed, Sparkles } from 'lucide-react';
import type { DietaryTag } from '../types/menu';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTag: DietaryTag;
  onSelectTag: (tag: DietaryTag) => void;
  onOpenQR: () => void;
  onRefresh: () => void;
  isFetching: boolean;
  isMock: boolean;
}

const DIETARY_TAGS: { label: DietaryTag; icon: React.ReactNode; color: string }[] = [
  { label: 'All', icon: <UtensilsCrossed className="w-3.5 h-3.5" />, color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
  { label: 'Vegan', icon: <Leaf className="w-3.5 h-3.5" />, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' },
  { label: 'Gluten-Free', icon: <Sparkles className="w-3.5 h-3.5" />, color: 'bg-sky-500/20 text-sky-300 border-sky-500/40' },
  { label: 'Spicy', icon: <Flame className="w-3.5 h-3.5" />, color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' },
  { label: 'Chef Special', icon: <Award className="w-3.5 h-3.5" />, color: 'bg-purple-500/20 text-purple-300 border-purple-500/40' },
];

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  selectedTag,
  onSelectTag,
  onOpenQR,
  onRefresh,
  isFetching,
  isMock,
}) => {
  return (
    <header className="relative bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-stone-100 pb-4 pt-6 px-4 shadow-2xl border-b border-stone-800/60 sticky top-0 z-30 backdrop-blur-xl bg-opacity-95">
      <div className="max-w-3xl mx-auto">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 border border-amber-300/30">
              <UtensilsCrossed className="w-6 h-6 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-amber-100 font-serif">
                  Lumina Bistro
                </h1>
                {isMock && (
                  <span className="text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-mono">
                    Demo Mode
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Kitchen Open
                </span>
                <span>•</span>
                <span className="font-mono text-amber-300/90 font-medium">Table #12</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              disabled={isFetching}
              title="Refresh Menu"
              className="p-2.5 rounded-xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-400 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isFetching ? 'animate-spin text-amber-400' : ''}`} />
            </button>
            <button
              onClick={onOpenQR}
              title="Show Menu QR Code"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-medium text-xs shadow-md shadow-amber-950/40 hover:from-amber-400 hover:to-amber-500 transition-all active:scale-95"
            >
              <QrCode className="w-4 h-4" />
              <span className="hidden sm:inline">Scan QR</span>
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="relative mb-3">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4 text-amber-400/80" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes, ingredients, dietary requirements..."
            className="w-full pl-10 pr-10 py-2.5 bg-stone-900/90 border border-stone-800 focus:border-amber-500/60 rounded-xl text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Dietary Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {DIETARY_TAGS.map((tag) => {
            const isSelected = selectedTag === tag.label;
            return (
              <button
                key={tag.label}
                onClick={() => onSelectTag(tag.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
                  isSelected
                    ? 'bg-amber-400 text-stone-950 border-amber-300 font-semibold shadow-md shadow-amber-950/50 scale-[1.02]'
                    : `${tag.color} opacity-80 hover:opacity-100`
                }`}
              >
                {tag.icon}
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
