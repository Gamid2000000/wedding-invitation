import React from 'react';

export interface FloatingHeartItem {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

export const FloatingHeartsOverlay: React.FC<{ hearts: FloatingHeartItem[] }> = ({
  hearts,
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute animate-float-heart"
          style={{
            left: `${h.x}px`,
            top: `${h.y}px`,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            stroke="none"
            style={{
              transform: `rotate(${h.rotation}deg)`,
              filter: 'drop-shadow(0 2px 6px rgba(180, 20, 30, 0.4))',
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
