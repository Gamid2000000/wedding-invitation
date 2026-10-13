import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const RomanticAudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const notes = [
    293.66, 369.99, 440.0, 554.37, 587.33, 440.0, 369.99, 293.66,
    329.63, 415.30, 493.88, 587.33, 659.25, 493.88, 415.30, 329.63,
  ];

  const playTone = (freq: number, time: number, duration: number) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Warm harp-like envelope
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.08, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  };

  const scheduleMelody = () => {
    if (!isPlayingRef.current || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const startTime = ctx.currentTime + 0.1;

    notes.forEach((freq, i) => {
      playTone(freq, startTime + i * 0.45, 1.2);
    });

    const loopDuration = notes.length * 0.45 * 1000;
    timerRef.current = window.setTimeout(scheduleMelody, loopDuration);
  };

  const togglePlay = async () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    if (audioCtxRef.current.state === 'suspended') {
      await audioCtxRef.current.resume();
    }

    if (isPlaying) {
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsPlaying(false);
    } else {
      isPlayingRef.current = true;
      setIsPlaying(true);
      scheduleMelody();
    }
  };

  useEffect(() => {
    const handleStartAudio = () => {
      if (!isPlayingRef.current) {
        togglePlay();
      }
    };
    window.addEventListener('wedding:play-audio', handleStartAudio);

    return () => {
      window.removeEventListener('wedding:play-audio', handleStartAudio);
      isPlayingRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Выключить музыку' : 'Включить свадебную мелодию'}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border shadow-lg backdrop-blur-md transition-all duration-300 text-xs sm:text-sm font-medium ${
          isPlaying
            ? 'bg-[#6d1b24]/90 border-[#c44955] text-white shadow-[#6d1b24]/30'
            : 'bg-[#282425]/85 border-white/10 text-stone-300 hover:text-white hover:border-white/25'
        }`}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          {isPlaying ? (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f43f5e] opacity-40"></span>
              <Volume2 className="w-4 h-4 text-rose-300" />
            </>
          ) : (
            <VolumeX className="w-4 h-4 text-stone-400" />
          )}
        </span>
        <span className="hidden sm:inline font-light tracking-wide">
          {isPlaying ? 'Мелодия играет' : 'Включить музыку'}
        </span>
        <Music className={`w-3.5 h-3.5 opacity-60 ${isPlaying ? 'animate-bounce' : ''}`} />
      </button>
    </div>
  );
};
