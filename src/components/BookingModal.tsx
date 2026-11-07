import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { SERVICES_DATA, SALON_INFO } from '../data/services';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialSubServiceName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'hair-makeup',
  initialSubServiceName = '',
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [selectedTreatment, setSelectedTreatment] = useState(initialSubServiceName);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Keep state synced when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setSelectedServiceId(initialServiceId);
      setSelectedTreatment(initialSubServiceName);
      setIsConfirmed(false);
    }
  }, [isOpen, initialServiceId, initialSubServiceName]);

  if (!isOpen) return null;

  const currentService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const timeSlots = [
    '09:30 AM',
    '11:00 AM',
    '12:30 PM',
    '02:00 PM',
    '03:30 PM',
    '05:00 PM',
    '06:30 PM',
  ];

  const handleWhatsAppBooking = () => {
    const treatmentText = selectedTreatment ? ` - ${selectedTreatment}` : '';
    const message = `Hello Beauty Parlour! ✨\n\nI would like to book an appointment:\n• Service: ${currentService.title}${treatmentText}\n• Date: ${selectedDate}\n• Preferred Time: ${selectedTime}\n• Guest Name: ${clientName || 'Guest'}\n• Contact: ${clientPhone || 'Provided in chat'}\n${specialNotes ? `• Notes: ${specialNotes}\n` : ''}\nPlease let me know your availability!`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SALON_INFO.whatsappNumber}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleConfirmInApp = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'BP-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setIsConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl my-auto bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden">
        {/* Modal Header */}
        <div className="relative bg-gradient-to-r from-[#F9E1E5] via-[#FCECEF] to-[#F9E1E5] px-6 py-5 border-b border-[#C18B63]/30 flex items-center justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C18B63] font-medium font-display-serif">
              Haute Beauty Reservation
            </span>
            <h2 className="text-2xl font-heading font-semibold text-[#75472F]">
              Book Your Appointment
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/60 transition-colors text-[#75472F]"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isConfirmed ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#E8AAB9]/30 flex items-center justify-center text-[#C18B63]">
              <CheckCircle2 className="w-10 h-10 text-[#C18B63]" />
            </div>
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#C18B63]">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl font-heading text-[#75472F] mt-1">
                We Look Forward to Pampering You
              </h3>
              <p className="text-sm text-[#75472F]/80 mt-1 max-w-md mx-auto">
                Your reservation reference is{' '}
                <span className="font-mono font-bold text-[#75472F]">{bookingRef}</span>. A
                confirmation has been registered for{' '}
                <strong className="text-[#75472F]">{currentService.title}</strong> on{' '}
                <strong className="text-[#75472F]">{selectedDate}</strong> at{' '}
                <strong className="text-[#75472F]">{selectedTime}</strong>.
              </p>
            </div>

            <div className="p-4 bg-[#FCECEF] rounded-xl text-left border border-[#C18B63]/20 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#75472F]/70">Salon:</span>
                <span className="font-medium">{SALON_INFO.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75472F]/70">Location:</span>
                <span className="font-medium text-right">{SALON_INFO.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#75472F]/70">Concierge Desk:</span>
                <a href={`tel:${SALON_INFO.phone}`} className="font-medium text-[#C18B63] hover:underline">
                  {SALON_INFO.displayPhone}
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                Send to Salon WhatsApp
              </button>
              <button
                type="button"
                onClick={onClose}
                className="py-3 px-6 rounded-xl bg-[#C18B63] hover:bg-[#a5704a] text-white font-medium text-sm transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleConfirmInApp} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Category Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75472F]/80 mb-2">
                1. Select Desired Service
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_DATA.map((srv) => {
                  const isSelected = srv.id === selectedServiceId;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => {
                        setSelectedServiceId(srv.id);
                        setSelectedTreatment('');
                      }}
                      className={`px-3 py-2 text-xs text-left rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#C18B63] bg-[#F9E1E5] font-semibold text-[#75472F] shadow-sm'
                          : 'border-[#C18B63]/25 bg-white/70 hover:bg-[#FCECEF]/60 text-[#75472F]/80'
                      }`}
                    >
                      <div className="font-serif-luxury text-sm leading-tight">{srv.title}</div>
                      <div className="text-[10px] text-[#C18B63]">{srv.priceFrom}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sub-Treatment Options */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75472F]/80 mb-2">
                2. Choose Treatment Option (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentService.items.map((item) => {
                  const isSelected = selectedTreatment === item.name;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedTreatment(isSelected ? '' : item.name)}
                      className={`p-2.5 text-left rounded-xl border transition-all ${
                        isSelected
                          ? 'border-[#C18B63] bg-[#F9E1E5] text-[#75472F]'
                          : 'border-[#C18B63]/20 bg-white/60 hover:bg-[#FCECEF]/40 text-[#75472F]/80'
                      }`}
                    >
                      <div className="flex justify-between items-baseline text-xs font-medium">
                        <span>{item.name}</span>
                        <span className="text-[#C18B63] font-semibold">{item.price}</span>
                      </div>
                      <div className="text-[11px] text-[#75472F]/60 mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75472F]/80 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C18B63]" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#C18B63]/30 text-sm text-[#75472F] focus:outline-none focus:ring-2 focus:ring-[#C18B63]/40"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#75472F]/80 mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C18B63]" />
                  Time Slot
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#C18B63]/30 text-sm text-[#75472F] focus:outline-none focus:ring-2 focus:ring-[#C18B63]/40"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Details */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#75472F]/80">
                3. Guest Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="w-4 h-4 text-[#C18B63] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#C18B63]/30 text-sm text-[#75472F] placeholder-[#75472F]/40 focus:outline-none focus:ring-2 focus:ring-[#C18B63]/40"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 text-[#C18B63] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#C18B63]/30 text-sm text-[#75472F] placeholder-[#75472F]/40 focus:outline-none focus:ring-2 focus:ring-[#C18B63]/40"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 text-[#C18B63] absolute left-3 top-2.5" />
                <input
                  type="email"
                  placeholder="Email Address (for calendar invitation)"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#C18B63]/30 text-sm text-[#75472F] placeholder-[#75472F]/40 focus:outline-none focus:ring-2 focus:ring-[#C18B63]/40"
                />
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Special requests, allergy sensitivities, bridal notes..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#C18B63]/30 text-xs text-[#75472F] placeholder-[#75472F]/40 focus:outline-none focus:ring-2 focus:ring-[#C18B63]/40"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#FFF8F4]" />
                Confirm Appointment
              </button>

              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                title="Book directly with our concierge via WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                Book via WhatsApp
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
