import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from '../data/weddingData';
import { X, Heart, CheckCircle2, QrCode, User } from 'lucide-react';
import confetti from 'canvas-confetti';
import { saveRsvp } from '../lib/rsvpStore';

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface GuestResponse {
  name: string;
  attending: 'yes' | 'no' | 'plus_one';
  guestCount: number;
  partnerName?: string;
  wishes?: string;
  submittedAt: string;
}

export const RsvpModal: React.FC<RsvpModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no' | 'plus_one'>('yes');
  const [partnerName, setPartnerName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [savedData, setSavedData] = useState<GuestResponse | null>(null);

  // Load existing RSVP from localStorage if any
  useEffect(() => {
    try {
      const stored = localStorage.getItem('nazim_yulduz_rsvp');
      if (stored) {
        const parsed: GuestResponse = JSON.parse(stored);
        setSavedData(parsed);
        setName(parsed.name);
        setAttending(parsed.attending);
        setPartnerName(parsed.partnerName || '');
        setGuestCount(parsed.guestCount || 1);
        setWishes(parsed.wishes || '');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const response: GuestResponse = {
      name: name.trim(),
      attending,
      guestCount: attending === 'plus_one' ? Math.max(2, guestCount) : attending === 'yes' ? 1 : 0,
      partnerName: attending === 'plus_one' ? partnerName.trim() : undefined,
      wishes: wishes.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      await saveRsvp(response);
    } catch {
      setSubmitError(true);
      return;
    }
    setSubmitError(false);
    localStorage.setItem('nazim_yulduz_rsvp', JSON.stringify(response));

    setSavedData(response);
    setIsSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#c24141', '#e11d48', '#fbbf24', '#ffffff'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#271f22] border border-rose-500/25 rounded-3xl shadow-2xl p-6 sm:p-8 text-stone-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="text-center space-y-1">
              <span className="font-semibold text-lg sm:text-2xl text-[#f3e7dc] uppercase tracking-wide block">
                Подтверждение присутствия
              </span>
              <p className="text-xs sm:text-sm text-stone-400 font-light">
                Свадьба Назима и Юлдуз · 12 декабря 2026 г.
              </p>
            </div>

            {/* Guest Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-400" />
                <span>Ваше Имя и Фамилия *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например: Аслан Магомедов"
                className="w-full px-4 py-2.5 rounded-xl bg-[#1b1517] border border-white/10 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-stone-500 transition-colors"
              />
            </div>

            {/* Attendance Radios */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-300">
                Сможете ли вы разделить этот праздник с нами? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    attending === 'yes'
                      ? 'bg-[#82131d] border-rose-400 text-white shadow-md'
                      : 'bg-[#1b1517] border-white/10 text-stone-300 hover:border-white/25'
                  }`}
                >
                  Да, с радостью! ❤️
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('plus_one')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    attending === 'plus_one'
                      ? 'bg-[#82131d] border-rose-400 text-white shadow-md'
                      : 'bg-[#1b1517] border-white/10 text-stone-300 hover:border-white/25'
                  }`}
                >
                  Приду не один 🥂
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    attending === 'no'
                      ? 'bg-stone-700 border-stone-500 text-white'
                      : 'bg-[#1b1517] border-white/10 text-stone-300 hover:border-white/25'
                  }`}
                >
                  К сожалению, нет 💔
                </button>
              </div>
            </div>

            {/* Partner name if coming with someone */}
            {attending === 'plus_one' && (
              <div className="space-y-1.5 animate-fadeIn">
                <label className="text-xs font-semibold text-stone-300">
                  Кто будет с вами? (Имя и Фамилия)
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Имя Вашего гостя / спутника"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1b1517] border border-white/10 focus:border-rose-500 focus:outline-none text-sm text-white placeholder-stone-500"
                />
              </div>
            )}

            {/* Wishes */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-300">
                Тёплые пожелания молодожёнам (по желанию)
              </label>
              <textarea
                rows={2}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder="Ваши добрые слова Назиму и Юлдуз..."
                className="w-full px-4 py-2 rounded-xl bg-[#1b1517] border border-white/10 focus:border-rose-500 focus:outline-none text-xs text-white placeholder-stone-500"
              />
            </div>

            {submitError && (
              <p className="text-xs text-rose-300 text-center">
                Не удалось отправить ответ. Проверьте интернет и попробуйте ещё раз.
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#82131d] to-[#aa212e] hover:from-[#9c1825] hover:to-[#bd2b3b] text-white text-xs sm:text-sm tracking-wider uppercase font-medium shadow-xl shadow-[#82131d]/40 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Отправить ответ</span>
            </button>
          </form>
        ) : (
          /* Confirmation Pass Screen */
          <div className="text-center space-y-6 py-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold text-lg sm:text-2xl text-[#f3e7dc] uppercase tracking-wide">
                Спасибо, {savedData?.name}!
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light">
                {savedData?.attending === 'no'
                  ? 'Очень жаль, что вы не сможете быть с нами, но мы ценим ваш ответ!'
                  : 'Ваш ответ успешно сохранён. Мы с нетерпением ждём встречи!'}
              </p>
            </div>

            {/* Personalized Guest Ticket Card */}
            {savedData?.attending !== 'no' && (
              <div className="rounded-2xl bg-gradient-to-br from-[#ebced2] to-[#dfbac0] text-[#2c1d21] p-5 shadow-2xl border border-rose-300/60 text-left space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#cca3aa] pb-2">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase font-semibold text-[#663b44]">
                      ПРИГЛАСИТЕЛЬНЫЙ БИЛЕТ
                    </p>
                    <p className="font-script text-2xl font-normal text-[#82131d] select-none">
                      {WEDDING_DATA.coupleTitle}
                    </p>
                  </div>
                  <div className="p-1.5 rounded-lg bg-white/70">
                    <QrCode className="w-8 h-8 text-[#82131d]" />
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p>
                    <strong className="text-[#663b44]">Гость:</strong> {savedData?.name}
                    {savedData?.partnerName && ` + ${savedData.partnerName}`}
                  </p>
                  <p>
                    <strong className="text-[#663b44]">Дата:</strong> 12 декабря 2026 г. (14:00)
                  </p>
                  <p>
                    <strong className="text-[#663b44]">Локация:</strong> Ресторан «Горная Долина»
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-xs text-stone-400 hover:text-white underline"
              >
                Изменить данные
              </button>
              <span className="text-stone-600">·</span>
              <button
                onClick={onClose}
                className="text-xs text-rose-300 hover:text-rose-200 font-medium"
              >
                Закрыть окно
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
