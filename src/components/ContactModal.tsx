import React from 'react';
import { X, MapPin, Phone, Mail, Clock, Instagram, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/services';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const text = `Hello Beauty Parlour! ✨ I would like to inquire about appointments, pricing, and directions.`;
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = () => {
    window.open('https://instagram.com', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#F9E1E5] via-[#FCECEF] to-[#F9E1E5] px-6 py-5 border-b border-[#C18B63]/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C18B63] font-medium font-display-serif">
              Haute Concierge & Visit
            </span>
            <h2 className="text-2xl font-heading font-semibold text-[#75472F]">
              Salon Location & Hours
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
          {/* Quick Contact Action Pills */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${SALON_INFO.phone}`}
              className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/30 hover:border-[#C18B63] flex items-center gap-3 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#F9E1E5] flex items-center justify-center text-[#75472F] group-hover:bg-[#C18B63] group-hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-[#C18B63] font-semibold uppercase block">Telephone</span>
                <span className="text-xs font-semibold text-[#75472F] truncate block">{SALON_INFO.displayPhone}</span>
              </div>
            </a>

            <button
              onClick={handleWhatsApp}
              className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/30 hover:border-[#C18B63] flex items-center gap-3 transition-all group text-left"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] text-emerald-700 font-semibold uppercase block">WhatsApp</span>
                <span className="text-xs font-semibold text-[#75472F] truncate block">Chat Instantly</span>
              </div>
            </button>
          </div>

          {/* Address & Hours */}
          <div className="space-y-3">
            <div className="p-4 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#C18B63] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#75472F]">
                  Salon Sanctuary Address
                </h4>
                <p className="text-xs text-[#75472F]/80 mt-1 leading-relaxed">
                  {SALON_INFO.address}
                </p>
                <div className="text-[11px] text-[#C18B63] font-medium mt-1">
                  Valet parking available for all clients at our main entrance.
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#C18B63] shrink-0 mt-0.5" />
              <div className="w-full">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#75472F] mb-1.5">
                  Opening Hours
                </h4>
                <div className="space-y-1 text-xs text-[#75472F]/85">
                  {SALON_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center py-0.5 border-b border-[#C18B63]/10 last:border-0">
                      <span className="text-[#75472F]/70">{h.days}</span>
                      <span className="font-medium font-mono text-[11px]">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#C18B63] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#75472F]">
                  VIP & Bridal Inquiries
                </h4>
                <a
                  href={`mailto:${SALON_INFO.email}`}
                  className="text-xs text-[#C18B63] hover:underline block mt-0.5"
                >
                  {SALON_INFO.email}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links & Guarantee */}
          <div className="p-4 bg-[#FCECEF]/80 rounded-xl border border-[#C18B63]/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Instagram className="w-4 h-4 text-[#C18B63]" />
              <span className="text-xs font-medium text-[#75472F]">
                Follow us on Instagram {SALON_INFO.instagram}
              </span>
            </div>
            <button
              onClick={handleInstagram}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#C18B63]/30 text-[#75472F] hover:bg-[#C18B63] hover:text-white transition-colors flex items-center gap-1"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FCECEF] border-t border-[#C18B63]/25 flex items-center justify-between gap-3">
          <span className="text-xs text-[#75472F]/80">Ready for your transformation?</span>
          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white text-xs font-medium hover:opacity-95 shadow-sm transition-all"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
