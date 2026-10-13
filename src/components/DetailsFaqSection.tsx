import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { Gift, Baby, ChevronDown } from 'lucide-react';

export const DetailsFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      icon: Gift,
      title: 'Подарки',
      content:
        'Главный подарок для нас — ваше присутствие и тёплые улыбки! А если вы хотите порадовать нас материально, мы будем очень благодарны за поздравления в конвертах, которые помогут нам воплотить мечты нашей молодой семьи.',
    },
    {
      icon: Baby,
      title: 'Дети на свадьбе',
      content:
        'Мы очень любим ваших малышей! Они обязательно станут частью нашего радостного праздника. В банкетном зале предусмотрено комфортное пространство для отдыха.',
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-[#231b1d] text-stone-200">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-stone-400 uppercase font-medium">
            ПОЛЕЗНО ЗНАТЬ
          </p>
          <h2 className="font-semibold text-2xl sm:text-3xl text-[#f7ece2] tracking-wide uppercase">
            Важные детали
          </h2>
          <div className="w-16 h-0.5 bg-[#8b1e2a] mx-auto rounded-full mt-2" />
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const Icon = item.icon;
            const isOpen = openIndex === index;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-[#2a2225] border border-white/5 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#82131d]/20 text-rose-300 border border-[#82131d]/40 group-hover:bg-[#82131d]/30 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-semibold text-sm sm:text-base text-stone-200 group-hover:text-white transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-rose-300' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-300/90 leading-relaxed font-light border-t border-white/5">
                    {item.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
