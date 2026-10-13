import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, ArrowRight } from 'lucide-react';
import { WEDDING_DATA } from '../data/weddingData';

interface WeddingEnvelopeProps {
  isOpen: boolean;
  onOpenComplete: () => void;
}

type EnvelopePhase =
  | 'sealed'    // Fully closed, 100% solid opaque envelope. Nothing inside visible.
  | 'shake'     // Gentle realistic wobble on click (650ms)
  | 'opening'   // Flap smoothly swings open 180° in 3D, revealing inner velvet lining (1000ms)
  | 'emerging'  // Invitation letter card glides up out of the pocket (1200ms)
  | 'showcase'  // Letter card displayed prominently in center for reading (~8s or click to advance)
  | 'exit';     // Envelope and letter smoothly slide down, revealing the main website (900ms)

export const WeddingEnvelope: React.FC<WeddingEnvelopeProps> = ({
  isOpen,
  onOpenComplete,
}) => {
  const [phase, setPhase] = useState<EnvelopePhase>('sealed');
  const timerRef = useRef<NodeJS.Timeout[]>([]);

  // Clear all running timers on unmount
  useEffect(() => {
    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, []);

  // When isOpen changes from true to false (e.g. user clicked "Конверт" button to reopen)
  useEffect(() => {
    if (!isOpen) {
      setPhase('sealed');
    }
  }, [isOpen]);

  const addTimer = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timerRef.current.push(id);
    return id;
  };

  // Start the opening animation
  const handleOpenEnvelope = () => {
    if (phase !== 'sealed') return;

    // Phase 1: Gentle tactile wobble
    setPhase('shake');

    // Trigger romantic background melody
    try {
      window.dispatchEvent(new CustomEvent('wedding:play-audio'));
    } catch {
      // Audio autoplay fallback
    }

    // Phase 2: Flap smoothly opens 180° in 3D
    addTimer(() => {
      setPhase('opening');

      // Delicate golden and rose petal confetti burst
      try {
        confetti({
          particleCount: 55,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#e5c583', '#a31d2b', '#f9d2de', '#faebd7', '#80131d'],
          disableForReducedMotion: true,
        });
      } catch {
        // Fallback
      }
    }, 650);

    // Phase 3: Letter card glides UP out of the pocket
    addTimer(() => {
      setPhase('emerging');
    }, 1650);

    // Phase 4: Letter card is showcased in center of screen
    addTimer(() => {
      setPhase('showcase');
    }, 2850);

    // Phase 5: Smooth automatic transition to website after generous reading time
    addTimer(() => {
      proceedToSite();
    }, 11000);
  };

  // Transition to main website
  const proceedToSite = () => {
    timerRef.current.forEach(clearTimeout);
    setPhase('exit');

    addTimer(() => {
      onOpenComplete();
    }, 900);
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    timerRef.current.forEach(clearTimeout);
    onOpenComplete();
  };

  // If already open and in sealed state, do not render
  if (isOpen && phase === 'sealed') {
    return null;
  }

  const isFlapOpen = phase === 'opening' || phase === 'emerging' || phase === 'showcase' || phase === 'exit';
  const isLetterEmerging = phase === 'emerging' || phase === 'showcase' || phase === 'exit';
  const isLetterProminent = phase === 'showcase';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Свадебное приглашение в конверте"
      className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 transition-all duration-1000 ${
        phase === 'exit'
          ? 'bg-black/0 pointer-events-none opacity-0'
          : 'bg-[#120e10] opacity-100'
      }`}
    >
      {/* Warm ambient candlelight background glow (completely conceals underlying website) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(130,24,37,0.35)_0%,rgba(18,14,16,0.98)_70%)] pointer-events-none" />

      {/* Discreet skip button */}
      {(phase === 'sealed' || phase === 'shake') && (
        <button
          onClick={handleSkip}
          className="absolute top-5 right-5 z-40 text-stone-300 hover:text-white text-xs sm:text-sm px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 bg-black/50 backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg"
          title="Перейти сразу к сайту"
        >
          <span>Пропустить</span>
          <span className="text-[10px] text-stone-400">✕</span>
        </button>
      )}

      {/* ======================================================== */}
      {/* MAIN ENVELOPE STAGE                                      */}
      {/* ======================================================== */}
      <div
        className={`relative w-full max-w-[500px] sm:max-w-[530px] h-[340px] sm:h-[370px] select-none envelope-perspective transition-all duration-1000 ease-in-out ${
          phase === 'shake' ? 'animate-envelope-shake' : ''
        } ${
          phase === 'exit'
            ? 'translate-y-[120vh] scale-90 rotate-2 opacity-0 pointer-events-none'
            : isLetterEmerging
            ? 'translate-y-12 sm:translate-y-16 scale-100'
            : 'translate-y-0 scale-100'
        }`}
      >
        {/* Soft realistic drop shadow under envelope */}
        <div
          className={`absolute -bottom-8 inset-x-8 h-14 bg-black/70 blur-2xl rounded-full transition-all duration-700 ${
            phase === 'exit' ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
          }`}
        />

        {/* ======================================================== */}
        {/* LAYER 1 (z-0): ENVELOPE BACK PLATE & INNER VELVET LINING  */}
        {/* ======================================================== */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#c4ab91]/60 bg-[#eedecb] shadow-2xl z-0">
          {/* Deep royal burgundy velvet lining revealed when top flap opens */}
          <div
            className={`absolute top-0 inset-x-0 h-52 bg-gradient-to-b from-[#3d0910] via-[#520d16] to-[#2b050a] transition-opacity duration-700 ${
              isFlapOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Subtle damask gold pattern inside lining */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle at center, #ffd700 1.2px, transparent 1.2px)',
                backgroundSize: '16px 16px',
              }}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 2: INVITATION LETTER CARD                          */}
        {/* Initially hidden. When flap opens, glides UP out of the  */}
        {/* envelope into full glorious view on top (z-40).           */}
        {/* ======================================================== */}
        <div
          onClick={isLetterEmerging ? proceedToSite : undefined}
          className={`absolute inset-x-3 sm:inset-x-5 top-2 sm:top-3 rounded-2xl bg-[#faf6f0] border-2 border-[#d9c7b0] shadow-2xl transition-all duration-1000 ease-out flex flex-col justify-between overflow-hidden ${
            !isLetterEmerging
              ? 'opacity-0 pointer-events-none translate-y-36 scale-90 z-10'
              : isLetterProminent
              ? '-translate-y-48 sm:-translate-y-56 scale-100 sm:scale-105 z-40 opacity-100 cursor-pointer ring-4 ring-[#82131d]/20 shadow-[0_30px_80px_rgba(0,0,0,0.8)]'
              : '-translate-y-40 sm:-translate-y-44 scale-100 z-40 opacity-100'
          }`}
          style={{ height: '350px' }}
        >
          {/* Ornate Golden Inner Border Frame */}
          <div className="absolute inset-2.5 rounded-xl border border-[#c4ab91]/60 pointer-events-none" />
          <div className="absolute inset-3.5 rounded-lg border border-dashed border-[#dfceba]/70 pointer-events-none" />

          {/* Letter Header */}
          <div className="relative pt-6 px-6 text-center">
            {/* Gilded Heart Emblem */}
            <div className="mx-auto w-9 h-9 rounded-full bg-gradient-to-br from-[#8a1421] to-[#590a13] flex items-center justify-center shadow-md mb-2">
              <Heart className="w-4 h-4 fill-[#f5d79e] text-[#f5d79e]" />
            </div>

            <p className="font-serif text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#856056] font-semibold">
              Свадебное торжество
            </p>

            <h2 className="font-script text-3xl sm:text-4xl text-[#3b151d] font-normal leading-tight mt-1">
              Дорогие и близкие!
            </h2>
          </div>

          {/* Letter Body: Romantic Message */}
          <div className="relative px-6 text-center space-y-2">
            <p className="text-xs sm:text-sm text-[#573932] leading-relaxed font-light">
              Мы будем счастливы разделить с вами самый особенный и радостный день в нашей жизни!
            </p>

            <div className="pt-1 pb-0.5">
              <p className="font-serif text-base sm:text-lg font-bold tracking-[0.15em] uppercase text-[#82131d]">
                {WEDDING_DATA.coupleTitle}
              </p>
            </div>
          </div>

          {/* Letter Footer: Interactive button & reading indicator */}
          <div className="relative pb-5 px-6 flex flex-col items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                proceedToSite();
              }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8a1421] via-[#9e1c2b] to-[#73101b] hover:from-[#9c1825] hover:to-[#82131d] text-[#faedd9] font-medium text-xs sm:text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 group active:scale-95"
            >
              <span>Войти на сайт свадьбы</span>
              <ArrowRight className="w-4 h-4 text-[#faedd9] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Showcase duration progress bar at the bottom */}
            {isLetterProminent && (
              <div className="w-full mt-3 bg-stone-200/80 h-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#c5a059] to-[#82131d]"
                  style={{
                    animation: 'progressFill 8s linear forwards',
                  }}
                />
              </div>
            )}
            <p className="text-[10px] text-stone-500 mt-1">
              Нажмите в любое место, чтобы открыть сайт
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* LAYER 3 (z-20): ENVELOPE FRONT POCKET                    */}
        {/* Solid, 100% OPAQUE luxury textured cotton paper.         */}
        {/* Seamless, perfectly even and unified front surface.       */}
        {/* ======================================================== */}
        <div
          onClick={phase === 'sealed' ? handleOpenEnvelope : undefined}
          className={`absolute inset-0 rounded-2xl overflow-hidden z-20 transition-all duration-700 bg-gradient-to-b from-[#faf6ef] via-[#f3e7d5] to-[#ebd9c2] border-[1.5px] border-[#c8b096] shadow-[0_25px_60px_rgba(0,0,0,0.65)] ${
            phase === 'sealed' ? 'cursor-pointer group' : ''
          }`}
        >
          {/* Subtle paper grain texture pattern */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#806045 0.75px, transparent 0.75px), radial-gradient(#806045 0.75px, #ebdcc9 0.75px)',
              backgroundSize: '18px 18px',
              backgroundPosition: '0 0, 9px 9px',
            }}
          />

          {/* Elegant gold foil double frame around envelope */}
          <div className="absolute inset-3.5 sm:inset-4 rounded-xl border border-[#c4ab91]/45 pointer-events-none" />
          <div className="absolute inset-[18px] sm:inset-5 rounded-lg border border-dashed border-[#dfceba]/55 pointer-events-none" />

          {/* Delicate corner rosettes */}
          <span className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#c5a059]/60 pointer-events-none" />
          <span className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#c5a059]/60 pointer-events-none" />
          <span className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-[#c5a059]/60 pointer-events-none" />
          <span className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-[#c5a059]/60 pointer-events-none" />

          {/* Vintage Postmark Stamp (Top Right) */}
          <div className={`absolute top-4 right-5 pointer-events-none flex items-center gap-2 z-10 transition-opacity duration-500 ${
            isFlapOpen ? 'opacity-0' : 'opacity-100'
          }`}>
            <div className="hidden sm:flex flex-col gap-1 opacity-40">
              <span className="w-7 h-px bg-[#7c5b4e]" />
              <span className="w-9 h-px bg-[#7c5b4e]" />
              <span className="w-7 h-px bg-[#7c5b4e]" />
            </div>

            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full border-2 border-[#801925]/50 flex flex-col items-center justify-center text-center p-1 rotate-6 bg-[#faf6f0]/80 shadow-sm">
              <span className="text-[7px] font-serif uppercase tracking-widest text-[#801925] font-semibold">
                СВАДЬБА
              </span>
              <span className="text-[10px] font-bold text-[#801925] leading-none my-0.5">
                12.12.26
              </span>
              <span className="text-[6px] text-[#73524b] tracking-wider uppercase font-medium">
                МАХАЧКАЛА
              </span>
            </div>
          </div>

          {/* Main Envelope Front Inscription: «Приглашение на свадьбу» */}
          {/* Positioned clearly in the center and lower area with generous space */}
          <div
            className={`absolute inset-x-0 bottom-7 sm:bottom-9 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-10 transition-opacity duration-500 ${
              isFlapOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Primary Heading requested by user - 'Приглашение на свадьбу' */}
            <h1 className="font-script text-3xl sm:text-5xl md:text-5xl text-[#3b151e] font-normal leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] px-2">
              Приглашение на свадьбу
            </h1>

            {/* Subtle decorative flourish divider */}
            <div className="flex items-center justify-center gap-2.5 mt-2.5 opacity-65">
              <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#9c7a5f] to-[#9c7a5f]" />
              <Heart className="w-2.5 h-2.5 fill-[#801925] text-[#801925]" />
              <span className="w-12 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#9c7a5f] to-[#9c7a5f]" />
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 4 (z-30): ENVELOPE TOP FLAP                        */}
        {/* Folds DOWN when sealed, smoothly rotates 180° UP in 3D   */}
        {/* Precision vector contour: perfectly flush rounded corners*/}
        {/* ======================================================== */}
        <div
          onClick={phase === 'sealed' ? handleOpenEnvelope : undefined}
          className={`absolute top-0 inset-x-0 h-[44%] envelope-flap-hinge ${
            isLetterEmerging ? 'z-10' : 'z-30'
          } ${
            phase === 'sealed' ? 'cursor-pointer' : 'pointer-events-none'
          } ${
            isFlapOpen ? 'envelope-flap-open' : 'envelope-flap-closed'
          }`}
        >
          {/* Outer Flap: 100% Solid Opaque Cream Paper with Vector Bevel */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="flapPaperGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fdfbf5" />
                  <stop offset="50%" stopColor="#f3e7d6" />
                  <stop offset="100%" stopColor="#ebd8c1" />
                </linearGradient>
                <linearGradient id="goldBevelGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c5a059" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#f7e1a0" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#c5a059" stopOpacity="0.4" />
                </linearGradient>
                <filter id="flapShadow" x="-5%" y="0%" width="110%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#3a1c12" floodOpacity="0.22" />
                </filter>
              </defs>

              {/* Main solid paper flap with seamless rounded top corners matching rounded-2xl (r=16) */}
              <path
                d="M 16 0 L 484 0 A 16 16 0 0 1 500 16 L 256 140 Q 250 144 244 140 L 0 16 A 16 16 0 0 1 16 0 Z"
                fill="url(#flapPaperGrad)"
                filter="url(#flapShadow)"
                stroke="#c8b096"
                strokeWidth="1"
              />

              {/* Elegant gold foil bevel hairline along the V-shape */}
              <path
                d="M 0 16 L 244 140 Q 250 144 256 140 L 500 16"
                fill="none"
                stroke="url(#goldBevelGrad)"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              {/* Subtle stitched embossing running parallel inside the V-edge */}
              <path
                d="M 14 18 L 244 133 Q 250 136 256 133 L 486 18"
                fill="none"
                stroke="#cfb59a"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                opacity="0.6"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Inner Flap Backface: Deep Velvet Wine Red revealed when opened */}
          <div
            className="absolute inset-0 backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <svg
              className="w-full h-full block"
              viewBox="0 0 500 150"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="velvetBackGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2c050a" />
                  <stop offset="50%" stopColor="#4a0b13" />
                  <stop offset="100%" stopColor="#35060d" />
                </linearGradient>
                <pattern id="goldVelvetDots" width="16" height="16" patternUnits="userSpaceOnUse">
                  <circle cx="8" cy="8" r="0.9" fill="#d4af37" opacity="0.3" />
                </pattern>
              </defs>

              {/* Exact identical matching contour - when folded up, points UPWARDS smoothly into the air */}
              <path
                d="M 16 0 L 484 0 A 16 16 0 0 1 500 16 L 256 140 Q 250 144 244 140 L 0 16 A 16 16 0 0 1 16 0 Z"
                fill="url(#velvetBackGrad)"
                stroke="#8f1b26"
                strokeWidth="1"
              />
              <path
                d="M 16 0 L 484 0 A 16 16 0 0 1 500 16 L 256 140 Q 250 144 244 140 L 0 16 A 16 16 0 0 1 16 0 Z"
                fill="url(#goldVelvetDots)"
              />
              <path
                d="M 0 16 L 244 140 Q 250 144 256 140 L 500 16"
                fill="none"
                stroke="url(#goldBevelGrad)"
                strokeWidth="1.8"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 5 (z-40): ROYAL WAX SEAL                           */}
        {/* Centered with mathematical precision on flap V-vertex.   */}
        {/* Rich 3D carmine wax with embossed golden heart.           */}
        {/* ======================================================== */}
        <div
          onClick={phase === 'sealed' ? handleOpenEnvelope : undefined}
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-700 ease-out flex flex-col items-center select-none ${
            phase === 'sealed' ? 'cursor-pointer' : 'pointer-events-none'
          } ${
            isFlapOpen
              ? 'top-0 scale-75 opacity-0'
              : 'top-[44%]'
          }`}
        >
          {/* The Wax Seal Button */}
          <div className="relative group">
            {/* Outer Organic Wax Puddle Shape */}
            <div className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#9c1b2a] via-[#75111d] to-[#48080f] shadow-[0_10px_28px_rgba(65,8,15,0.7),inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-3px_6px_rgba(0,0,0,0.55)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 active:scale-95 border border-[#ba2b39]/70">
              {/* Organic wax irregular edge outline */}
              <div className="absolute -inset-1 rounded-full border-2 border-[#5c0b15]/60 opacity-70" />

              {/* Inner Debossed Seal Ring */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-[#d4af37]/70 flex flex-col items-center justify-center bg-gradient-to-br from-[#77121e] to-[#4f0810] shadow-[inset_0_3px_8px_rgba(0,0,0,0.7)]">
                {/* Embossed Heart Motif (NO initials) */}
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-[#f5d79e] text-[#d4af37] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
              </div>

              {/* Realistic wax highlight gloss */}
              <div className="absolute top-1 left-2.5 w-3.5 h-1.5 bg-white/40 rounded-full -rotate-45 blur-[0.5px] pointer-events-none" />
            </div>

            {/* Gentle pulsing aura around wax seal */}
            {phase === 'sealed' && (
              <span className="animate-ping absolute -inset-1.5 rounded-full bg-[#9c1b2a] opacity-25 pointer-events-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
