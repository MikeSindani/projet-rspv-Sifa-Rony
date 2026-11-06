import React from 'react'

export function FloatingPetals() {
  // Cœurs flottants romantiques qui tombent doucement en arrière-plan
  const hearts = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${(i * 4.6 + 2) % 96}%`,
    delay: `${(i * 0.7) % 8}s`,
    duration: `${9 + (i % 7) * 2.5}s`,
    size: 14 + (i % 5) * 4,
    rotate: -25 + (i * 12) % 50,
    sway: 20 + (i % 4) * 15,
    color: i % 3 === 0 ? '#b68d40' : i % 3 === 1 ? '#a65b32' : '#d4af37',
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-40">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -top-12"
          style={{
            left: h.left,
            animation: `fallHearts ${h.duration} linear infinite`,
            animationDelay: h.delay,
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill={h.color}
            style={{
              transform: `rotate(${h.rotate}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(182,141,64,0.18))',
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fallHearts {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.85);
            opacity: 0;
          }
          12% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) rotate(15deg) scale(1.05) translateX(18px);
            opacity: 0.95;
          }
          88% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(105vh) rotate(-20deg) scale(0.9) translateX(-18px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
