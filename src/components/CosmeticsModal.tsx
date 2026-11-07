import React from 'react';
import { X, Sparkles, Heart, ShoppingBag, ShieldCheck, Check } from 'lucide-react';
import { SALON_INFO } from '../data/services';

interface CosmeticsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const CosmeticsModal: React.FC<CosmeticsModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const products = [
    {
      name: 'Rose Elixir Eau de Parfum (100ml)',
      category: 'Haute Fragrance',
      description: 'The iconic transparent crystal bottle featured in our parlour. Notes of Bulgarian Damascena rose, sparkling champagne pear, white amber, and velvety cedarwood.',
      price: '₹3,499',
    },
    {
      name: 'Velvet Rose Hydra-Crème Jar (50ml)',
      category: 'Skincare',
      description: 'Luxe soft-pink restorative cream infused with triple ceramides, pure rose water, and squalane for intense dewy skin elasticity.',
      price: '₹1,899',
    },
    {
      name: 'Rose Gold 18-Shade Velvet Eye Palette',
      category: 'Cosmetics',
      description: 'Professional high-pigment formula featuring warm nude pinks, shimmering champagne metallics, and rich velvet chocolate tones.',
      price: '₹2,199',
    },
    {
      name: 'Master Artisanal Brush Set (10 Brushes)',
      category: 'Tools',
      description: 'Ultra-soft vegan bristles with rose-gold ferrules and ergonomic handles for streak-free foundation, contour, and eye blending.',
      price: '₹1,999',
    },
    {
      name: 'Satin Comfort Luxury Lipsticks',
      category: 'Lip Care',
      description: 'Weightless nourishing lip shades formulated with hyaluronic microspheres and organic shea butter for all-day plush color.',
      price: '₹999',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#F9E1E5] via-[#FCECEF] to-[#F9E1E5] px-6 py-5 border-b border-[#C18B63]/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C18B63] font-medium font-display-serif">
              Parlour Signature Collection
            </span>
            <h2 className="text-2xl font-heading font-semibold text-[#75472F]">
              Haute Cosmetics & Fragrance
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/60 transition-colors text-[#75472F]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-[#75472F]/90 leading-relaxed font-light">
            Every product showcased on our marble pedestal is hand-selected by our master artists for exceptional performance, hypoallergenic skin safety, and timeless luxury. Available exclusively during your appointment or for parlor concierge delivery.
          </p>

          <div className="space-y-3">
            {products.map((prod, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-white/80 rounded-xl border border-[#C18B63]/25 hover:border-[#C18B63] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F9E1E5] text-[#75472F]">
                      {prod.category}
                    </span>
                    <h4 className="text-sm font-serif-luxury font-semibold text-[#75472F]">
                      {prod.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#75472F]/75 mt-1 leading-snug">
                    {prod.description}
                  </p>
                </div>
                <div className="flex items-center justify-between sm:flex-col sm:items-end gap-1.5 shrink-0 pt-1 sm:pt-0 border-t sm:border-0 border-[#C18B63]/10">
                  <span className="text-sm font-bold text-[#C18B63] font-mono">{prod.price}</span>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    In Stock at Parlour
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#FCECEF]/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3 text-xs text-[#75472F]/80">
            <ShieldCheck className="w-5 h-5 text-[#C18B63] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#75472F] block">Complimentary Beauty Consultation</span>
              Our senior artists provide personalized shade matching and skin barrier analysis before every cosmetic recommendation.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FCECEF] border-t border-[#C18B63]/25 flex items-center justify-between">
          <span className="text-xs text-[#75472F]/70">Add to your treatment booking</span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white text-xs font-medium hover:opacity-95 shadow-sm transition-all"
          >
            Book Appointment & Trial
          </button>
        </div>
      </div>
    </div>
  );
};
