import React from 'react';
import { X, Sparkles, Award, HeartHandshake, ShieldCheck, Star } from 'lucide-react';
import { SALON_INFO } from '../data/services';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#F9E1E5] via-[#FCECEF] to-[#F9E1E5] px-6 py-6 border-b border-[#C18B63]/30 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/60 transition-colors text-[#75472F]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-xs uppercase tracking-widest text-[#C18B63] font-medium font-display-serif">
            Welcome to Our Sanctuary
          </span>
          <h2 className="text-4xl font-script text-[#75472F] mt-1">Beauty</h2>
          <div className="text-sm tracking-[0.25em] font-display-serif font-bold text-[#75472F] -mt-1">
            PARLOUR
          </div>
          <p className="text-xs text-[#75472F]/80 italic font-serif-luxury mt-2 max-w-xs mx-auto">
            Where timeless elegance, couture makeup, and holistic skin rejuvenation converge.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
          <p className="text-sm text-[#75472F]/90 leading-relaxed font-light">
            Founded with a passion for exquisite aesthetics, <strong className="text-[#75472F]">Beauty Parlour</strong> offers an indulgent retreat for modern women seeking couture hair artistry, flawless bridal glam, restorative botanical facials, and couture nail styling.
          </p>

          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C18B63] block">
              Our Luxury Sanctuary Suites
            </span>
            <div className="grid grid-cols-3 gap-2">
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#C18B63]/30 shadow-xs">
                <img src="/assets/aistudio/image_5811c128.png" alt="VIP Suite" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white">VIP Suite</span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#C18B63]/30 shadow-xs">
                <img src="/assets/aistudio/image_66791fc2.png" alt="Halo Studio" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white">Halo Studio</span>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-[#C18B63]/30 shadow-xs">
                <img src="/assets/aistudio/image_3617284a.png" alt="Hair Spa" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] text-white">Hair Spa</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex flex-col gap-1.5">
              <Award className="w-5 h-5 text-[#C18B63]" />
              <span className="font-semibold text-[#75472F]">Master Artistry</span>
              <span className="text-[#75472F]/70 text-[11px]">Certified celebrity hair and bridal makeup experts.</span>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex flex-col gap-1.5">
              <ShieldCheck className="w-5 h-5 text-[#C18B63]" />
              <span className="font-semibold text-[#75472F]">Clean Hygiene</span>
              <span className="text-[#75472F]/70 text-[11px]">Autoclave sterilization & single-use disposable tools.</span>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex flex-col gap-1.5">
              <HeartHandshake className="w-5 h-5 text-[#C18B63]" />
              <span className="font-semibold text-[#75472F]">VIP Hospitality</span>
              <span className="text-[#75472F]/70 text-[11px]">Private bridal suites & complimentary refreshments.</span>
            </div>

            <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex flex-col gap-1.5">
              <Star className="w-5 h-5 text-[#C18B63]" />
              <span className="font-semibold text-[#75472F]">4.9★ Rated</span>
              <span className="text-[#75472F]/70 text-[11px]">Over 1,200 delighted brides & salon patrons.</span>
            </div>
          </div>

          <div className="p-4 bg-[#FCECEF]/80 rounded-xl border border-[#C18B63]/20 space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C18B63] block">
              Client Testimonial
            </span>
            <p className="text-xs italic text-[#75472F]/85">
              "{SALON_INFO.reviews[0].comment}"
            </p>
            <span className="text-[11px] font-medium text-[#75472F] block">
              — {SALON_INFO.reviews[0].name} ({SALON_INFO.reviews[0].service})
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FCECEF] border-t border-[#C18B63]/25 flex items-center justify-between">
          <span className="text-xs text-[#75472F]/70">Experience the difference</span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white text-xs font-medium hover:opacity-95 shadow-sm transition-all"
          >
            Reserve Your Visit
          </button>
        </div>
      </div>
    </div>
  );
};
