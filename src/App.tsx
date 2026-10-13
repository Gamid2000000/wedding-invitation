import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { InvitationMessage } from './components/InvitationMessage';
import { CalendarSection } from './components/CalendarSection';
import { TimelineSection } from './components/TimelineSection';
import { LocationSection } from './components/LocationSection';
import { CountdownSection } from './components/CountdownSection';
import { DetailsFaqSection } from './components/DetailsFaqSection';
import { RomanticAudioPlayer } from './components/RomanticAudioPlayer';
import { RsvpModal } from './components/RsvpModal';
import { OrganizerModal } from './components/OrganizerModal';
import { FloatingHeartsOverlay, FloatingHeartItem } from './components/FloatingHearts';
import { WeddingEnvelope } from './components/WeddingEnvelope';
import { WEDDING_DATA } from './data/weddingData';
import { Heart, Share2, ArrowUp, ShieldCheck, Check, Mail } from 'lucide-react';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [isOrganizerOpen, setIsOrganizerOpen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeartItem[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [viewMode, setViewMode] = useState<'responsive' | 'mobile-mockup'>('responsive');

  // Spawn heart at mouse or touch coordinate
  const spawnHeart = (x: number, y: number) => {
    const heartColors = ['#d93845', '#b52331', '#f43f5e', '#fb7185', '#e11d48'];
    const newHeart: FloatingHeartItem = {
      id: Date.now() + Math.random(),
      x: x - 12,
      y: y - 12,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      size: Math.floor(Math.random() * 16) + 20,
      rotation: Math.floor(Math.random() * 50) - 25,
    };

    setFloatingHearts((prev) => [...prev.slice(-18), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2800);
  };

  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only spawn if not clicking an interactive button or input
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'BUTTON' ||
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.closest('button') ||
      target.closest('a')
    ) {
      return;
    }
    spawnHeart(e.clientX, e.clientY);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Свадьба Назима и Юлдуз — 12 декабря 2026`,
        text: `Приглашаем Вас на свадьбу Назима и Юлдуз!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      onClick={handleGlobalClick}
      className={`min-h-screen bg-[#1c1819] text-[#f7f2ee] selection:bg-[#991b28] selection:text-white transition-all ${
        viewMode === 'mobile-mockup' ? 'py-6 px-2 sm:px-6 bg-[#120f10] flex flex-col items-center' : ''
      }`}
    >
      {/* Floating Interactive Hearts Overlay */}
      <FloatingHeartsOverlay hearts={floatingHearts} />

      {/* Interactive 3D Wedding Envelope Intro Curtain */}
      <WeddingEnvelope
        isOpen={isEnvelopeOpen}
        onOpenComplete={() => setIsEnvelopeOpen(true)}
      />

      {/* Floating Audio Player */}
      <RomanticAudioPlayer />

      {/* Top Fixed Floating Navigation Pill (Visible only after envelope is open) */}
      <header
        className={`fixed top-3 inset-x-0 z-40 flex items-center justify-center px-4 transition-all duration-700 ease-out ${
          isEnvelopeOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-6 pointer-events-none'
        }`}
      >
        <nav className="flex items-center gap-1.5 sm:gap-2.5 py-1.5 px-3 sm:px-4 rounded-full bg-[#2a2225]/85 border border-white/10 backdrop-blur-md shadow-xl text-xs">
          <span className="font-semibold text-xs sm:text-sm text-[#f3e7dc] uppercase tracking-wider pr-1">
            {WEDDING_DATA.coupleTitle}
          </span>
          <span className="h-3 w-px bg-white/20 hidden sm:inline" />

          <button
            onClick={() => setIsRsvpOpen(true)}
            className="px-3 sm:px-3.5 py-1 rounded-full bg-[#82131d] hover:bg-[#9c1825] text-white text-[10px] sm:text-xs tracking-wider uppercase font-medium transition-all duration-200 flex items-center gap-1.5 shadow-sm"
          >
            <Heart className="w-3 h-3 fill-white" />
            <span className="hidden sm:inline">RSVP /</span>
            <span>Ответить</span>
          </button>
          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-white/10 text-stone-300 transition-colors"
            title="Поделиться приглашением"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
        </nav>
      </header>

      {/* Content wrapper: hidden completely until envelope opens, then smoothly reveals */}
      <main
        className={`w-full transition-all duration-700 ease-out ${
          !isEnvelopeOpen
            ? 'opacity-0 pointer-events-none translate-y-10 scale-[0.98]'
            : 'opacity-100 pointer-events-auto translate-y-0 scale-100'
        } ${
          viewMode === 'mobile-mockup'
            ? 'max-w-[430px] rounded-[42px] border-[8px] border-[#2c2225] shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden my-auto'
            : 'max-w-2xl mx-auto shadow-2xl sm:border-x sm:border-white/5'
        }`}
      >
        {/* Section 1: Hero */}
        <HeroSection
          onRsvpClick={() => setIsRsvpOpen(true)}
          onHeartSpawn={spawnHeart}
        />

        {/* Section 2: Invitation Text */}
        <InvitationMessage />

        {/* Section 3: Calendar & Add to Calendar */}
        <CalendarSection />

        {/* Section 4: Timeline / Schedule */}
        <TimelineSection />

        {/* Section 5: Locations & Maps */}
        <LocationSection />

        {/* Section 6: Live Countdown Timer & RSVP Trigger */}
        <CountdownSection onOpenRsvp={() => setIsRsvpOpen(true)} />

        {/* Section 8: Useful Details & FAQ */}
        <DetailsFaqSection />

        {/* Footer */}
        <footer className="py-12 px-6 text-center bg-[#181315] border-t border-white/5 space-y-6">
          <div className="space-y-1">
            <h4 className="font-semibold text-xl sm:text-2xl text-[#f3e7dc] uppercase tracking-wider">
              {WEDDING_DATA.coupleTitle}
            </h4>
            <p className="text-xs text-stone-400 tracking-widest uppercase font-light">
              12 декабря 2026 г. · С любовью
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-stone-400">
            <button
              onClick={() => {
                setIsEnvelopeOpen(false);
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="hover:text-[#f5d79e] transition-colors flex items-center gap-1.5 text-stone-300 font-medium"
              title="Открыть конверт снова"
            >
              <Mail className="w-3.5 h-3.5 text-[#f5d79e]" />
              <span>Открыть конверт снова</span>
            </button>
            <span className="opacity-40">·</span>
            <button
              onClick={handleShare}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Поделиться</span>
            </button>
            <span className="opacity-40">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Наверх</span>
            </button>
            <span className="opacity-40">·</span>
            <button
              onClick={() => setIsOrganizerOpen(true)}
              className="hover:text-rose-300 transition-colors flex items-center gap-1.5 text-stone-500 hover:text-stone-300"
              title="Панель молодоженов"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Организатору</span>
            </button>
          </div>



          {/* Device mockup toggle (for convenient review) */}
          <div className="pt-1">
            <button
              onClick={() => setViewMode(viewMode === 'responsive' ? 'mobile-mockup' : 'responsive')}
              className="text-[11px] text-stone-500 hover:text-stone-300 px-3 py-1 rounded-full border border-white/5 hover:border-white/10 transition-colors"
            >
              {viewMode === 'responsive' ? '📱 Включить вид «как в телефоне»' : '🖥️ Полноэкранный вид'}
            </button>
          </div>
        </footer>
      </main>

      {/* RSVP Modal Dialog */}
      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />

      {/* Organizer Guesthead Dashboard Modal */}
      <OrganizerModal isOpen={isOrganizerOpen} onClose={() => setIsOrganizerOpen(false)} />
    </div>
  );
}
