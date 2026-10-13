import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Heart, Sparkles, Send } from 'lucide-react';
import { useScrollPosition } from '../hooks/useParallax';

interface CountdownSectionProps {
  onOpenRsvp: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ onOpenRsvp }) => {
  const scrollY = useScrollPosition();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(WEDDING_DATA.weddingDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'ДНЕЙ', value: timeLeft.days },
    { label: 'ЧАСОВ', value: timeLeft.hours },
    { label: 'МИНУТ', value: timeLeft.minutes },
    { label: 'СЕКУНД', value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-[#1e1719] text-stone-200 overflow-hidden text-center">
      {/* Background Painted Heart Wallpaper matching screenshot with parallax */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${(scrollY - 2000) * 0.1}px)`,
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="countdownHearts" width="120" height="120" patternUnits="userSpaceOnUse">
              <path
                d="M 50,30 C 45,15 28,12 17,24 C 5,37 8,56 22,69 C 32,78 43,87 50,92 C 57,87 68,78 78,69 C 92,56 95,37 83,24 C 72,12 55,15 50,30 Z"
                fill="#ba2636"
                transform="scale(0.55)"
              />
              <path
                d="M 110,40 C 105,25 90,22 80,32 C 70,43 72,60 85,71 C 94,80 103,87 110,92 C 117,87 126,80 135,71 C 148,60 150,43 140,32 C 130,22 115,25 110,40 Z"
                fill="#941825"
                transform="translate(45, 45) scale(0.4)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#countdownHearts)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-10">
        {/* Title */}
        <div className="space-y-2">
          <h2 className="font-semibold text-2xl sm:text-3xl text-[#f7ece2] tracking-wide uppercase">
            До нашей свадьбы
          </h2>
          <p className="text-[10px] sm:text-xs tracking-[0.25em] text-[#e0a896] uppercase font-medium">
            ОСТАЛОСЬ
          </p>
        </div>

        {/* 4 Countdown Boxes */}
        <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
          {timeBlocks.map((block) => (
            <div
              key={block.label}
              className="flex flex-col items-center justify-center p-3 sm:p-5 rounded-2xl bg-[#2b2225]/90 border border-white/10 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-rose-400/40 hover:-translate-y-1 group"
            >
              <span className="countdown-digit text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight group-hover:scale-105 transition-transform duration-200">
                {String(block.value).padStart(2, '0')}
              </span>
              <span className="mt-1.5 sm:mt-2 countdown-label text-[9px] sm:text-[11px] text-stone-300/90 tracking-widest uppercase">
                {block.label}
              </span>
            </div>
          ))}
        </div>

        {/* RSVP Call-to-action Section matching user screenshot */}
        <div className="pt-8 sm:pt-10 border-t border-white/10 space-y-4">
          <h3 className="font-semibold text-xl sm:text-2xl text-[#f5ebe3] tracking-wide uppercase">
            Вы будете с нами?
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-light max-w-md mx-auto leading-relaxed">
            Пожалуйста, сообщите, сможете ли вы быть с нами в этот день. Это
            поможет нам организовать праздник наилучшим образом.
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenRsvp}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#82131d] via-[#a3222f] to-[#82131d] hover:from-[#9c1825] hover:to-[#bd2b3b] text-white text-xs sm:text-sm tracking-wider uppercase font-medium shadow-xl shadow-[#82131d]/30 border border-rose-300/30 transition-all duration-300 hover:scale-105 active:scale-95 inline-flex items-center gap-2.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Ответить как гость</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
