import React from 'react'

export function WeddingRingsIcon({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* First ring */}
      <ellipse cx="48" cy="38" rx="28" ry="18" stroke="currentColor" strokeWidth="2.5" transform="rotate(-15 48 38)" />
      <ellipse cx="48" cy="38" rx="22" ry="13" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" transform="rotate(-15 48 38)" />
      {/* Solitaire diamond on first ring */}
      <polygon points="34,14 42,9 50,14 42,21" fill="currentColor" opacity="0.9" />
      <circle cx="42" cy="14" r="2.5" fill="#fff" />
      {/* Second ring intertwined */}
      <ellipse cx="72" cy="36" rx="28" ry="18" stroke="currentColor" strokeWidth="2.5" transform="rotate(15 72 36)" />
      <ellipse cx="72" cy="36" rx="22" ry="13" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" transform="rotate(15 72 36)" />
    </svg>
  )
}

export function ChurchIcon({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Cross on main steeple */}
      <line x1="38" y1="4" x2="38" y2="15" />
      <line x1="34" y1="8" x2="42" y2="8" />
      
      {/* Steeple roof */}
      <polyline points="29,26 38,15 47,26" />
      
      {/* Bell tower */}
      <rect x="31" y="26" width="14" height="24" />
      <path d="M35 37 C35 33, 41 33, 41 37 L41 43 L35 43 Z" />
      
      {/* Main church body */}
      <polyline points="18,50 38,36 58,50" />
      <rect x="22" y="50" width="32" height="38" />
      
      {/* Church Main Arch Door */}
      <path d="M33 88 L33 68 C33 63, 43 63, 43 68 L43 88 Z" />
      <circle cx="41" cy="78" r="0.8" fill="currentColor" />
      
      {/* Rose window */}
      <circle cx="38" cy="58" r="4.5" />
      <line x1="38" y1="53.5" x2="38" y2="62.5" />
      <line x1="33.5" y1="58" x2="42.5" y2="58" />

      {/* Side chapel right */}
      <polyline points="54,62 72,50 82,62" />
      <rect x="54" y="62" width="28" height="26" />
      <path d="M64 88 L64 74 C64 70, 72 70, 72 74 L72 88" />

      {/* Side chapel left */}
      <polyline points="10,64 16,58 22,64" />
      <rect x="10" y="64" width="12" height="24" />
      <path d="M14 88 L14 76 C14 74, 18 74, 18 76 L18 88" />

      {/* Ground line */}
      <line x1="5" y1="88" x2="95" y2="88" strokeWidth="2" />
    </svg>
  )
}

export function WeddingCakeIcon({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {/* Cake topper flowers / topper */}
      <path d="M46 14 C46 11, 54 11, 54 14 C54 17, 46 17, 46 14 Z" />
      <path d="M49 11 C49 8, 51 8, 51 11" />
      <circle cx="46" cy="12" r="1.5" />
      <circle cx="54" cy="12" r="1.5" />

      {/* Top Tier */}
      <path d="M41 20 C41 18, 59 18, 59 20 L59 36 C59 38, 41 38, 41 36 Z" />
      {/* Decorative frosting line top */}
      <path d="M41 26 Q 45 28, 50 26 Q 55 24, 59 26" strokeWidth="1.2" strokeDasharray="1 1.5" />

      {/* Middle Tier */}
      <path d="M33 36 C33 33, 67 33, 67 36 L67 56 C67 59, 33 59, 33 56 Z" />
      {/* Floral vine running across middle */}
      <path d="M35 44 Q 45 50, 56 42 Q 62 47, 65 44" strokeWidth="1.4" />
      <circle cx="45" cy="48" r="1.8" fill="currentColor" />
      <circle cx="56" cy="43" r="1.8" fill="currentColor" />
      <circle cx="62" cy="46" r="1.5" fill="currentColor" />

      {/* Bottom Tier */}
      <path d="M23 56 C23 52, 77 52, 77 56 L77 82 C77 86, 23 86, 23 82 Z" />
      {/* Cascading floral vine bottom */}
      <path d="M26 66 Q 38 74, 52 64 Q 64 74, 74 67" strokeWidth="1.5" />
      <circle cx="34" cy="71" r="2.2" fill="currentColor" />
      <circle cx="44" cy="67" r="1.8" fill="currentColor" />
      <circle cx="58" cy="70" r="2.2" fill="currentColor" />
      <circle cx="69" cy="69" r="1.8" fill="currentColor" />

      {/* Cake Stand */}
      <path d="M18 82 C18 80, 82 80, 82 82 L80 87 L20 87 Z" />
      <line x1="38" y1="87" x2="35" y2="92" />
      <line x1="62" y1="87" x2="65" y2="92" />
      <line x1="28" y1="92" x2="72" y2="92" strokeWidth="2" />
    </svg>
  )
}

export function DriedFlowerBotanical({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 640" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8d5b36" />
          <stop offset="50%" stopColor="#a76e42" />
          <stop offset="100%" stopColor="#633e21" />
        </linearGradient>
        <linearGradient id="petalGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9b183" />
          <stop offset="60%" stopColor="#b88350" />
          <stop offset="100%" stopColor="#7a4722" />
        </linearGradient>
        <radialGradient id="centerCone" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#432616" />
          <stop offset="60%" stopColor="#2c170d" />
          <stop offset="100%" stopColor="#1a0b06" />
        </radialGradient>
      </defs>

      {/* Main long botanical curved stem */}
      <path
        d="M 125 240 Q 140 380, 185 520 T 235 640"
        stroke="url(#stemGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />

      {/* Delicate side branch & little dried bud */}
      <path
        d="M 160 430 Q 195 410, 220 425"
        stroke="url(#stemGrad)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <ellipse cx="226" cy="428" rx="8" ry="14" fill="#a76e42" transform="rotate(35 226 428)" opacity="0.85" />

      {/* Dried drooping petals of Echinacea / cone flower */}
      <g opacity="0.95">
        {/* Left petals */}
        <path d="M 85 235 C 50 250, 20 280, 12 300 C 18 305, 45 280, 80 248 Z" fill="url(#petalGrad1)" />
        <path d="M 95 242 C 60 270, 35 315, 30 340 C 38 342, 65 305, 92 258 Z" fill="url(#petalGrad1)" />
        <path d="M 105 250 C 80 295, 60 360, 58 385 C 65 385, 88 330, 106 265 Z" fill="url(#petalGrad1)" />
        <path d="M 115 255 C 100 310, 95 380, 96 410 C 103 408, 114 345, 119 270 Z" fill="url(#petalGrad1)" />
        
        {/* Center petals hanging */}
        <path d="M 125 260 C 122 320, 128 395, 134 430 C 141 428, 138 355, 131 270 Z" fill="url(#petalGrad1)" />
        <path d="M 135 258 C 145 320, 160 390, 172 422 C 178 418, 164 345, 145 268 Z" fill="url(#petalGrad1)" />

        {/* Right petals */}
        <path d="M 145 252 C 170 300, 205 365, 225 390 C 230 384, 198 325, 155 260 Z" fill="url(#petalGrad1)" />
        <path d="M 152 245 C 185 285, 235 330, 265 350 C 270 342, 222 300, 165 250 Z" fill="url(#petalGrad1)" />
        <path d="M 158 238 C 200 270, 255 295, 285 305 C 288 298, 240 275, 172 240 Z" fill="url(#petalGrad1)" />
        <path d="M 160 228 C 205 245, 260 258, 290 262 C 292 255, 245 245, 170 230 Z" fill="url(#petalGrad1)" />
      </g>

      {/* Prominent textured spiky cone head */}
      <path
        d="M 85 230 C 85 160, 165 160, 165 230 Z"
        fill="url(#centerCone)"
      />

      {/* Spiky seed heads texture */}
      <g fill="#d9b183" opacity="0.8">
        <circle cx="100" cy="210" r="2.2" />
        <circle cx="110" cy="195" r="2.4" />
        <circle cx="125" cy="185" r="2.8" />
        <circle cx="140" cy="195" r="2.4" />
        <circle cx="150" cy="210" r="2.2" />
        <circle cx="95" cy="225" r="2" />
        <circle cx="108" cy="215" r="2.2" />
        <circle cx="125" cy="202" r="2.6" />
        <circle cx="142" cy="215" r="2.2" />
        <circle cx="155" cy="225" r="2" />
        <circle cx="118" cy="225" r="2" />
        <circle cx="132" cy="225" r="2" />
        <circle cx="125" cy="172" r="2.5" />
        <circle cx="115" cy="180" r="2.2" />
        <circle cx="135" cy="180" r="2.2" />
      </g>
    </svg>
  )
}

export function WaxSealStamp({ initials = 'S & R', className = 'w-16 h-16' }: { initials?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-[#802020] via-[#9e2a2b] to-[#5a1314] text-[#fbeee0] shadow-xl border border-[#b34040]/40 ${className}`}>
      {/* Outer scalloped ring */}
      <div className="absolute inset-1 rounded-full border border-dashed border-[#e6b87d]/50 pointer-events-none" />
      <div className="absolute inset-2.5 rounded-full border border-[#f3cca0]/30 pointer-events-none" />
      <div className="text-center font-serif tracking-widest text-xs font-bold text-[#f5ebd9] drop-shadow">
        {initials}
      </div>
    </div>
  )
}
