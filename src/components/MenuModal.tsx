import React, { useState } from 'react';
import { X, Sparkles, Clock, Calendar } from 'lucide-react';
import { SERVICES_DATA, SALON_INFO } from '../data/services';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string, subTreatmentName?: string) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, onSelectService }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  if (!isOpen) return null;

  const filteredServices =
    activeTab === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.id === activeTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#F9E1E5] via-[#FCECEF] to-[#F9E1E5] px-6 py-5 border-b border-[#C18B63]/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C18B63] font-medium font-display-serif">
              Haute Menu & Pricing
            </span>
            <h2 className="text-2xl font-heading font-semibold text-[#75472F]">
              Salon Services Directory
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

        {/* Tab Filters */}
        <div className="p-4 bg-[#FCECEF]/60 border-b border-[#C18B63]/20 flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
              activeTab === 'all'
                ? 'bg-[#C18B63] text-white shadow-sm'
                : 'text-[#75472F]/80 hover:bg-white/70'
            }`}
          >
            All Services
          </button>
          {SERVICES_DATA.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors font-medium ${
                activeTab === srv.id
                  ? 'bg-[#C18B63] text-white shadow-sm'
                  : 'text-[#75472F]/80 hover:bg-white/70'
              }`}
            >
              {srv.title}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {filteredServices.map((srv) => (
            <div key={srv.id} className="space-y-3">
              <div className="flex items-baseline justify-between border-b border-[#C18B63]/25 pb-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C18B63]" />
                  <h3 className="text-lg font-heading font-semibold text-[#75472F]">
                    {srv.title}
                  </h3>
                </div>
                <span className="text-xs text-[#C18B63] font-medium font-serif-luxury italic">
                  starting from {srv.priceFrom}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {srv.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-white/70 rounded-xl border border-[#C18B63]/20 hover:border-[#C18B63]/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-sm font-serif-luxury font-semibold text-[#75472F]">
                          {item.name}
                        </span>
                        <span className="text-sm font-bold text-[#C18B63] font-mono">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#75472F]/70 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#C18B63]/10">
                      <span className="text-[10px] text-[#75472F]/60 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C18B63]" />
                        {item.duration}
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onSelectService(srv.id, item.name);
                        }}
                        className="px-2.5 py-1 text-[11px] font-medium rounded-md bg-[#F9E1E5] hover:bg-[#C18B63] hover:text-white text-[#75472F] transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-[#FCECEF] border-t border-[#C18B63]/25 flex items-center justify-between text-xs text-[#75472F]/80">
          <span>Custom group bridal packages & house calls available on request.</span>
          <button
            onClick={() => {
              onClose();
              onSelectService('hair-makeup');
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white font-medium flex items-center gap-1.5 hover:opacity-95 shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book Any Service
          </button>
        </div>
      </div>
    </div>
  );
};
