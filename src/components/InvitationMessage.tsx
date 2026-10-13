import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { WatercolorHeart, PineBranchBorder } from './Decorations';
import { useScrollPosition } from '../hooks/useParallax';

export const InvitationMessage: React.FC = () => {
  const scrollY = useScrollPosition();

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-[#231e20] text-center overflow-hidden">
      {/* Pine branch decorative border top with subtle parallax */}
      <PineBranchBorder 
        position="top" 
        className="absolute top-0 inset-x-0 transition-transform duration-300 ease-out" 
      />

      {/* Parallax decorative watercolor hearts */}
      <div 
        className="absolute top-8 left-4 sm:left-12 opacity-40 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${(scrollY - 400) * 0.12}px) rotate(-20deg)`,
        }}
      >
        <WatercolorHeart size={64} rotation={-20} />
      </div>

      <div 
        className="absolute bottom-10 right-4 sm:right-12 opacity-35 pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${(scrollY - 400) * -0.15}px) rotate(25deg)`,
        }}
      >
        <WatercolorHeart size={74} rotation={25} />
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-6 sm:space-y-8">
        <div className="inline-flex items-center justify-center space-x-2 text-[#c93f4e]">
          <span className="h-px w-8 bg-[#c93f4e]/40" />
          <WatercolorHeart size={26} rotation={0} />
          <span className="h-px w-8 bg-[#c93f4e]/40" />
        </div>

        {/* Header with handwritten script font requested by user */}
        <div className="space-y-2">
          <h2 className="font-script text-4xl sm:text-6xl md:text-7xl text-[#f5ebe3] font-normal leading-tight drop-shadow-sm select-none">
            Дорогие и близкие!
          </h2>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-3 opacity-60">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#8b1e2a]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1e2a]" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#8b1e2a]" />
        </div>

        {/* Warm invitation body in Times New Roman */}
        <div className="space-y-5 px-2">
          <p className="text-base sm:text-lg md:text-xl text-stone-200/95 leading-relaxed font-normal tracking-normal px-2">
            Приглашаем Вас на торжество, <br className="hidden sm:inline" />
            посвященное нашему бракосочетанию. <br />
            <span className="text-[#e2b7a0] font-normal italic">
              Мы будем рады, если вы проведете этот день с нами!
            </span>
          </p>

          <div className="pt-2">
            <p className="text-[11px] sm:text-xs text-stone-400 tracking-widest uppercase font-light">
              12.12.2026 · Махачкала
            </p>
          </div>
        </div>
      </div>

      <PineBranchBorder position="bottom" className="absolute bottom-0 inset-x-0" />
    </section>
  );
};
