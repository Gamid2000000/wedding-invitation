import React, { useState, useEffect } from 'react';
import { GuestResponse } from './RsvpModal';
import { X, Users, Check, Download, Trash2, ShieldCheck } from 'lucide-react';

export const OrganizerModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [guestList, setGuestList] = useState<GuestResponse[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('nazim_yulduz_all_rsvps') || '[]';
        setGuestList(JSON.parse(stored));
      } catch (e) {
        setGuestList([]);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const totalGuests = guestList
    .filter((g) => g.attending !== 'no')
    .reduce((acc, curr) => acc + (curr.guestCount || 1), 0);

  const exportCsv = () => {
    if (guestList.length === 0) return;
    const headers = ['Имя', 'Статус', 'Кол-во персон', 'Спутник', 'Пожелания'];
    const rows = guestList.map((g) => [
      g.name,
      g.attending === 'yes' ? 'Придет' : g.attending === 'plus_one' ? 'Не один' : 'Не сможет',
      g.guestCount,
      g.partnerName || '-',
      (g.wishes || '').replace(/(\r\n|\n|\r)/gm, ' '),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'spisok_gostey_nazim_yulduz.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearList = () => {
    if (window.confirm('Очистить список ответов?')) {
      localStorage.removeItem('nazim_yulduz_all_rsvps');
      setGuestList([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#261f22] border border-rose-500/30 rounded-3xl p-6 sm:p-8 text-stone-200 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-rose-300">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-semibold text-xl sm:text-2xl text-white uppercase tracking-wide">
              Панель организатора
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="p-3 rounded-xl bg-[#1d1618] border border-white/5 text-center">
              <span className="text-2xl font-bold text-white">{totalGuests}</span>
              <p className="text-[10px] text-stone-400 uppercase mt-1">Ожидаемо гостей</p>
            </div>
            <div className="p-3 rounded-xl bg-[#1d1618] border border-white/5 text-center">
              <span className="text-2xl font-bold text-emerald-400">
                {guestList.filter((g) => g.attending !== 'no').length}
              </span>
              <p className="text-[10px] text-stone-400 uppercase mt-1">Подтвердили</p>
            </div>
            <div className="p-3 rounded-xl bg-[#1d1618] border border-white/5 text-center">
              <span className="text-2xl font-bold text-rose-400">
                {guestList.filter((g) => g.attending === 'no').length}
              </span>
              <p className="text-[10px] text-stone-400 uppercase mt-1">Отказались</p>
            </div>
          </div>

          {/* Guest Table */}
          <div className="max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#1e1719] divide-y divide-white/5">
            {guestList.length === 0 ? (
              <div className="p-8 text-center text-xs text-stone-400">
                Пока нет сохранённых ответов от гостей.
              </div>
            ) : (
              guestList.map((g, i) => (
                <div key={i} className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{g.name}</span>
                    {g.partnerName && (
                      <span className="text-stone-400 ml-1">+ {g.partnerName}</span>
                    )}
                    {g.wishes && (
                      <p className="text-[11px] text-stone-400 mt-0.5 line-clamp-1 italic">
                        «{g.wishes}»
                      </p>
                    )}
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      g.attending === 'no'
                        ? 'bg-stone-800 text-stone-400'
                        : 'bg-emerald-950 text-emerald-300'
                    }`}
                  >
                    {g.attending === 'yes'
                      ? '1 гость'
                      : g.attending === 'plus_one'
                      ? '2 гостя'
                      : 'Отказ'}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={exportCsv}
              disabled={guestList.length === 0}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Скачать в Excel (.csv)</span>
            </button>

            {guestList.length > 0 && (
              <button
                onClick={clearList}
                className="px-3 py-2 text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Очистить</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
