import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode as QrIcon, Copy, Check, Printer } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [tableNumber] = useState('12');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${currentUrl}?table=${tableNumber}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // SVG QR Code Generator simulation for immediate zero-dependency rendering
  const qrSvgUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    `${currentUrl}?table=${tableNumber}`
  )}&color=d97706&bgcolor=1c1917`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm bg-stone-900 border border-stone-800 rounded-3xl p-6 shadow-2xl z-10 text-center space-y-5"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-800/60 text-stone-300 hover:text-white border border-stone-700 transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <QrIcon className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-xl font-bold font-serif text-amber-100">Digital Menu QR Code</h3>
            <p className="text-xs text-stone-400 mt-1">
              Scan this code from your mobile device to open the digital restaurant menu.
            </p>
          </div>

          {/* QR Code Container */}
          <div className="relative mx-auto w-48 h-48 bg-stone-950 p-3 rounded-2xl border border-stone-800 shadow-inner flex items-center justify-center">
            <img
              src={qrSvgUrl}
              alt="Restaurant Menu QR Code"
              className="w-full h-full rounded-lg object-contain"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-stone-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Link' : 'Copy Menu Link'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
