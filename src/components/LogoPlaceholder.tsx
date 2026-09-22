import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface LogoPlaceholderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ size = 'md', className = '' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const containerSizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950/40 border border-stone-800/80 p-4 relative overflow-hidden select-none ${className}`}
    >
      {/* Background Decorative Rings */}
      <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-32 h-32 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />

      {/* Brand Icon Circle */}
      <div
        className={`rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-lg shadow-amber-950/40 mb-2 ${containerSizes[size]}`}
      >
        <UtensilsCrossed className={iconSizes[size]} />
      </div>

      {/* Brand Label */}
      <span className="text-amber-100/90 font-serif font-bold text-xs tracking-wider uppercase text-center">
        Lumina Bistro
      </span>
      <span className="text-[10px] text-stone-500 font-mono mt-0.5">Signature Item</span>
    </div>
  );
};
