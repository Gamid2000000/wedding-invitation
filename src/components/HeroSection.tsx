import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { WatercolorHeart } from './Decorations';
import { Heart, Sparkles, Calendar, ChevronDown, Camera } from 'lucide-react';
import { useScrollPosition, useMouseParallax } from '../hooks/useParallax';

interface HeroSectionProps {
  onRsvpClick: () => void;
  onHeartSpawn?: (x: number, y: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRsvpClick, onHeartSpawn }) => {
  const [heroPhoto, setHeroPhoto] = useState(`${import.meta.env.BASE_URL}images/nazim-and-yulduz.jpg`);
  const scrollY = useScrollPosition();
  const mouseOffset = useMouseParallax(16);

  // Load custom photo if saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nazim_yulduz_hero_photo');
      if (stored) {
        setHeroPhoto(stored);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setHeroPhoto(base64);
        try {
          localStorage.setItem('nazim_yulduz_hero_photo', base64);
        } catch (err) {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleHeroClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onHeartSpawn) {
      onHeartSpawn(e.clientX, e.clientY);
    }
  };

  return (
    <section 
      onClick={handleHeroClick}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-between pt-12 pb-8 px-4 text-center overflow-hidden bg-gradient-to-b from-[#251d1f] via-[#2c2225] to-[#1c1719]"
    >
      {/* Decorative Parallax Background Glows & Hearts */}
      <div 
        className="absolute top-1/4 left-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] bg-[#82131d]/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate(-50%, calc(-50% + ${scrollY * 0.25}px))`,
        }}
      />

      <div 
        className="absolute top-10 left-6 opacity-35 pointer-events-none hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * -0.6}px, ${scrollY * -0.18 + mouseOffset.y * -0.6}px)`,
        }}
      >
        <WatercolorHeart size={74} rotation={-15} />
      </div>

      <div 
        className="absolute top-24 right-8 opacity-35 pointer-events-none hidden sm:block transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${mouseOffset.x * 0.7}px, ${scrollY * -0.25 + mouseOffset.y * 0.7}px)`,
        }}
      >
        <WatercolorHeart size={92} rotation={22} />
      </div>

      {/* Hero Photo stretched across the main page as requested */}
      <div 
        className="relative z-10 w-full max-w-xl sm:max-w-2xl px-0 sm:px-4 transition-transform duration-300 ease-out my-auto"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <div className="relative w-full rounded-none sm:rounded-3xl overflow-hidden shadow-2xl border-y sm:border border-white/10 group bg-[#231a1c]">
          <div className="relative w-full aspect-[2/3] max-h-[80vh] overflow-hidden flex items-center justify-center">
            <img
              src={heroPhoto}
              alt="Назим и Юлдуз"
              onError={() => setHeroPhoto(`${import.meta.env.BASE_URL}images/childhood-couple.jpg`)}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Only the clean photo of Nazim and Yulduz - text overlay removed as requested */}

            {/* Instant photo replace button */}
            <label
              title="Загрузить фото Назима и Юлдуз"
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md cursor-pointer border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg z-20"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleCustomPhotoUpload}
                className="hidden"
              />
              <Camera className="w-4 h-4" />
            </label>
          </div>
        </div>

        {/* Small subtle hint */}
        <p className="mt-3 text-[11px] text-stone-400/80 font-light tracking-wide flex items-center justify-center gap-1.5 px-4">
          <Sparkles className="w-3 h-3 text-amber-400/80" />
          <span>Нажмите в любом месте экрана для романтического эффекта</span>
        </p>
      </div>

      {/* Hero Bottom Actions */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-4 px-4">
        <button
          onClick={onRsvpClick}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8f1d28] via-[#a82532] to-[#8f1d28] hover:from-[#a82532] hover:to-[#bd2c3a] text-white text-xs tracking-wider uppercase font-medium shadow-lg shadow-[#8f1d28]/35 border border-rose-300/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>Подтвердить присутствие</span>
        </button>

        <a
          href="#calendar-section"
          className="text-xs tracking-wider uppercase text-stone-300 hover:text-white px-5 py-2.5 rounded-full border border-white/10 hover:border-white/30 backdrop-blur-sm transition-colors flex items-center gap-1.5"
        >
          <span>Детали свадьбы</span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
