import React from 'react';

export const WatercolorHeart: React.FC<{
  className?: string;
  size?: number;
  rotation?: number;
  opacity?: number;
}> = ({ className = '', size = 48, rotation = 0, opacity = 0.85 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`inline-block select-none pointer-events-none transition-transform ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity,
        filter: 'drop-shadow(0 2px 4px rgba(180, 20, 30, 0.25))',
      }}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`paintGrad-${rotation}`} cx="38%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#d93845" />
          <stop offset="45%" stopColor="#b52331" />
          <stop offset="85%" stopColor="#82131d" />
          <stop offset="100%" stopColor="#540b12" />
        </radialGradient>
        <filter id={`rough-${rotation}`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      {/* Hand-brushed heart stroke */}
      <path
        d="M 50,32 C 45,16 28,12 17,24 C 5,37 8,56 22,69 C 32,78 43,87 50,92 C 57,87 68,78 78,69 C 92,56 95,37 83,24 C 72,12 55,16 50,32 Z"
        fill={`url(#paintGrad-${rotation})`}
        filter={`url(#rough-${rotation})`}
      />
      {/* Artistic secondary brush stroke */}
      <path
        d="M 48,34 C 42,22 30,19 22,28 C 12,39 15,54 26,64 C 34,71 44,80 49,85 C 50,78 48,60 48,34 Z"
        fill="#f472b6"
        opacity="0.25"
      />
    </svg>
  );
};

export const PineBranchBorder: React.FC<{
  position?: 'top' | 'bottom';
  className?: string;
}> = ({ position = 'top', className = '' }) => {
  const isTop = position === 'top';
  return (
    <div
      className={`w-full overflow-hidden pointer-events-none select-none relative ${className}`}
      style={{ height: '70px' }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 120"
        className={`w-full h-full object-cover text-[#203628] opacity-75 ${
          !isTop ? 'transform rotate-180' : ''
        }`}
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q150,60 300,10 Q450,80 600,20 Q750,75 900,15 Q1050,70 1200,0 L1200,120 L0,120 Z"
          fill="none"
        />
        {/* Decorative pine needles motif */}
        <g stroke="#284833" strokeWidth="2.5" strokeLinecap="round" opacity="0.65">
          <line x1="80" y1="0" x2="120" y2="45" />
          <line x1="120" y1="45" x2="105" y2="60" />
          <line x1="120" y1="45" x2="145" y2="55" />
          <line x1="120" y1="45" x2="130" y2="75" />
          
          <line x1="280" y1="5" x2="330" y2="55" />
          <line x1="330" y1="55" x2="310" y2="70" />
          <line x1="330" y1="55" x2="355" y2="65" />
          <line x1="330" y1="55" x2="340" y2="85" />
          
          <line x1="580" y1="0" x2="630" y2="50" />
          <line x1="630" y1="50" x2="615" y2="70" />
          <line x1="630" y1="50" x2="655" y2="60" />
          
          <line x1="880" y1="5" x2="930" y2="55" />
          <line x1="930" y1="55" x2="910" y2="70" />
          <line x1="930" y1="55" x2="955" y2="65" />
          
          <line x1="1080" y1="0" x2="1130" y2="45" />
          <line x1="1130" y1="45" x2="1115" y2="65" />
        </g>
        <g stroke="#3a6047" strokeWidth="1.8" strokeLinecap="round" opacity="0.8">
          <line x1="100" y1="10" x2="135" y2="50" />
          <line x1="300" y1="15" x2="345" y2="60" />
          <line x1="600" y1="10" x2="645" y2="55" />
          <line x1="900" y1="15" x2="945" y2="60" />
          <line x1="1100" y1="10" x2="1145" y2="50" />
        </g>
      </svg>
    </div>
  );
};

export const HandDrawnHeartRing: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`w-full h-full absolute inset-0 pointer-events-none select-none text-[#b32635] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hand-drawn circular heart outline encircling date 12 */}
      <path
        d="M 50,22 
           C 42,6 18,10 14,32 
           C 10,50 32,70 50,86 
           C 68,70 90,50 86,32 
           C 82,10 58,6 50,22 
           Z"
        className="animate-pulse"
        style={{ animationDuration: '3s' }}
      />
    </svg>
  );
};
