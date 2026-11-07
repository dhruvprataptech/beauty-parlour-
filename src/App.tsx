/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  MessageCircle,
  Phone,
  MapPin,
  Clock,
  Instagram,
  FileText,
  Star,
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Heart,
  Share2,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkle
} from 'lucide-react';
import { SERVICES_DATA, SALON_INFO, ServiceCategory, GALLERY_SHOWCASE, GalleryItem } from './data/services';
import { BookingModal } from './components/BookingModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { MenuModal } from './components/MenuModal';
import { ContactModal } from './components/ContactModal';
import { CosmeticsModal } from './components/CosmeticsModal';
import { AboutModal } from './components/AboutModal';

export default function App() {
  // Navigation & View mode
  const [viewMode, setViewMode] = useState<'website' | 'poster'>('website');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string>('hair-makeup');
  const [bookingSubTreatment, setBookingSubTreatment] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isCosmeticsOpen, setIsCosmeticsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Poster hotspot guide toggle
  const [showHotspotGuides, setShowHotspotGuides] = useState(true);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Gallery filter & Lightbox Modal
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'bridal' | 'hair' | 'nails' | 'facial'>('all');
  const [selectedImageModal, setSelectedImageModal] = useState<GalleryItem | null>(null);

  // Circle image source toggle ('blueprint' for master poster crops, 'studio' for real customer uploads)
  const [circleImageSource, setCircleImageSource] = useState<'blueprint' | 'studio'>('blueprint');

  const STUDIO_CIRCLE_IMAGES: Record<string, string> = {
    'hair-makeup': '/assets/aistudio/image_c737f2cc.png',
    'facial': '/assets/aistudio/image_e0195dc5.png',
    'hair-treatment': '/assets/aistudio/image_3617284a.png',
    'bridal-makeup': '/assets/aistudio/image_a72a212f.png',
    'nail-art': '/assets/aistudio/image_6b50e71e.png',
  };

  // Trigger booking prefilled with service
  const handleOpenBooking = (serviceId: string = 'hair-makeup', subTreatmentName: string = '') => {
    setBookingServiceId(serviceId);
    setBookingSubTreatment(subTreatmentName);
    setSelectedService(null);
    setSelectedImageModal(null);
    setIsBookingOpen(true);
  };

  // WhatsApp link trigger
  const handleDirectWhatsApp = () => {
    const text = `Hello Beauty Parlour! ✨ I would like to book a luxury beauty appointment. Could you please share your availability?`;
    window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  // Share action
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Beauty Parlour - Luxury Salon',
        text: 'Experience couture beauty, bridal artistry & restorative treatments at Beauty Parlour.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const filteredGallery = activeGalleryTab === 'all'
    ? GALLERY_SHOWCASE
    : GALLERY_SHOWCASE.filter(item => item.category === activeGalleryTab);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF8F4] via-[#FCECEF] to-[#F9E1E5] text-[#75472F] selection:bg-[#E8AAB9]/50 selection:text-[#75472F] flex flex-col font-sans">
      
      {/* 1. TOP LUXURY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#FFF8F4]/90 backdrop-blur-md border-b border-[#C18B63]/25 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Wordmark Zone */}
          <div className="flex items-center gap-3">
            <a
              href="#home"
              className="group text-left flex items-baseline gap-2 cursor-pointer focus:outline-none"
            >
              <span className="font-script text-3xl sm:text-4xl text-[#75472F] leading-none group-hover:text-[#C18B63] transition-colors">
                Beauty
              </span>
              <span className="font-display-serif text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#75472F] uppercase">
                PARLOUR
              </span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#75472F]/70 pl-3 border-l border-[#C18B63]/30">
              <Sparkles className="w-3 h-3 text-[#C18B63]" />
              <span>Haute Esthétique</span>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[#75472F]/80">
            <a href="#home" className="hover:text-[#C18B63] transition-colors">Home</a>
            <a href="#services" className="hover:text-[#C18B63] transition-colors">Services</a>
            <a href="#cosmetics" className="hover:text-[#C18B63] transition-colors">Cosmetics</a>
            <a href="#about" className="hover:text-[#C18B63] transition-colors">About Us</a>
            <a href="#gallery" className="hover:text-[#C18B63] transition-colors">Gallery</a>
            <a href="#pricing" className="hover:text-[#C18B63] transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-[#C18B63] transition-colors">Contact</a>
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Mode Toggle Button */}
            <div className="hidden md:flex items-center bg-[#F9E1E5]/70 p-1 rounded-full border border-[#C18B63]/25 text-[11px]">
              <button
                onClick={() => setViewMode('website')}
                className={`px-3 py-1 rounded-full transition-all font-medium ${
                  viewMode === 'website'
                    ? 'bg-[#C18B63] text-white shadow-sm'
                    : 'text-[#75472F]/80 hover:text-[#75472F]'
                }`}
              >
                Website View
              </button>
              <button
                onClick={() => setViewMode('poster')}
                className={`px-3 py-1 rounded-full transition-all font-medium ${
                  viewMode === 'poster'
                    ? 'bg-[#C18B63] text-white shadow-sm'
                    : 'text-[#75472F]/80 hover:text-[#75472F]'
                }`}
              >
                Original Poster
              </button>
            </div>

            <button
              onClick={handleDirectWhatsApp}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-medium border border-emerald-300 transition-colors"
              title="Chat with Concierge on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={() => handleOpenBooking()}
              className="px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white text-xs sm:text-sm font-medium shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Book Appointment
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden text-[#75472F] rounded-lg hover:bg-[#F9E1E5]/60 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pt-4 pb-3 px-2 border-t border-[#C18B63]/20 mt-3 space-y-2 animate-fade-in bg-[#FFF8F4]">
            <div className="flex gap-2 p-1 bg-[#F9E1E5]/70 rounded-xl mb-3 text-xs">
              <button
                onClick={() => { setViewMode('website'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium ${
                  viewMode === 'website' ? 'bg-[#C18B63] text-white' : 'text-[#75472F]'
                }`}
              >
                Full Website
              </button>
              <button
                onClick={() => { setViewMode('poster'); setMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 rounded-lg text-center font-medium ${
                  viewMode === 'poster' ? 'bg-[#C18B63] text-white' : 'text-[#75472F]'
                }`}
              >
                Original Poster
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">Home</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">Services</a>
              <a href="#cosmetics" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">Cosmetics</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">About Us</a>
              <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">Gallery</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">Pricing</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg hover:bg-[#F9E1E5]/60">Contact</a>
              <button onClick={() => { setIsMenuOpen(true); setMobileMenuOpen(false); }} className="p-2 text-left rounded-lg text-[#C18B63]">
                Full Price Menu
              </button>
            </div>
            <div className="pt-2 border-t border-[#C18B63]/20 flex gap-2">
              <button
                onClick={() => { handleDirectWhatsApp(); setMobileMenuOpen(false); }}
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 text-white text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </button>
              <a
                href={`tel:${SALON_INFO.phone}`}
                className="py-2 px-3 rounded-lg bg-white border border-[#C18B63]/30 text-[#75472F] text-xs font-medium flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#C18B63]" />
                Call Salon
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 2. MAIN CONTENT AREA */}
      {viewMode === 'poster' ? (
        /* ================= ORIGINAL POSTER BLUEPRINT VIEW ================= */
        <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6">
          <div className="mb-3 text-center">
            <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
              Master Blueprint Mode
            </span>
            <p className="text-xs text-[#75472F]/70 font-serif-luxury italic">
              Interactive 1:1 reproduction of the original promotional poster. Tap any service circle to book.
            </p>
          </div>

          <div
            className="relative w-full max-w-[576px] aspect-[576/1024] rounded-2xl sm:rounded-3xl shadow-2xl shadow-rose-950/20 border border-[#C18B63]/40 overflow-hidden bg-[#F9E1E5]"
            style={{ maxHeight: 'calc(100vh - 160px)' }}
          >
            <img
              src="/assets/aistudio/image_0299165f.png"
              alt="Beauty Parlour Promotional Poster"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            />

            {/* Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[12%] left-[45%] text-[#FFF8F4] animate-sparkle opacity-80">✦</div>
              <div className="absolute top-[28%] left-[18%] text-[#FFF8F4] animate-sparkle opacity-70 text-xs" style={{ animationDelay: '1.2s' }}>✦</div>
              <div className="absolute top-[48%] left-[32%] text-[#FFF8F4] animate-sparkle opacity-60 text-xs" style={{ animationDelay: '2.4s' }}>✦</div>
              <div className="absolute top-[52%] right-[8%] text-[#FFF8F4] animate-sparkle opacity-75 text-sm" style={{ animationDelay: '0.7s' }}>✦</div>
              <div className="absolute bottom-[22%] left-[12%] text-[#FFF8F4] animate-sparkle opacity-70 text-xs" style={{ animationDelay: '1.8s' }}>✦</div>
            </div>

            {/* Hotspot: Logo */}
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="absolute z-20 cursor-pointer rounded-2xl hover:border-2 hover:border-[#C18B63]/60 transition-all"
              style={{ top: '5.5%', left: '2%', width: '46%', height: '19%' }}
              title="About Beauty Parlour"
            />

            {/* Hotspots: 5 Circles */}
            {SERVICES_DATA.map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => setSelectedService(srv)}
                className="absolute z-20 cursor-pointer rounded-full transition-all group"
                style={{
                  top: `${srv.coords.top}%`,
                  left: `${srv.coords.left}%`,
                  width: `${srv.coords.width}%`,
                  height: `${srv.coords.height}%`,
                }}
                title={`${srv.title} - Click for details`}
              >
                <div className="absolute inset-0 rounded-full group-hover:ring-4 group-hover:ring-[#C18B63] group-hover:bg-[#C18B63]/15 transition-all" />
              </button>
            ))}

            {/* Hotspot: Cosmetics */}
            <button
              type="button"
              onClick={() => setIsCosmeticsOpen(true)}
              className="absolute z-20 cursor-pointer rounded-2xl hover:border-2 hover:border-[#C18B63]/60 transition-all"
              style={{ top: '76.5%', left: '2%', width: '73%', height: '21.5%' }}
              title="Haute Cosmetics Collection"
            />
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={() => setViewMode('website')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white text-xs font-medium shadow"
            >
              Switch to Full Website View
            </button>
          </div>
        </div>
      ) : (
        /* ================= FULL RESPONSIVE LUXURY WEBSITE ================= */
        <div className="space-y-16 sm:space-y-24 pb-16">
          
          {/* SECTION 1: HERO SECTION — EXACT RECREATION OF REFERENCE IMAGE */}
          <section id="home" className="relative overflow-hidden pt-6 sm:pt-12 pb-8 sm:pb-16 px-4 sm:px-8 border-b border-[#C18B63]/20">
            {/* Soft pink silk gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8F4] via-[#FCECEF] to-[#F9E1E5] pointer-events-none" />
            
            {/* Ambient luxury sparkles */}
            <div className="absolute inset-0 pointer-events-none opacity-60">
              <span className="absolute top-10 left-[15%] text-lg text-[#C18B63]/60 animate-sparkle">✦</span>
              <span className="absolute top-28 left-[40%] text-sm text-[#C18B63]/40 animate-sparkle" style={{ animationDelay: '1.5s' }}>✦</span>
              <span className="absolute top-16 right-[25%] text-xl text-[#C18B63]/70 animate-sparkle" style={{ animationDelay: '0.8s' }}>✦</span>
              <span className="absolute bottom-12 left-[30%] text-xs text-[#C18B63]/50 animate-sparkle" style={{ animationDelay: '2.1s' }}>✦</span>
            </div>

            <div className="relative max-w-4xl mx-auto flex flex-col items-center justify-center space-y-6 text-center z-10 py-6 sm:py-8">
              
              {/* Floating floral badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C18B63]/30 text-xs text-[#75472F] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C18B63]" />
                <span className="font-display-serif tracking-widest uppercase text-[11px] font-semibold text-[#C18B63]">
                  Haute Beauty Sanctuary
                </span>
              </div>

              {/* Big cursive "Beauty" + uppercase "PARLOUR" */}
              <div className="space-y-0">
                <h1 className="font-script text-7xl sm:text-8xl md:text-9xl text-[#75472F] tracking-normal leading-[0.85] drop-shadow-sm select-none">
                  Beauty
                </h1>
                <div className="font-display-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.28em] font-semibold text-[#75472F] uppercase pt-1">
                  PARLOUR
                </div>
              </div>

              {/* Golden Ornamental Divider */}
              <div className="flex items-center justify-center gap-3 w-full max-w-sm py-1">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C18B63] to-[#C18B63]" />
                <div className="text-[#C18B63] text-sm tracking-widest">❧ ✦ ☙</div>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C18B63] to-[#C18B63]" />
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg text-[#75472F]/85 font-serif-luxury italic leading-relaxed max-w-2xl">
                Where timeless sophistication, couture bridal artistry, restorative botanical skin therapies, and couture styling converge in pure pink silk luxury.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <button
                  onClick={() => handleOpenBooking()}
                  className="px-7 sm:px-9 py-3.5 rounded-full bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#FFF8F4]" />
                  <span>Reserve Appointment</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="px-6 sm:px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Booking</span>
                </button>

                <a
                  href="#services"
                  className="px-6 py-3.5 rounded-full bg-white/80 hover:bg-white text-[#75472F] font-medium text-sm border border-[#C18B63]/30 transition-all flex items-center gap-1.5"
                >
                  <span>Explore Services</span>
                  <ChevronRight className="w-4 h-4 text-[#C18B63]" />
                </a>
              </div>

              {/* Pink Floral Decoration Cluster */}
              <div className="pt-4 flex items-center justify-center gap-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-sm border border-[#C18B63]/30 shrink-0">
                  <img
                    src="/assets/salon/floral_bouquet.png"
                    alt="Pink orchids and roses"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left text-xs text-[#75472F]/80">
                  <span className="font-semibold text-[#75472F] block">Curated Luxury Ambiance</span>
                  <span className="font-serif-luxury italic">Fresh Bulgarian rose extracts & soothing aromatherapy</span>
                </div>
              </div>

            </div>
          </section>

          {/* FEATURED REAL STUDIO & CLIENT TRANSFORMATIONS STRIP */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 -mt-6 sm:-mt-10 relative z-20">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#C18B63]/30 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#C18B63]/15 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-display-serif font-bold text-[#C18B63]">
                    Live Salon Showcase & Client Transformations
                  </span>
                  <span className="hidden md:inline-block text-[11px] text-[#75472F]/60 font-serif-luxury italic">
                    · Real photography from our suites & treatments
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <a
                    href="#gallery"
                    className="text-[#C18B63] hover:text-[#75472F] font-medium flex items-center gap-1 transition-colors"
                  >
                    <span>View All {GALLERY_SHOWCASE.length} Transformations</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Scrollable Horizontal Reel of Real Photos */}
              <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none snap-x">
                {[
                  {
                    id: 'gal-15',
                    img: '/assets/aistudio/image_a72a212f.png',
                    title: 'Royal Ivory Bride & Floral Updo',
                    tag: 'Haute Bridal',
                    price: '₹18,999',
                    serviceId: 'bridal-makeup',
                  },
                  {
                    id: 'gal-17',
                    img: '/assets/aistudio/image_e0195dc5.png',
                    title: 'Damascena Fresh Rose Mask',
                    tag: 'Rose Therapy',
                    price: '₹1,499',
                    serviceId: 'facial',
                  },
                  {
                    id: 'gal-24',
                    img: '/assets/aistudio/image_c737f2cc.png',
                    title: '9-Style Sculpted Rose Buns',
                    tag: 'Hair Lookbook',
                    price: '₹1,999',
                    serviceId: 'hair-makeup',
                  },
                  {
                    id: 'gal-25',
                    img: '/assets/aistudio/image_194de363.png',
                    title: '16-Design Braid & Pearl Catalog',
                    tag: 'Hair Artistry',
                    price: '₹1,899',
                    serviceId: 'hair-makeup',
                  },
                  {
                    id: 'gal-19',
                    img: '/assets/aistudio/image_6b50e71e.png',
                    title: 'Butterfly & Pearl Ombre Nails',
                    tag: 'Haute Gel Art',
                    price: '₹1,699',
                    serviceId: 'nail-art',
                  },
                  {
                    id: 'gal-18',
                    img: '/assets/aistudio/image_eb4d80b9.png',
                    title: 'Ayurvedic Herbal Detox Mask',
                    tag: 'Herbal Detox',
                    price: '₹1,299',
                    serviceId: 'facial',
                  },
                  {
                    id: 'gal-26',
                    img: '/assets/aistudio/image_8a002fca.png',
                    title: 'Enchanted Heart-Weave Curls',
                    tag: 'Fairy-tale Waves',
                    price: '₹2,199',
                    serviceId: 'hair-treatment',
                  },
                  {
                    id: 'gal-1',
                    img: '/assets/aistudio/image_616814bb.png',
                    title: '24K Royal Gold Leaf Facial',
                    tag: 'Pure Gold Leaf',
                    price: '₹2,999',
                    serviceId: 'facial',
                  },
                  {
                    id: 'gal-2',
                    img: '/assets/aistudio/image_d73cdfb4.png',
                    title: 'Royal Indian Pastel Bride',
                    tag: 'Bridal Glow',
                    price: '₹18,999',
                    serviceId: 'bridal-makeup',
                  },
                  {
                    id: 'gal-3',
                    img: '/assets/aistudio/image_bfcf177a.png',
                    title: 'Rose Copper Tub Pedicure',
                    tag: 'Foot Sanctuary',
                    price: '₹1,899',
                    serviceId: 'nail-art',
                  },
                  {
                    id: 'gal-5',
                    img: '/assets/aistudio/image_3617284a.png',
                    title: 'Botanical Hair Spa Basin',
                    tag: 'Argan Therapy',
                    price: '₹1,499',
                    serviceId: 'hair-treatment',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      const found = GALLERY_SHOWCASE.find((g) => g.id === item.id);
                      if (found) setSelectedImageModal(found);
                    }}
                    className="shrink-0 w-44 sm:w-52 bg-[#FFF8F4] rounded-xl overflow-hidden border border-[#C18B63]/25 hover:border-[#C18B63] hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#F9E1E5]">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[9px] font-semibold text-[#75472F] uppercase border border-[#C18B63]/30">
                        {item.tag}
                      </span>
                    </div>
                    <div className="p-2.5">
                      <h4 className="font-serif-luxury font-semibold text-xs text-[#75472F] group-hover:text-[#C18B63] transition-colors truncate">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1 text-[11px]">
                        <span className="font-mono font-bold text-[#C18B63]">{item.price}</span>
                        <span className="text-[10px] text-[#75472F]/70 font-medium underline">Zoom Look</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECTION 2: SERVICES SECTION — EXACT CIRCULAR DESIGN */}
          <section id="services" className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                Haute Service Collection
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                Our Signature Services
              </h2>
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-[1px] w-12 bg-[#C18B63]/50" />
                <span className="text-[#C18B63] text-xs">✦</span>
                <div className="h-[1px] w-12 bg-[#C18B63]/50" />
              </div>
              <p className="text-xs sm:text-sm text-[#75472F]/80 font-serif-luxury italic">
                Presented in five signature disciplines. Click any circular photograph to view treatments and reserve.
              </p>

              {/* Circle Image Mode Switcher */}
              <div className="inline-flex items-center gap-1.5 p-1 bg-white/80 rounded-full border border-[#C18B63]/30 mt-2 shadow-sm text-xs">
                <button
                  type="button"
                  onClick={() => setCircleImageSource('blueprint')}
                  className={`px-3 py-1 rounded-full transition-all font-medium ${
                    circleImageSource === 'blueprint'
                      ? 'bg-[#C18B63] text-white shadow-xs'
                      : 'text-[#75472F]/75 hover:text-[#75472F]'
                  }`}
                >
                  Poster Blueprint Artwork
                </button>
                <button
                  type="button"
                  onClick={() => setCircleImageSource('studio')}
                  className={`px-3 py-1 rounded-full transition-all font-medium flex items-center gap-1.5 ${
                    circleImageSource === 'studio'
                      ? 'bg-[#C18B63] text-white shadow-xs'
                      : 'text-[#75472F]/75 hover:text-[#75472F]'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  <span>Real Client Photography</span>
                </button>
              </div>
            </div>

            {/* Desktop: One Horizontal Row of 5 Circles. Mobile: Horizontal Swipeable Row */}
            <div className="flex lg:grid lg:grid-cols-5 gap-6 sm:gap-8 overflow-x-auto pb-4 pt-2 px-2 snap-x snap-mandatory scrollbar-none items-start justify-start lg:justify-center">
              {SERVICES_DATA.map((service, index) => {
                const currentImg =
                  circleImageSource === 'studio'
                    ? STUDIO_CIRCLE_IMAGES[service.id] || service.image
                    : service.image;

                return (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="flex flex-col items-center text-center shrink-0 w-44 sm:w-48 lg:w-full snap-center group cursor-pointer"
                  >
                    {/* Circular Cropped Photograph with Double Rose-Gold Border & Shadow */}
                    <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 border-2 border-[#C18B63] shadow-lg shadow-rose-950/15 group-hover:shadow-2xl group-hover:shadow-[#C18B63]/40 group-hover:scale-105 transition-all duration-300 bg-white">
                      {/* Inner thin rose-gold border ring */}
                      <div className="w-full h-full rounded-full p-1 border border-[#C18B63]/60 overflow-hidden">
                        <img
                          src={currentImg}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Subtle pulse glow indicator */}
                      <div className="absolute inset-0 rounded-full group-hover:ring-4 group-hover:ring-[#C18B63]/40 transition-all pointer-events-none" />

                      {/* Index badge */}
                      <div className="absolute top-1 right-1 w-6 h-6 rounded-full bg-[#FFF8F4] border border-[#C18B63] text-[#75472F] text-[10px] font-serif-luxury font-bold flex items-center justify-center shadow-sm">
                        0{index + 1}
                      </div>
                    </div>

                    {/* Elegant Italic Serif Title Directly Underneath */}
                    <div className="mt-4 space-y-1">
                      <h3 className="font-serif-luxury italic text-xl sm:text-2xl font-semibold text-[#75472F] group-hover:text-[#C18B63] transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <span className="text-xs text-[#C18B63] font-medium font-sans block">
                        from {service.priceFrom} · <span className="text-[#75472F]/60 text-[11px]">{service.duration}</span>
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking(service.id);
                        }}
                        className="mt-2 text-[11px] font-medium text-[#75472F] group-hover:text-[#C18B63] flex items-center justify-center gap-1 mx-auto underline decoration-[#C18B63]/40 group-hover:decoration-[#C18B63]"
                      >
                        <span>Book Service</span>
                        <ChevronRight className="w-3 h-3 text-[#C18B63]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile swipe helper */}
            <div className="lg:hidden text-center text-[11px] text-[#75472F]/60 mt-2 font-serif-luxury italic">
              ← Swipe horizontally to browse all 5 circular services →
            </div>

            {/* ROYAL INDIAN BRIDAL SPOTLIGHT BANNER */}
            <div className="mt-12 bg-gradient-to-r from-[#FFF8F4] via-[#FCECEF] to-[#FFF8F4] rounded-3xl p-6 sm:p-10 border border-[#C18B63]/30 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-5 relative">
                  <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-[#C18B63]/40 shadow-2xl bg-[#F9E1E5] group">
                    <img
                      src="/assets/aistudio/image_d73cdfb4.png"
                      alt="Royal Indian Bride in Pastel Pink Lehenga"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#75472F] uppercase border border-[#C18B63]/40 shadow">
                      ✦ Real Parlour Bride
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/85 backdrop-blur-md border border-[#C18B63]/30 text-xs">
                      <span className="font-semibold text-[#75472F] block">Pastel Pink Bridal Couture Look</span>
                      <span className="text-[11px] text-[#75472F]/70 font-serif-luxury italic">Kundan & emerald setting with HD airbrush glow</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9E1E5] border border-[#C18B63]/30 text-xs text-[#C18B63] font-display-serif tracking-widest uppercase font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Regal Wedding Day Artistry
                  </div>
                  <h3 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                    The Royal Indian Bridal Experience
                  </h3>
                  <p className="text-sm text-[#75472F]/85 font-serif-luxury italic leading-relaxed">
                    Designed for the discerning bride. From intricate diamond & emerald jewellery pinning to tearproof 24-hour HD waterproof airbrush, our master bridal artisans ensure you radiate timeless elegance.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C18B63] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#75472F] block">Sangeet & Cocktail Glam:</strong>
                        <span className="text-[#75472F]/75">Shimmer rose gold eyes & textured waves · <span className="font-mono font-bold text-[#C18B63]">₹8,999</span></span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C18B63] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#75472F] block">Wedding Day Bridal Couture:</strong>
                        <span className="text-[#75472F]/75">Full bridal HD base, jewelry & dupatta pinning · <span className="font-mono font-bold text-[#C18B63]">₹18,999</span></span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C18B63] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#75472F] block">The Empress Grand Package:</strong>
                        <span className="text-[#75472F]/75">Trial + Wedding Day + 24K Gold Facial · <span className="font-mono font-bold text-[#C18B63]">₹24,999</span></span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#C18B63] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#75472F] block">VIP Private Bridal Suite:</strong>
                        <span className="text-[#75472F]/75">Complimentary rosé, fruit & macaron service for bride & mother</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <button
                      onClick={() => handleOpenBooking('bridal-makeup')}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white font-medium text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Bridal Consultation</span>
                    </button>
                    <button
                      onClick={() => {
                        const text = "Hello Beauty Parlour! ✨ I would like to inquire about your Royal Indian Bridal Makeup packages and artist availability for my wedding date.";
                        window.open(`https://wa.me/${SALON_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
                      }}
                      className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Bridal Desk</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: BOTTOM COSMETICS SECTION — EXACT RECREATION OF MARBLE DISPLAY */}
          <section id="cosmetics" className="relative max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="bg-gradient-to-r from-[#FFF8F4] via-[#FCECEF] to-[#FFF8F4] rounded-3xl border border-[#C18B63]/30 shadow-xl overflow-hidden p-6 sm:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Authentic Cosmetics Display on Marble */}
                <div className="lg:col-span-7 flex flex-col items-center">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-[#C18B63]/30 bg-white">
                    <img
                      src="/assets/salon/cosmetics_display.png"
                      alt="Luxury Cosmetics & Perfume on Marble Platform"
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-[#C18B63]/30 text-[11px] font-medium text-[#75472F] flex items-center gap-1.5 shadow-sm">
                      <Sparkles className="w-3 h-3 text-[#C18B63]" />
                      <span>Signature Parlour Collection</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#75472F]/70 font-serif-luxury italic mt-2 text-center">
                    Arranged on Italian marble: Crystal Rose Elixir, Velvet Hydra-Jars & 18-Shade Rose Gold Palette
                  </span>
                </div>

                {/* Right Column: Cosmetics Description & Inclusions */}
                <div className="lg:col-span-5 space-y-5 text-left">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                      Luxury Fragrance & Essentials
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#75472F]">
                      Haute Parlour Cosmetics
                    </h2>
                    <p className="text-xs sm:text-sm text-[#75472F]/80 font-serif-luxury italic leading-relaxed">
                      Every formula used in our bridal and skincare suites is crafted with hypoallergenic botanical infusions, diamond micro-pigments, and cold-pressed Damascena rose.
                    </p>
                  </div>

                  {/* Product Highlights */}
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#C18B63] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#75472F]">Rose Elixir Crystal Perfume:</strong>
                        <span className="text-[#75472F]/80 ml-1">Sparkling pear champagne, Bulgarian rose & white amber accord.</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#C18B63] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#75472F]">Velvet Hydra-Crème Jar:</strong>
                        <span className="text-[#75472F]/80 ml-1">Triple ceramide barrier replenishment for 24-hour glass skin.</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white/80 rounded-xl border border-[#C18B63]/20 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#C18B63] mt-1.5 shrink-0" />
                      <div>
                        <strong className="text-[#75472F]">18-Shade Rose Gold Palette:</strong>
                        <span className="text-[#75472F]/80 ml-1">Ultra-pigmented velvet mattes and duochrome bridal shimmers.</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      onClick={() => setIsCosmeticsOpen(true)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white text-xs font-medium shadow-sm transition-all"
                    >
                      View Full Cosmetics Catalog
                    </button>
                    <button
                      onClick={() => handleOpenBooking('facial')}
                      className="px-4 py-2.5 rounded-full bg-white border border-[#C18B63]/30 hover:border-[#C18B63] text-[#75472F] text-xs font-medium transition-colors"
                    >
                      Book with Facial Trial
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* HAUTE BRIDAL COUTURE & SIGNATURE HAIR LOOKBOOK */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-br from-[#FFF8F4] via-[#FCECEF] to-[#F9E1E5] rounded-3xl p-6 sm:p-10 border border-[#C18B63]/30 shadow-xl space-y-8">
              
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                  Couture Lookbook & Editorial
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                  Haute Bridal & Hair Styling Masterpieces
                </h2>
                <div className="flex items-center justify-center gap-2 py-1">
                  <div className="h-[1px] w-12 bg-[#C18B63]/50" />
                  <span className="text-[#C18B63] text-xs">✦</span>
                  <div className="h-[1px] w-12 bg-[#C18B63]/50" />
                </div>
                <p className="text-xs sm:text-sm text-[#75472F]/80 font-serif-luxury italic">
                  Explore our exclusive portfolio of divine bridal avatars, layered couture ballgowns, and master-crafted floral hairstyle catalogs.
                </p>
              </div>

              {/* Master Hairstyle Lookbook Showcase (16-style & 9-style catalogs) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* 16-Design Hairstyle Catalog Card */}
                <div
                  onClick={() => {
                    const found = GALLERY_SHOWCASE.find((g) => g.id === 'gal-25');
                    if (found) setSelectedImageModal(found);
                  }}
                  className="lg:col-span-6 bg-white/90 rounded-2xl p-5 border border-[#C18B63]/30 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] max-h-[460px] rounded-xl overflow-hidden border border-[#C18B63]/30 bg-[#F9E1E5]">
                    <img
                      src="/assets/aistudio/image_194de363.png"
                      alt="16-Design Half-Up Braid & Pearl Hairstyle Guide"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#75472F] uppercase border border-[#C18B63]/30 shadow">
                      ✦ 16-Design Master Catalog
                    </div>
                  </div>
                  <div className="pt-4 space-y-1 text-left">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-heading text-lg font-semibold text-[#75472F] group-hover:text-[#C18B63] transition-colors">
                        16-Design Half-Up Braid & Pearl Catalog
                      </h4>
                      <span className="font-mono font-bold text-[#C18B63] text-sm">₹1,899</span>
                    </div>
                    <p className="text-xs text-[#75472F]/75 font-light">
                      Heart plaits, cascading floral brooches, and delicate pearl drop chains tailored for receptions and sangeet celebrations.
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-[#C18B63] font-serif-luxury italic">Click to Inspect Full 16 Styles</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking('hair-makeup', '16-Design Braid Styling');
                        }}
                        className="px-3 py-1 rounded-lg bg-[#F9E1E5] hover:bg-[#C18B63] hover:text-white text-xs font-medium text-[#75472F] transition-colors"
                      >
                        Book Style
                      </button>
                    </div>
                  </div>
                </div>

                {/* 9-Style Sculpted Rose Bun Card */}
                <div
                  onClick={() => {
                    const found = GALLERY_SHOWCASE.find((g) => g.id === 'gal-24');
                    if (found) setSelectedImageModal(found);
                  }}
                  className="lg:col-span-6 bg-white/90 rounded-2xl p-5 border border-[#C18B63]/30 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] max-h-[460px] rounded-xl overflow-hidden border border-[#C18B63]/30 bg-[#F9E1E5]">
                    <img
                      src="/assets/aistudio/image_c737f2cc.png"
                      alt="9-Style Sculpted Rose Bun Collection"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold text-[#75472F] uppercase border border-[#C18B63]/30 shadow">
                      ✦ 9-Style Rose Buns
                    </div>
                  </div>
                  <div className="pt-4 space-y-1 text-left">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-heading text-lg font-semibold text-[#75472F] group-hover:text-[#C18B63] transition-colors">
                        9-Style Sculpted Rose Bun Collection
                      </h4>
                      <span className="font-mono font-bold text-[#C18B63] text-sm">₹1,999</span>
                    </div>
                    <p className="text-xs text-[#75472F]/75 font-light">
                      Sculpted rose petals molded from natural hair, adorned with freshwater pearls, French mesh netting, and crystal leaves.
                    </p>
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[11px] text-[#C18B63] font-serif-luxury italic">Click to Inspect Full 9 Rose Buns</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking('hair-makeup', 'Sculpted Rose Bun');
                        }}
                        className="px-3 py-1 rounded-lg bg-[#F9E1E5] hover:bg-[#C18B63] hover:text-white text-xs font-medium text-[#75472F] transition-colors"
                      >
                        Book Style
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* 4-Card Bridal Couture & Spa Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Ayurvedic Herbal Detox Mask */}
                <div
                  onClick={() => {
                    const found = GALLERY_SHOWCASE.find((g) => g.id === 'gal-18');
                    if (found) setSelectedImageModal(found);
                  }}
                  className="bg-white/90 rounded-2xl overflow-hidden border border-[#C18B63]/25 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] max-h-[300px] overflow-hidden bg-[#F9E1E5]">
                    <img
                      src="/assets/aistudio/image_eb4d80b9.png"
                      alt="Ayurvedic Herbal Detox Mask"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#75472F]">
                      Herbal Detox
                    </span>
                  </div>
                  <div className="p-3 text-left">
                    <h5 className="font-serif-luxury font-semibold text-sm text-[#75472F] group-hover:text-[#C18B63] truncate">
                      Ayurvedic Herbal Detox Therapy
                    </h5>
                    <div className="flex justify-between items-center mt-1 text-xs">
                      <span className="font-mono font-bold text-[#C18B63]">₹1,299</span>
                      <span className="text-[10px] text-[#75472F]/70 underline">View Look</span>
                    </div>
                  </div>
                </div>

                {/* Royal Ivory Bride */}
                <div
                  onClick={() => {
                    const found = GALLERY_SHOWCASE.find((g) => g.id === 'gal-15');
                    if (found) setSelectedImageModal(found);
                  }}
                  className="bg-white/90 rounded-2xl overflow-hidden border border-[#C18B63]/25 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] max-h-[300px] overflow-hidden bg-[#F9E1E5]">
                    <img
                      src="/assets/aistudio/image_a72a212f.png"
                      alt="Royal Ivory Bride & Floral Updo"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#75472F]">
                      Ivory Bridal
                    </span>
                  </div>
                  <div className="p-3 text-left">
                    <h5 className="font-serif-luxury font-semibold text-sm text-[#75472F] group-hover:text-[#C18B63] truncate">
                      Royal Ivory & White Rose Updo
                    </h5>
                    <div className="flex justify-between items-center mt-1 text-xs">
                      <span className="font-mono font-bold text-[#C18B63]">₹18,999</span>
                      <span className="text-[10px] text-[#75472F]/70 underline">View Look</span>
                    </div>
                  </div>
                </div>

                {/* Damascena Rose Petal Mask */}
                <div
                  onClick={() => {
                    const found = GALLERY_SHOWCASE.find((g) => g.id === 'gal-17');
                    if (found) setSelectedImageModal(found);
                  }}
                  className="bg-white/90 rounded-2xl overflow-hidden border border-[#C18B63]/25 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] max-h-[300px] overflow-hidden bg-[#F9E1E5]">
                    <img
                      src="/assets/aistudio/image_e0195dc5.png"
                      alt="Damascena Fresh Rose Petal Mask"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#75472F]">
                      Rose Glow
                    </span>
                  </div>
                  <div className="p-3 text-left">
                    <h5 className="font-serif-luxury font-semibold text-sm text-[#75472F] group-hover:text-[#C18B63] truncate">
                      Damascena Rose Petal Mask
                    </h5>
                    <div className="flex justify-between items-center mt-1 text-xs">
                      <span className="font-mono font-bold text-[#C18B63]">₹1,499</span>
                      <span className="text-[10px] text-[#75472F]/70 underline">View Look</span>
                    </div>
                  </div>
                </div>

                {/* Haute Butterfly Nails */}
                <div
                  onClick={() => {
                    const found = GALLERY_SHOWCASE.find((g) => g.id === 'gal-19');
                    if (found) setSelectedImageModal(found);
                  }}
                  className="bg-white/90 rounded-2xl overflow-hidden border border-[#C18B63]/25 shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[9/16] max-h-[300px] overflow-hidden bg-[#F9E1E5]">
                    <img
                      src="/assets/aistudio/image_6b50e71e.png"
                      alt="Haute Butterfly & Pearl Ombre Nails"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-white/90 text-[10px] font-semibold text-[#75472F]">
                      Haute Gel
                    </span>
                  </div>
                  <div className="p-3 text-left">
                    <h5 className="font-serif-luxury font-semibold text-sm text-[#75472F] group-hover:text-[#C18B63] truncate">
                      Butterfly & Pearl Ombre Nails
                    </h5>
                    <div className="flex justify-between items-center mt-1 text-xs">
                      <span className="font-mono font-bold text-[#C18B63]">₹1,699</span>
                      <span className="text-[10px] text-[#75472F]/70 underline">View Look</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>

          {/* SECTION 4: GALLERY SECTION — BRIDAL, HAIR & NAIL TRANSFORMATIONS */}
          <section id="gallery" className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                Haute Portfolio
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                Bridal & Beauty Gallery
              </h2>
              <div className="flex items-center justify-center gap-2 py-1">
                <div className="h-[1px] w-12 bg-[#C18B63]/50" />
                <span className="text-[#C18B63] text-xs">✦</span>
                <div className="h-[1px] w-12 bg-[#C18B63]/50" />
              </div>
            </div>

            {/* Gallery Category Tabs */}
            <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2 text-xs">
              {[
                { id: 'all', label: `All Portfolio (${GALLERY_SHOWCASE.length})` },
                { id: 'bridal', label: `Bridal Artistry (${GALLERY_SHOWCASE.filter(x => x.category === 'bridal').length})` },
                { id: 'facial', label: `Facials & Skin Glow (${GALLERY_SHOWCASE.filter(x => x.category === 'facial').length})` },
                { id: 'hair', label: `Hair & Styling (${GALLERY_SHOWCASE.filter(x => x.category === 'hair').length})` },
                { id: 'nails', label: `Nails & Pedicure (${GALLERY_SHOWCASE.filter(x => x.category === 'nails').length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGalleryTab(tab.id as any)}
                  className={`px-4 py-2 rounded-full transition-all font-medium whitespace-nowrap cursor-pointer ${
                    activeGalleryTab === tab.id
                      ? 'bg-[#C18B63] text-white shadow-sm'
                      : 'bg-white/70 hover:bg-[#F9E1E5] text-[#75472F] border border-[#C18B63]/25'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid (All 14 High-Res Real Photos) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedImageModal(item)}
                  className="bg-white/90 rounded-2xl overflow-hidden border border-[#C18B63]/25 shadow-sm hover:shadow-xl transition-all group flex flex-col cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#F9E1E5]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-semibold text-[#75472F] uppercase tracking-wider border border-[#C18B63]/30 shadow-sm">
                      {item.tag}
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-[#75472F] text-xs font-medium shadow flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C18B63]" />
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif-luxury font-semibold text-lg text-[#75472F] group-hover:text-[#C18B63] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#75472F]/75 mt-1 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#C18B63]/15 flex items-center justify-between">
                      <span className="text-[11px] text-[#C18B63] font-medium font-serif-luxury italic">
                        Haute Parlour Experience
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking(item.serviceId);
                        }}
                        className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#F9E1E5] hover:bg-[#C18B63] hover:text-white text-[#75472F] flex items-center gap-1 transition-colors"
                      >
                        <span>Book Service</span>
                        <ChevronRight className="w-3 h-3 text-[#C18B63]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: PRICING DIRECTORY */}
          <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                Haute Investment
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                Transparent Service Pricing
              </h2>
              <p className="text-xs sm:text-sm text-[#75472F]/80 font-serif-luxury italic">
                All appointments include customized skin and hair analysis, premium botanical serums, and complimentary parlour refreshments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_DATA.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[#FFF8F4]/90 rounded-2xl p-6 border border-[#C18B63]/30 shadow-md hover:border-[#C18B63] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-[#C18B63]/20">
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-[#75472F]">
                          {srv.title}
                        </h3>
                        <span className="text-[11px] text-[#C18B63] font-serif-luxury italic">
                          {srv.tagline}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-[#C18B63] font-mono">
                        {srv.priceFrom}
                      </span>
                    </div>

                    <div className="py-4 space-y-2.5">
                      {srv.items.map((item) => (
                        <div key={item.id} className="flex justify-between items-baseline text-xs">
                          <span className="text-[#75472F]/90 font-serif-luxury font-medium">
                            {item.name}
                          </span>
                          <span className="font-mono font-semibold text-[#C18B63] ml-2">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#C18B63]/15 flex items-center justify-between">
                    <span className="text-[10px] text-[#75472F]/60 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C18B63]" />
                      {srv.duration}
                    </span>
                    <button
                      onClick={() => handleOpenBooking(srv.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white text-xs font-medium transition-all shadow-sm"
                    >
                      Book Category
                    </button>
                  </div>
                </div>
              ))}

              {/* VIP Empress Package Card */}
              <div className="bg-gradient-to-br from-[#F9E1E5] via-[#FCECEF] to-[#E8AAB9]/40 rounded-2xl p-6 border-2 border-[#C18B63] shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#C18B63]/30">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#C18B63]">
                        Most Requested
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-[#75472F]">
                        The Royal Empress Package
                      </h3>
                    </div>
                    <span className="text-xl font-bold text-[#75472F] font-mono">
                      ₹24,999
                    </span>
                  </div>

                  <div className="py-4 space-y-2 text-xs text-[#75472F]/85">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>Complete Bridal Hair & 24h Waterproof Makeup</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>Pre-Wedding Hydration Glow Facial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>Moroccan Argan Restorative Hair Spa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>Full Sculpted Swarovski Gel Nail Extensions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>Private VIP Dressing Suite with Rosé & Macarons</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking('bridal-makeup', 'The Empress Grand Package')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white text-xs font-semibold shadow hover:opacity-95 transition-all text-center"
                >
                  Reserve Royal Empress
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 6: ABOUT US & SANCTUARY VALUES */}
          <section id="about" className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-[#FFF8F4]/80 rounded-3xl p-8 sm:p-12 border border-[#C18B63]/30 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5 text-left">
                <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                  About Our Sanctuary
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                  Crafting Beauty with Intention & Grace
                </h2>
                <p className="text-sm text-[#75472F]/85 leading-relaxed font-light">
                  Beauty Parlour was created to offer an oasis from the hurried world—a place wrapped in soft blush silk, gentle aromas of fresh roses, and the steady hands of seasoned artisans. Whether preparing for your walk down the aisle or indulging in a restorative Saturday facial, your beauty is our masterwork.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center">
                  <div className="p-3 bg-white/90 rounded-xl border border-[#C18B63]/20">
                    <span className="font-heading text-2xl font-bold text-[#C18B63] block">12+</span>
                    <span className="text-[10px] text-[#75472F]/70 font-semibold uppercase">Years Artistry</span>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl border border-[#C18B63]/20">
                    <span className="font-heading text-2xl font-bold text-[#C18B63] block">1,200+</span>
                    <span className="text-[10px] text-[#75472F]/70 font-semibold uppercase">Happy Brides</span>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl border border-[#C18B63]/20">
                    <span className="font-heading text-2xl font-bold text-[#C18B63] block">4.9★</span>
                    <span className="text-[10px] text-[#75472F]/70 font-semibold uppercase">Client Rating</span>
                  </div>
                  <div className="p-3 bg-white/90 rounded-xl border border-[#C18B63]/20">
                    <span className="font-heading text-2xl font-bold text-[#C18B63] block">100%</span>
                    <span className="text-[10px] text-[#75472F]/70 font-semibold uppercase">Sterilization</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => setIsAboutOpen(true)}
                    className="px-6 py-2.5 rounded-full bg-[#C18B63] hover:bg-[#a5704a] text-white text-xs font-medium transition-colors"
                  >
                    Read Our Philosophy
                  </button>
                  <a
                    href={`tel:${SALON_INFO.phone}`}
                    className="text-xs font-semibold text-[#75472F] hover:text-[#C18B63] underline"
                  >
                    Call Concierge Desk
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#C18B63]/30 aspect-[16/10] bg-[#F9E1E5] group">
                  <img
                    src="/assets/aistudio/image_5811c128.png"
                    alt="VIP Presidential Facial Sanctuary Suite"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#75472F]/70 via-transparent to-transparent flex items-end p-4 text-white">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-[#FFF8F4] tracking-widest block">VIP Suite</span>
                      <h4 className="font-heading text-sm font-semibold">Presidential Facial & Bridal Sanctuary</h4>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative rounded-xl overflow-hidden shadow border border-[#C18B63]/25 aspect-[4/3] bg-[#F9E1E5] group">
                    <img
                      src="/assets/aistudio/image_f3dc9f05.png"
                      alt="Luxe Botanical Pedicure Lounge"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5 text-white">
                      <span className="text-[11px] font-medium leading-tight">Pedicure Lounge</span>
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden shadow border border-[#C18B63]/25 aspect-[4/3] bg-[#F9E1E5] group">
                    <img
                      src="/assets/aistudio/image_3617284a.png"
                      alt="Hair Spa Wash Basin Suite"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5 text-white">
                      <span className="text-[11px] font-medium leading-tight">Hair Spa Wash Basin</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* SECTION 7: REVIEWS & TESTIMONIALS */}
          <section className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                Client Reflections
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-semibold text-[#75472F]">
                Words of Adornment
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SALON_INFO.reviews.map((rev, i) => (
                <div
                  key={i}
                  className="p-5 bg-white/80 rounded-2xl border border-[#C18B63]/20 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating)].map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#75472F]/80 italic font-serif-luxury leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#C18B63]/15">
                    <span className="font-semibold text-xs text-[#75472F] block">{rev.name}</span>
                    <span className="text-[10px] text-[#C18B63]">{rev.service}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: CONTACT, HOURS & APPOINTMENT FORM */}
          <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-gradient-to-r from-[#FFF8F4] via-[#FCECEF] to-[#FFF8F4] rounded-3xl border border-[#C18B63]/30 shadow-xl p-6 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Contact Information */}
                <div className="lg:col-span-5 space-y-6 text-left">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                      Visit & Contact
                    </span>
                    <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-[#75472F]">
                      Salon Sanctuary Concierge
                    </h2>
                    <p className="text-xs text-[#75472F]/80 font-serif-luxury italic mt-1">
                      Located in prime Beverly Hills. Complimentary valet parking for all reservation holders.
                    </p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-[#C18B63]/20">
                      <MapPin className="w-4 h-4 text-[#C18B63] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-[#75472F] block">Sanctuary Location:</strong>
                        <span className="text-[#75472F]/80">{SALON_INFO.address}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-[#C18B63]/20">
                      <Phone className="w-4 h-4 text-[#C18B63] mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-[#75472F] block">Direct Telephone:</strong>
                        <a href={`tel:${SALON_INFO.phone}`} className="text-[#C18B63] font-medium hover:underline">
                          {SALON_INFO.displayPhone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-[#C18B63]/20">
                      <MessageCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <strong className="text-[#75472F] block">Instant WhatsApp:</strong>
                        <button onClick={handleDirectWhatsApp} className="text-emerald-700 font-medium hover:underline">
                          Chat directly with concierge desk
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-[#C18B63]/20">
                      <Clock className="w-4 h-4 text-[#C18B63] mt-0.5 shrink-0" />
                      <div className="w-full">
                        <strong className="text-[#75472F] block mb-1">Opening Hours:</strong>
                        {SALON_INFO.hours.map((h, i) => (
                          <div key={i} className="flex justify-between text-[11px] text-[#75472F]/75 py-0.5">
                            <span>{h.days}</span>
                            <span className="font-mono font-medium">{h.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-3">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl bg-white border border-[#C18B63]/30 hover:border-[#C18B63] text-[#75472F] text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Instagram className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>{SALON_INFO.instagram}</span>
                    </a>
                    <button
                      onClick={handleShare}
                      className="px-4 py-2 rounded-xl bg-white border border-[#C18B63]/30 hover:border-[#C18B63] text-[#75472F] text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#C18B63]" />
                      <span>{copiedLink ? 'Link Copied!' : 'Share Salon'}</span>
                    </button>
                  </div>
                </div>

                {/* Direct Inline Appointment Reservation Card */}
                <div className="lg:col-span-7 bg-white/90 p-6 sm:p-8 rounded-2xl border border-[#C18B63]/30 shadow-md">
                  <div className="mb-5">
                    <span className="text-xs uppercase tracking-widest text-[#C18B63] font-display-serif font-semibold">
                      Online Reservation
                    </span>
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-[#75472F]">
                      Book Your Beauty Session
                    </h3>
                    <p className="text-xs text-[#75472F]/70 font-serif-luxury italic">
                      Pick your desired service to open our full reservation calendar and WhatsApp sync.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        onClick={() => handleOpenBooking(srv.id)}
                        className="p-3 rounded-xl border border-[#C18B63]/25 hover:border-[#C18B63] hover:bg-[#F9E1E5]/60 transition-all text-left flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className="w-10 h-10 rounded-full object-cover border border-[#C18B63]/40"
                          />
                          <div>
                            <span className="font-serif-luxury font-semibold text-xs text-[#75472F] group-hover:text-[#C18B63] block">
                              {srv.title}
                            </span>
                            <span className="text-[10px] text-[#C18B63]">{srv.priceFrom}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#C18B63] group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-[#C18B63]/15">
                    <button
                      onClick={() => handleOpenBooking()}
                      className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#C18B63] to-[#75472F] hover:opacity-95 text-white text-xs font-semibold shadow flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      Open Full Booking Calendar
                    </button>
                    <button
                      onClick={handleDirectWhatsApp}
                      className="py-3 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Quick WhatsApp Booking
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      )}

      {/* 3. FOOTER */}
      <footer className="bg-[#FFF8F4]/90 border-t border-[#C18B63]/25 py-8 px-4 text-center text-xs text-[#75472F]/80 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-script text-3xl text-[#75472F]">Beauty</span>
            <span className="font-display-serif text-xs tracking-widest font-semibold text-[#75472F]">
              PARLOUR
            </span>
            <span className="text-[#75472F]/40">·</span>
            <span className="text-xs text-[#75472F]/70 font-serif-luxury italic">
              Haute Esthétique & Luxury Salon
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-[#75472F]/75">
            <a href="#home" className="hover:text-[#C18B63] transition-colors">Home</a>
            <a href="#services" className="hover:text-[#C18B63] transition-colors">Services</a>
            <a href="#cosmetics" className="hover:text-[#C18B63] transition-colors">Cosmetics</a>
            <a href="#gallery" className="hover:text-[#C18B63] transition-colors">Gallery</a>
            <a href="#pricing" className="hover:text-[#C18B63] transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-[#C18B63] transition-colors">Contact</a>
            <button onClick={() => setViewMode(viewMode === 'website' ? 'poster' : 'website')} className="text-[#C18B63] font-medium hover:underline">
              {viewMode === 'website' ? 'Original Poster Blueprint' : 'Full Website'}
            </button>
          </div>

          <div className="text-[11px] text-[#75472F]/60">
            © {new Date().getFullYear()} Beauty Parlour. All rights reserved.
          </div>
        </div>
      </footer>

      {/* 4. MODALS */}
      {/* Photo Lightbox Modal */}
      {selectedImageModal && (
        <div
          onClick={() => setSelectedImageModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-[#FFF8F4] text-[#75472F] rounded-2xl shadow-2xl border border-[#C18B63]/40 overflow-hidden my-auto"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-black overflow-hidden">
              <img
                src={selectedImageModal.image}
                alt={selectedImageModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImageModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[11px] font-semibold text-[#75472F] uppercase tracking-wider border border-[#C18B63]/30 shadow">
                {selectedImageModal.tag}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#C18B63] font-display-serif">
                    Haute Parlour Portfolio
                  </span>
                  <h3 className="font-heading text-2xl font-semibold text-[#75472F]">
                    {selectedImageModal.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenBooking(selectedImageModal.serviceId)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C18B63] to-[#75472F] text-white text-xs font-semibold shadow hover:opacity-95 transition-all flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book This Treatment</span>
                  </button>
                  <button
                    onClick={handleDirectWhatsApp}
                    className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs transition-colors"
                    title="Inquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-[#75472F]/85 font-light leading-relaxed">
                {selectedImageModal.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(serviceId, subTreatment) => handleOpenBooking(serviceId, subTreatment)}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialServiceId={bookingServiceId}
        initialSubServiceName={bookingSubTreatment}
      />

      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectService={(serviceId, subTreatment) => handleOpenBooking(serviceId, subTreatment)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      <CosmeticsModal
        isOpen={isCosmeticsOpen}
        onClose={() => setIsCosmeticsOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
