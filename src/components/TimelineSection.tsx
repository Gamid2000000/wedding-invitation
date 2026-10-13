import React from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { MapPin, Navigation, Clock } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const events = [
    {
      time: '13:00',
      title: 'СБОР ГОСТЕЙ В ЗАЛЕ НЕВЕСТЫ «АЛЬ АЗИЗА»',
      address: 'по адресу: Ахмет-Хана Султана 17а',
      description:
        'Встречаемся, обнимаемся, едим и обсуждаем за столом весь мир. Фотографируемся на память.',
      badge: 'Зал невесты',
      yandexMap: WEDDING_DATA.venues.ceremony.mapUrl,
      image: (
        <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[#241a1c] border border-amber-900/40 group shadow-md">
          <img
            src="/images/hall-al-aziza.jpg"
            alt="Зал «Аль Азиза»"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <div className="absolute top-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-medium text-amber-200 border border-amber-500/30">
            «Аль Азиза»
          </div>
        </div>
      ),
    },
    {
      time: '15:30',
      title: 'ТОРЖЕСТВЕННАЯ РЕГИСТРАЦИЯ И СВАДЕБНЫЙ КОРТЕЖ',
      address: 'Праздничный выезд и встреча молодых',
      description:
        'Самый волнительный и трогательный момент нашего дня — соединение судеб, клятвы и первые поздравления.',
      badge: 'Кульминация',
      yandexMap: null,
      image: null,
    },
    {
      time: '16:00',
      title: 'ТОРЖЕСТВЕННЫЙ БАНКЕТ В РЕСТОРАНЕ «ГОРНАЯ ДОЛИНА»',
      address: 'по адресу: ул. Булача / пр. Имама Шамиля',
      description:
        'Праздничный ужин, национальные и любимые танцы, тосты, свадебный торт и незабываемый вечер в кругу близких людей!',
      badge: 'Главный банкет',
      yandexMap: WEDDING_DATA.venues.banquet.mapUrl,
      image: (
        <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-[#1c2420] border border-emerald-950/40 group shadow-md">
          <img
            src="/images/restaurant-gornaya-dolina.jpg"
            alt="Ресторан «Горная Долина»"
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />
          <div className="absolute top-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-md rounded-md text-[11px] font-medium text-emerald-200 border border-emerald-500/30">
            «Горная Долина»
          </div>
        </div>
      ),
    },
    {
      time: '22:30',
      title: 'САЛЮТ, БЕНГАЛЬСКИЕ ОГНИ И ЗАВЕРШЕНИЕ ВЕЧЕРА',
      address: 'Площадка ресторана',
      description:
        'Искрящиеся бенгальские огни, теплые объятия, слова благодарности всем гостям и красивый праздничный финал.',
      badge: 'Финал',
      yandexMap: null,
      image: null,
    },
  ];

  return (
    <section className="relative py-16 sm:py-24 px-4 bg-[#211b1d] text-stone-200">
      <div className="max-w-2xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-stone-400 uppercase font-medium">
            ТАЙМЛАЙН
          </p>
          <h2 className="font-semibold text-2xl sm:text-3xl text-[#f5ebe3] tracking-wide uppercase">
            Программа дня
          </h2>
          <div className="w-16 h-0.5 bg-[#8b1e2a] mx-auto rounded-full mt-2" />
        </div>

        {/* Vertical Timeline container */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-[#542129] space-y-10 sm:space-y-12">
          {events.map((evt, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline Bullet Node */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#82131d] border-4 border-[#211b1d] group-hover:scale-125 transition-transform" />

              {/* Event Content Card */}
              <div className="bg-[#2a2225] border border-white/5 hover:border-white/15 rounded-2xl p-4 sm:p-6 transition-all duration-300 space-y-3 shadow-xl">
                {/* Time & Badge */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#82131d]/20 border border-[#82131d]/50 text-rose-300 font-semibold text-xs tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{evt.time}</span>
                  </div>
                  <span className="text-[10px] font-medium text-stone-400 uppercase tracking-widest">
                    {evt.badge}
                  </span>
                </div>

                {/* Event Photo preview */}
                {evt.image && <div className="pt-1">{evt.image}</div>}

                {/* Event Title */}
                <h3 className="font-semibold text-base sm:text-lg text-[#f3e7dc] leading-snug tracking-wide uppercase">
                  {evt.title}
                </h3>

                {/* Address */}
                <div className="flex items-start gap-2 text-xs sm:text-sm text-amber-200/90 font-light">
                  <MapPin className="w-4 h-4 text-[#c44955] shrink-0 mt-0.5" />
                  <span>{evt.address}</span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-300/90 leading-relaxed font-light">
                  {evt.description}
                </p>

                {/* Action button if venue map available */}
                {evt.yandexMap && (
                  <div className="pt-1">
                    <a
                      href={evt.yandexMap}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-[#d87c88] hover:text-white transition-colors font-medium hover:underline"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Маршрут в Яндекс Карты ↗</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
