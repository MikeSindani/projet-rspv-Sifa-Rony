import React from 'react'

export function FloatingPetals() {
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: `${(i * 8.5 + 4) % 95}%`,
    delay: `${(i * 1.3) % 7}s`,
    duration: `${10 + (i % 6) * 3}s`,
    size: 10 + (i % 8) * 3,
    rotate: (i * 35) % 360,
  }))

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-10"
          style={{
            left: p.left,
            animation: `fall ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.5}
            viewBox="0 0 20 30"
            fill="none"
            style={{ transform: `rotate(${p.rotate}deg)` }}
          >
            <path
              d="M10 0 C18 8, 20 22, 10 30 C0 22, 2 8, 10 0 Z"
              fill={p.id % 2 === 0 ? '#b68d40' : '#a65b32'}
              opacity="0.5"
            />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(30px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
