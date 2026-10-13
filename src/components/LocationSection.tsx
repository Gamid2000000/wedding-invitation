import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { MapPin, ExternalLink, Copy, Check, Navigation, Sparkles } from 'lucide-react';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeVenue, setActiveVenue] = useState<'ceremony' | 'banquet'>('ceremony');

  const venue =
    activeVenue === 'ceremony'
      ? WEDDING_DATA.venues.ceremony
      : WEDDING_DATA.venues.banquet;

  const venuePhoto =
    activeVenue === 'ceremony'
      ? `${import.meta.env.BASE_URL}images/hall-al-aziza.jpg`
      : `${import.meta.env.BASE_URL}images/restaurant-gornaya-dolina.jpg`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${venue.name}, ${venue.address}, ${WEDDING_DATA.city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-[#231b1e] text-stone-200 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#681822]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-stone-400 uppercase font-medium">
            ЛОКАЦИЯ
          </p>
          <h2 className="font-semibold text-2xl sm:text-3xl text-[#f5ebe3] tracking-wide uppercase">
            Место встречи
          </h2>
          <p className="text-base sm:text-lg text-[#e8b5a0] tracking-wide font-medium">
            {venue.name}
          </p>
        </div>

        {/* Tab switcher for both venues - swapped order */}
        <div className="flex justify-center p-1 bg-[#1a1416] rounded-full max-w-sm mx-auto border border-white/10">
          <button
            onClick={() => setActiveVenue('ceremony')}
            className={`flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeVenue === 'ceremony'
                ? 'bg-[#82131d] text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Зал «Аль Азиза»
          </button>
          <button
            onClick={() => setActiveVenue('banquet')}
            className={`flex-1 py-2 px-4 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
              activeVenue === 'banquet'
                ? 'bg-[#82131d] text-white shadow-md'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Ресторан «Горная Долина»
          </button>
        </div>

        {/* Real Venue Photography */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
          <div className="relative h-60 sm:h-72 w-full bg-[#1e2621]">
            <img
              src={venuePhoto}
              alt={venue.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-104"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
              <span className="font-medium tracking-wide flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                {activeVenue === 'banquet' ? 'Праздничный банкет' : 'Торжественный сбор'}
              </span>
              <span className="text-amber-200 font-semibold">{venue.time}</span>
            </div>
          </div>
        </div>

        {/* Map preview */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-xl bg-[#e5e3df]">
          <div className="relative h-48 sm:h-52 w-full overflow-hidden">
            <svg viewBox="0 0 600 300" className="w-full h-full object-cover">
              <rect width="600" height="300" fill="#f4f3f0" />
              <path
                d="M 0,220 C 120,200 240,160 380,210 C 480,240 550,230 600,250 L 600,300 L 0,300 Z"
                fill="#cde2f8"
              />
              <g stroke="#ffffff" strokeWidth="16" strokeLinecap="round">
                <line x1="0" y1="140" x2="600" y2="80" />
                <line x1="200" y1="300" x2="350" y2="0" />
                <line x1="450" y1="300" x2="520" y2="0" />
                <line x1="0" y1="60" x2="400" y2="180" />
              </g>
              <g stroke="#e2d8cd" strokeWidth="12" strokeLinecap="round">
                <line x1="0" y1="140" x2="600" y2="80" />
                <line x1="200" y1="300" x2="350" y2="0" />
                <line x1="450" y1="300" x2="520" y2="0" />
              </g>
              <text x="360" y="70" fill="#71717a" fontSize="12" fontWeight="500" transform="rotate(-14 360 70)">
                {activeVenue === 'ceremony' ? 'ул. Ахмет-Хана Султана' : 'ул. Булача'}
              </text>
              <text x="320" y="160" fill="#71717a" fontSize="12" fontWeight="500">
                пр. Имама Шамиля
              </text>
              <text x="60" y="180" fill="#94a3b8" fontSize="11">
                Каспийское шоссе
              </text>

              <g transform="translate(300, 110)">
                <ellipse cx="0" cy="18" rx="14" ry="5" fill="rgba(0,0,0,0.25)" />
                <path
                  d="M 0,-34 C -16,-34 -24,-20 -24,-6 C -24,12 0,22 0,22 C 0,22 24,12 24,-6 C 24,-20 16,-34 0,-34 Z"
                  fill="#dc2626"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="-14" r="8" fill="#ffffff" />
                <circle cx="0" cy="-14" r="4.5" fill="#dc2626" />
              </g>
            </svg>

            <div className="absolute top-3 left-3 bg-white/95 text-stone-800 px-3 py-1 rounded-md text-xs font-semibold shadow-md flex items-center gap-1">
              <span>Карты</span>
              <ExternalLink className="w-3 h-3 text-stone-500" />
            </div>

            <div className="absolute bottom-2 left-3 text-[10px] text-stone-600 bg-white/80 px-2 py-0.5 rounded backdrop-blur-sm">
              {venue.name} · {venue.address}
            </div>
          </div>
        </div>

        {/* Burgundy Card matching user screenshot: "Место на карте / Ресторан «Горная Долина»" */}
        <div className="rounded-2xl bg-gradient-to-b from-[#8f1d28] to-[#6e141d] p-5 sm:p-6 text-white space-y-4 shadow-2xl border border-rose-400/30">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-rose-200 text-xs font-light tracking-wider">
                <MapPin className="w-4 h-4 text-rose-300" />
                <span className="text-xs sm:text-sm text-rose-200 tracking-wider uppercase font-medium">Место на карте</span>
              </div>
              <h3 className="font-semibold text-xl sm:text-2xl tracking-wide uppercase">
                {venue.name}
              </h3>
              <p className="text-xs sm:text-sm text-rose-100/90 font-light">
                {venue.address}, {WEDDING_DATA.city}
              </p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-1 text-xs"
              title="Скопировать адрес"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-[11px] text-emerald-200">Скопировано!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-stone-200" />
                  <span className="text-[11px] text-stone-200">Копировать</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-rose-100/80 leading-relaxed font-light">
            {venue.description}
          </p>

          {/* Action Buttons matching screenshot */}
          <div className="space-y-2.5 pt-1">
            <a
              href={venue.googleMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-black/90 hover:bg-black text-white text-xs tracking-wider uppercase font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
            >
              <span>ОТКРЫТЬ КАРТУ</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-[#c24141] hover:bg-[#d64e4e] text-white text-xs tracking-wider uppercase font-semibold border border-white/25 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01]"
            >
              <span>ЯНДЕКС КАРТЫ</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
