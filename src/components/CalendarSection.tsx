import React, { useState } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { HandDrawnHeartRing, WatercolorHeart } from './Decorations';
import { Calendar as CalendarIcon, Check, Download, ExternalLink, Clock } from 'lucide-react';

export const CalendarSection: React.FC = () => {
  const [calendarMenuOpen, setCalendarMenuOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // December 2026 calendar days:
  // Dec 1, 2026 is Tuesday!
  // Week starts Monday (Пн).
  // Days: Mon (empty), Tue=1, Wed=2, Thu=3, Fri=4, Sat=5, Sun=6 ...
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  // 31 days in Dec 2026. Day 1 is Tuesday, so 1 blank on Monday.
  const calendarCells = [
    null, 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31, null, null, null
  ];

  // Helper to generate and download .ics file for Apple / Outlook
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nazim & Yulduz Wedding//RU',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-nazim-yulduz-20261212@moment4.ru',
      'SUMMARY:Свадьба Назима и Юлдуз 💍',
      'DESCRIPTION:Торжество бракосочетания Назима и Юлдуз. Сбор гостей: 13:00 (зал Аль Азиза), Банкет: 16:00 (Ресторан Горная Долина).',
      'LOCATION:Ресторан Горная Долина, ул. Булача, Махачкала',
      'DTSTART:20261212T100000Z',
      'DTEND:20261212T200000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'svadba-nazim-yulduz.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setCalendarMenuOpen(false);
  };

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Свадьба Назима и Юлдуз 💍'
  )}&dates=20261212T100000Z/20261212T200000Z&details=${encodeURIComponent(
    'Торжество бракосочетания Назима и Юлдуз. Сбор гостей: 13:00 (зал Аль Азиза), Банкет: 16:00 (ресторан Горная Долина).'
  )}&location=${encodeURIComponent('Ресторан Горная Долина, ул. Булача, Махачкала')}`;

  // Yandex Calendar URL
  const yandexCalendarUrl = `https://calendar.yandex.ru/event?name=${encodeURIComponent(
    'Свадьба Назима и Юлдуз'
  )}&start_ts=1797079200000&end_ts=1797115200000&description=${encodeURIComponent(
    'Свадебное торжество Назима и Юлдуз'
  )}&location=${encodeURIComponent('Ресторан Горная Долина, Махачкала')}`;

  return (
    <section id="calendar-section" className="relative py-16 sm:py-24 px-4 bg-[#262022] text-center overflow-hidden">
      {/* Background pine foliage accents */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-32 bg-[#2a382c]/20 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Section Headers matching mockup */}
        <div className="space-y-1">
          <p className="text-[10px] sm:text-xs tracking-[0.2em] text-stone-400 uppercase font-medium">
            НАШ ДЕНЬ
          </p>
          <h2 className="font-semibold text-2xl sm:text-3xl text-[#f5eae2] tracking-wide uppercase">
            Обведите эту дату
          </h2>
        </div>

        {/* Blush Pink Paper Card */}
        <div className="relative rounded-2xl bg-[#ebced2] text-[#2d2224] p-6 sm:p-8 shadow-2xl border-4 border-[#e2bec3] overflow-hidden">
          {/* Subtle leaves decoration in top right corner */}
          <div className="absolute top-2 right-2 opacity-50 pointer-events-none">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
              <path
                d="M 20,80 Q 50,40 85,20 Q 60,60 20,80 Z"
                fill="#b87b70"
                opacity="0.6"
              />
              <path
                d="M 40,65 Q 70,30 95,35 Q 75,65 40,65 Z"
                fill="#94635a"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Month & Year */}
          <div className="text-center mb-6">
            <h3 className="font-semibold text-2xl sm:text-3xl text-[#241a1c] uppercase tracking-wider leading-tight">
              {WEDDING_DATA.monthName}
            </h3>
            <p className="text-[11px] sm:text-xs tracking-[0.2em] text-[#664b50] font-medium uppercase mt-0.5">
              {WEDDING_DATA.year}
            </p>
          </div>

          {/* Weekdays row */}
          <div className="grid grid-cols-7 gap-1 text-[11px] font-medium text-[#6d4d53] mb-3 text-center border-b border-[#ddb3b9] pb-2">
            {weekDays.map((day) => (
              <span key={day} className="py-1">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center font-medium text-sm sm:text-base text-[#38262a]">
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} className="h-9 sm:h-10" />;
              }

              const isWeddingDay = day === 12;

              return (
                <div
                  key={`day-${day}`}
                  className="relative flex items-center justify-center h-9 sm:h-10"
                >
                  {isWeddingDay ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      {/* Hand-drawn heart circling around 12 */}
                      <HandDrawnHeartRing className="w-10 h-10 -top-0.5 -left-0.5" />
                      <span className="relative z-10 font-bold text-base sm:text-lg text-[#991b28]">
                        12
                      </span>
                    </div>
                  ) : (
                    <span className="opacity-80 hover:opacity-100 transition-opacity">
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="h-px bg-[#ddb3b9] my-5" />

          {/* Card footer details */}
          <div className="space-y-1.5 text-center">
            <p className="text-sm sm:text-base font-semibold text-[#2f1f23]">
              {WEDDING_DATA.formattedDate}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#6e4e54]">
              <Clock className="w-3.5 h-3.5" />
              <span>{WEDDING_DATA.formattedTime}</span>
            </div>
            <p className="font-bold text-base sm:text-lg text-[#82131d] pt-2 uppercase tracking-wider">
              Ждём вас!
            </p>
          </div>
        </div>

        {/* Add to Calendar Button with Dropdown */}
        <div className="relative pt-2">
          <button
            onClick={() => setCalendarMenuOpen(!calendarMenuOpen)}
            className="w-full sm:w-auto mx-auto px-6 py-3 rounded-full bg-[#1e191a] hover:bg-[#2e2527] text-stone-200 hover:text-white border border-stone-600/60 shadow-lg text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all duration-200"
          >
            <CalendarIcon className="w-4 h-4 text-rose-400" />
            <span>Добавить в календарь</span>
          </button>

          {/* Calendar Picker Popover */}
          {calendarMenuOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-14 w-72 bg-[#2d2527] border border-rose-500/30 rounded-xl shadow-2xl p-2 z-50 text-left space-y-1">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCalendarMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>Google Календарь</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <button
                onClick={downloadIcsFile}
                className="w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>Apple / Outlook (.ics)</span>
                <Download className="w-3.5 h-3.5 text-stone-400" />
              </button>

              <a
                href={yandexCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setCalendarMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 text-xs sm:text-sm text-stone-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>Яндекс Календарь</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
