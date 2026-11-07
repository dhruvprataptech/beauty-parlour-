import React from 'react';
import { X, Sparkles, Clock, Check, Calendar, MessageCircle } from 'lucide-react';
import { ServiceCategory, SALON_INFO } from '../data/services';

interface ServiceDetailModalProps {
  service: ServiceCategory | null;
  onClose: () => void;
  onBookService: (serviceId: string, subTreatmentName?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  const handleWhatsAppInquiry = (subName?: string) => {
    const text = `Hello Beauty Parlour! ✨\n\nI am interested in your "${service.title}" services${
      subName ? ` (${subName})` : ''
    }. Could you please provide consultation availability and recommendations?`;
    const url = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg my-auto bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden">
        {/* Header with decorative pink wash */}
        <div className="relative bg-gradient-to-r from-[#F9E1E5] via-[#FCECEF] to-[#F9E1E5] p-6 border-b border-[#C18B63]/30">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/60 transition-colors text-[#75472F]"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-[#C18B63] text-xs font-display-serif tracking-widest uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Haute Service Spotlight</span>
          </div>

          <h2 className="text-3xl font-heading font-semibold text-[#75472F]">
            {service.title}
          </h2>
          <p className="text-xs text-[#75472F]/80 italic font-serif-luxury mt-0.5">
            {service.tagline}
          </p>

          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-white/80 border border-[#C18B63]/30 font-semibold text-[#75472F]">
              Starting {service.priceFrom}
            </span>
            <span className="flex items-center gap-1 text-[#75472F]/75">
              <Clock className="w-3.5 h-3.5 text-[#C18B63]" />
              {service.duration}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          {/* Description */}
          <p className="text-sm text-[#75472F]/90 leading-relaxed font-light">
            {service.description}
          </p>

          {/* Real Treatment Photo Showcase */}
          {service.galleryImages && service.galleryImages.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C18B63] block">
                Treatment Results & Sanctuary Gallery
              </span>
              <div className="grid grid-cols-3 gap-2">
                {service.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden border border-[#C18B63]/30 shadow-sm bg-[#F9E1E5] group"
                  >
                    <img
                      src={img}
                      alt={`${service.title} treatment ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          <div className="p-4 bg-[#FCECEF]/70 rounded-xl border border-[#C18B63]/25 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C18B63] block">
              Treatment Highlights
            </span>
            <ul className="space-y-1.5 text-xs text-[#75472F]/85">
              {service.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C18B63] mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sub-services / Pricing menu */}
          <div className="space-y-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#75472F]/80 block">
              Service Menu & Pricing
            </span>
            <div className="space-y-2">
              {service.items.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl bg-white/80 border border-[#C18B63]/20 hover:border-[#C18B63]/50 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between">
                      <h4 className="text-sm font-serif-luxury font-semibold text-[#75472F]">
                        {sub.name}
                      </h4>
                      <span className="text-sm font-semibold text-[#C18B63] font-mono">
                        {sub.price}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#75472F]/70 mt-0.5">
                      {sub.description} · <span className="italic">{sub.duration}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onBookService(service.id, sub.name)}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-[#F9E1E5] hover:bg-[#C18B63] hover:text-white text-[#75472F] text-xs font-medium transition-colors border border-[#C18B63]/30"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#FCECEF] border-t border-[#C18B63]/25 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => onBookService(service.id)}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4" />
            Book {service.title}
          </button>
          <button
            onClick={() => handleWhatsAppInquiry()}
            className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};
