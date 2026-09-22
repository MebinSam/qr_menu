import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame, Leaf, Award, Sparkles, Check, Bookmark, Share2 } from 'lucide-react';
import type { MenuItem } from '../types/menu';
import { LogoPlaceholder } from './LogoPlaceholder';

interface DetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

const TAG_BADGES: Record<string, { label: string; icon: React.ReactNode; style: string }> = {
  Vegan: { label: 'Vegan Friendly', icon: <Leaf className="w-4 h-4" />, style: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  'Gluten-Free': { label: 'Gluten-Free', icon: <Sparkles className="w-4 h-4" />, style: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
  Spicy: { label: 'Spicy Level', icon: <Flame className="w-4 h-4" />, style: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  'Chef Special': { label: "Chef's Signature Selection", icon: <Award className="w-4 h-4" />, style: 'bg-amber-500/20 text-amber-300 border-amber-500/40' },
};

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const formattedPrice = new Intl.NumberFormat('en-In', {
    style: 'currency',
    currency: 'INR',
  }).format(item.price);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out ${item.title} at Lumina Bistro!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const hasValidImage = item.image_url && item.image_url.trim() !== '' && !imgError;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
        >
          {/* Close & Share Action Header */}
          <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-stone-950/60 backdrop-blur-md text-stone-300 hover:text-white border border-stone-800 transition-all"
              title="Share"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-stone-950/60 backdrop-blur-md text-stone-300 hover:text-white border border-stone-800 transition-all"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scroll Content */}
          <div className="overflow-y-auto no-scrollbar">
            {/* Header Image or Logo Placeholder */}
            <div className="relative h-64 sm:h-72 w-full bg-stone-950">
              {hasValidImage ? (
                <img
                  src={item.image_url}
                  alt={item.title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <LogoPlaceholder size="lg" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-stone-950/80 backdrop-blur-md border border-stone-800 text-stone-300 text-xs font-mono font-medium">
                  {item.category}
                </span>
                <span className="px-4 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-mono font-extrabold text-lg shadow-lg shadow-amber-950/50">
                  {formattedPrice}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-2xl font-bold font-serif text-amber-100 mb-2">
                  {item.title}
                </h2>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags Section */}
              {item.tags.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-stone-400 uppercase tracking-wider font-mono">
                    Dietary & Highlights
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => {
                      const badge = TAG_BADGES[tag] || {
                        label: tag,
                        icon: null,
                        style: 'bg-stone-800 text-stone-300 border-stone-700',
                      };
                      return (
                        <div
                          key={tag}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${badge.style}`}
                        >
                          {badge.icon}
                          <span>{badge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Order / Note Helper Box */}
              <div className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span>Chef Notes:</span>
                  <span className="text-amber-400 font-mono">Made fresh to order</span>
                </div>
                <p className="text-xs text-stone-400 leading-normal">
                  Please inform your server of any severe food allergies before placing your final order.
                </p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center gap-3">
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-xl border transition-all flex items-center justify-center ${
                saved
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-stone-900 text-stone-400 border-stone-800 hover:text-stone-200'
              }`}
              title="Bookmark Dish"
            >
              <Bookmark className={`w-5 h-5 ${saved ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm transition-all shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2 active:scale-95"
            >
              <span>Back to Menu</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
