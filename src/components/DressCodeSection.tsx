import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { useScrollPosition } from '../hooks/useParallax';

export const DressCodeSection: React.FC = () => {
  const [shrekPhoto, setShrekPhoto] = useState('/images/shrek.jpg');
  const scrollY = useScrollPosition();

  // Load custom photo if saved in localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shrek_dresscode_photo');
      if (stored) {
        setShrekPhoto(stored);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setShrekPhoto(base64);
        try {
          localStorage.setItem('shrek_dresscode_photo', base64);
        } catch (err) {
          // ignore
        }
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-[#20181a] text-stone-200 overflow-hidden">
      {/* Background Heart Wallpaper pattern matching screenshot with subtle scroll parallax */}
      <div 
        className="absolute inset-0 opacity-12 pointer-events-none select-none overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(${(scrollY - 1500) * 0.08}px)`,
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern id="heartPattern" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M 50,32 C 45,16 28,12 17,24 C 5,37 8,56 22,69 C 32,78 43,87 50,92 C 57,87 68,78 78,69 C 92,56 95,37 83,24 C 72,12 55,16 50,32 Z"
                fill="#b82635"
                transform="scale(0.55)"
              />
              <path
                d="M 120,32 C 115,16 98,12 87,24 C 75,37 78,56 92,69 C 102,78 113,87 120,92 C 127,87 138,78 148,69 C 162,56 165,37 153,24 C 142,12 125,16 120,32 Z"
                fill="#941d2a"
                transform="translate(40, 45) scale(0.4)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heartPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-6">
        {/* Section Heading */}
        <div className="text-center space-y-2">
          <h2 className="font-bold text-2xl sm:text-4xl text-[#f7ece2] tracking-wider uppercase">
            Дресс-код
          </h2>
          <p className="text-xs sm:text-sm text-[#f0b49e] font-medium tracking-wide">
            Если не знаете, что надеть, вот вам идеи
          </p>
        </div>

        {/* The Exact Shrek Photo Card matching user screenshot */}
        <div className="relative rounded-2xl bg-white p-3 sm:p-4 shadow-2xl border-4 border-[#2b2225] group overflow-hidden">
          <div className="relative overflow-hidden rounded-xl bg-white aspect-[3/4] flex items-center justify-center">
            <img
              src={shrekPhoto}
              alt="Идеи для нарядов гостей"
              onError={() => {
                if (shrekPhoto !== '/images/shrek.jpg') {
                  setShrekPhoto('/images/shrek.jpg');
                }
              }}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-102"
            />

            {/* Quick upload button to replace or load the image directly */}
            <label
              title="Загрузить или заменить фото"
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md cursor-pointer border border-white/20 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <Camera className="w-4 h-4" />
            </label>
          </div>
        </div>

        {/* Polite note about dress code */}
        <div className="rounded-2xl bg-[#2b2225]/80 border border-white/5 p-4 text-center shadow-lg">
          <p className="text-xs text-stone-300 font-light leading-relaxed">
            * Девушек просим воздержаться от белых и пышных подвенечных нарядов — оставьте этот образ невесте ❤️
          </p>
        </div>
      </div>
    </section>
  );
};
