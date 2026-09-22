import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Leaf, Award, Sparkles, AlertCircle, ChevronRight } from 'lucide-react';
import type { MenuItem } from '../types/menu';
import { LogoPlaceholder } from './LogoPlaceholder';

interface MenuItemCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const TAG_BADGES: Record<string, { label: string; icon: React.ReactNode; style: string }> = {
  Vegan: { label: 'Vegan', icon: <Leaf className="w-3 h-3" />, style: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  'Gluten-Free': { label: 'Gluten-Free', icon: <Sparkles className="w-3 h-3" />, style: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
  Spicy: { label: 'Spicy', icon: <Flame className="w-3 h-3" />, style: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  'Chef Special': { label: 'Chef Special', icon: <Award className="w-3 h-3" />, style: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
};

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelect }) => {
  const [imgError, setImgError] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(item.price);

  const hasValidImage = item.image_url && item.image_url.trim() !== '' && !imgError;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      whileTap={{ scale: item.is_available ? 0.98 : 1 }}
      onClick={() => item.is_available && onSelect(item)}
      className={`group relative bg-gradient-to-b from-stone-900/90 to-stone-900/60 rounded-2xl border transition-all duration-300 overflow-hidden shadow-lg ${
        item.is_available
          ? 'border-stone-800 hover:border-amber-500/40 hover:shadow-amber-950/20 cursor-pointer'
          : 'border-stone-800/40 opacity-60 cursor-not-allowed select-none'
      }`}
    >
      <div className="flex flex-col sm:flex-row h-full">
        {/* Item Image or Logo Placeholder Container */}
        <div className="relative w-full sm:w-36 h-44 sm:h-auto shrink-0 overflow-hidden bg-stone-950">
          {hasValidImage ? (
            <img
              src={item.image_url}
              alt={item.title}
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                item.is_available ? 'group-hover:scale-105' : 'grayscale brightness-75'
              }`}
              loading="lazy"
            />
          ) : (
            <LogoPlaceholder size="sm" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent sm:hidden pointer-events-none" />

          {/* Out of stock overlay badge on image */}
          {!item.is_available && (
            <div className="absolute inset-0 bg-stone-950/70 backdrop-blur-[2px] flex items-center justify-center p-2 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-800/60 text-xs font-semibold shadow-lg">
                <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                Out of Stock
              </span>
            </div>
          )}

          {/* Price badge on mobile view */}
          <div className="absolute bottom-2 left-2 sm:hidden px-2.5 py-1 rounded-lg bg-stone-950/90 backdrop-blur-md border border-stone-800 text-amber-300 font-mono font-bold text-sm z-10">
            {formattedPrice}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <h3 className="text-base font-semibold text-stone-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                {item.title}
              </h3>
              <span className="hidden sm:inline-block text-amber-400 font-mono font-bold text-base whitespace-nowrap">
                {formattedPrice}
              </span>
            </div>

            <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed mb-3">
              {item.description}
            </p>
          </div>

          {/* Footer: Tags, Availability Badge & Detail CTA */}
          <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-stone-800/40">
            <div className="flex items-center gap-1.5 flex-wrap">
              {/* Availability Status Badge */}
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                  item.is_available
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.is_available ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                {item.is_available ? 'Available' : 'Out of Stock'}
              </span>

              {/* Dietary Tags */}
              {item.tags.map((tag) => {
                const badge = TAG_BADGES[tag] || {
                  label: tag,
                  icon: null,
                  style: 'bg-stone-800/80 text-stone-300 border-stone-700',
                };
                return (
                  <span
                    key={tag}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium border ${badge.style}`}
                  >
                    {badge.icon}
                    <span>{badge.label}</span>
                  </span>
                );
              })}
            </div>

            {item.is_available && (
              <span className="text-xs text-amber-400/80 group-hover:text-amber-300 flex items-center font-medium shrink-0 ml-auto">
                Details <ChevronRight className="w-3.5 h-3.5 ml-0.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
