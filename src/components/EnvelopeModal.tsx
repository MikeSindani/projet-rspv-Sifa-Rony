import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Sparkles, Mail, Eye, RotateCcw, Heart, ArrowDown } from 'lucide-react'
import { DriedFlowerBotanical, WeddingRingsIcon } from './WeddingIcons'

interface EnvelopeProps {
  onExploreDetails?: () => void
}

export function EnvelopeModal({ onExploreDetails }: EnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  const handleOpen = () => {
    if (!isOpen) {
      // Fire subtle luxury golden confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#b68d40', '#d4af37', '#e9dfd1', '#a65b32', '#ffffff'],
        })
      } catch (e) {
        // Safe fallback if window/canvas not ready
      }
    }
    setIsOpen(!isOpen)
    setHasInteracted(true)
  }

  const handleScrollToRSVP = () => {
    const el = document.getElementById('rsvp-section')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative my-8 flex flex-col items-center justify-center px-4">
      {/* Action Bar / Status banner */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleOpen}
          className="group inline-flex items-center gap-2 rounded-full border border-[#b68d40]/40 bg-[#faf7f2]/90 px-6 py-2.5 font-serif text-sm tracking-widest uppercase text-[#231f20] shadow-md backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-[#b68d40] hover:text-white"
        >
          {isOpen ? (
            <>
              <RotateCcw className="h-4 w-4 transition-transform group-hover:-rotate-90" />
              <span>Refermer l'enveloppe</span>
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 text-[#b68d40] group-hover:text-white animate-pulse" />
              <span>Ouvrir l'enveloppe officielle</span>
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
            </>
          )}
        </button>

        {isOpen && (
          <button
            onClick={handleScrollToRSVP}
            className="inline-flex items-center gap-2 rounded-full border border-[#a65b32]/40 bg-[#a65b32] px-6 py-2.5 font-serif text-sm tracking-widest uppercase text-white shadow-md transition-all duration-300 hover:bg-[#884622] hover:scale-105"
          >
            <Heart className="h-4 w-4 fill-white" />
            <span>Confirmer ma présence (RSVP)</span>
            <ArrowDown className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 3D Envelope container */}
      <div className="perspective-1000 w-full max-w-xl transition-all duration-700">
        <div
          onClick={handleOpen}
          className={`relative mx-auto cursor-pointer transition-all duration-700 ${
            isOpen ? 'pb-24 sm:pb-32' : 'hover:scale-[1.01]'
          }`}
        >
          {/* THE ENVELOPE BACK / BODY */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-[#d8c9b5] bg-gradient-to-b from-[#eadecc] to-[#ded0bc] p-6 shadow-2xl transition-all duration-700">
            {/* Fine border inside envelope */}
            <div className="pointer-events-none absolute inset-3 rounded-xl border border-dashed border-[#bfae98]/50" />

            {/* Top envelope flap (Animates open / unfolds upward) */}
            <div
              className={`absolute top-0 left-0 right-0 z-30 origin-top transition-transform duration-1000 ease-in-out ${
                isOpen
                  ? '[transform:rotateX(180deg)] pointer-events-none opacity-0'
                  : '[transform:rotateX(0deg)]'
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 55%)',
                height: '100%',
                background: 'linear-gradient(180deg, #f0e6d6 0%, #dfd1be 100%)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
              }}
            >
              <div className="absolute inset-0 border-b border-[#cca777]/30" />
            </div>

            {/* WAX SEAL (Centered on closed flap) */}
            {!isOpen && (
              <div className="absolute top-[48%] left-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform transition-transform duration-300 hover:scale-110">
                <div className="group relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#802020] via-[#9e2a2b] to-[#5a1314] text-[#fbeee0] shadow-2xl ring-4 ring-[#b68d40]/30 animate-pulse-subtle">
                  <div className="absolute inset-1.5 rounded-full border border-dashed border-[#e6b87d]/60 pointer-events-none" />
                  <div className="flex flex-col items-center">
                    <span className="font-serif text-sm tracking-widest font-bold">S & R</span>
                    <span className="text-[9px] tracking-widest uppercase opacity-80">26.12.26</span>
                  </div>
                  <div className="absolute -bottom-8 rounded-full bg-black/60 px-3 py-0.5 text-[10px] tracking-wider uppercase text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 whitespace-nowrap">
                    Cliquer pour ouvrir
                  </div>
                </div>
              </div>
            )}

            {/* Left & Right Fold Decorative Triangles */}
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                clipPath: 'polygon(0 0, 48% 50%, 0 100%)',
                background: 'linear-gradient(90deg, #dfd1be 0%, #d4c5af 100%)',
                opacity: isOpen ? 0.35 : 0.85,
                transition: 'opacity 0.7s',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                clipPath: 'polygon(100% 0, 52% 50%, 100% 100%)',
                background: 'linear-gradient(270deg, #dfd1be 0%, #d4c5af 100%)',
                opacity: isOpen ? 0.35 : 0.85,
                transition: 'opacity 0.7s',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)',
                background: 'linear-gradient(0deg, #e4d7c6 0%, #d8c8b2 100%)',
                opacity: isOpen ? 0.4 : 0.9,
                transition: 'opacity 0.7s',
              }}
            />

            {/* THE INVITATION CARD (SLIDES OUT OF ENVELOPE) */}
            <div
              className={`relative z-10 transition-all duration-1000 ease-out ${
                isOpen
                  ? 'translate-y-0 opacity-100 scale-100'
                  : 'translate-y-8 opacity-20 scale-95 blur-[1px]'
              }`}
            >
              {/* Luxury Card Surface */}
              <div className="relative rounded-xl border border-[#b68d40]/30 bg-[#faf7f2] p-6 sm:p-10 shadow-2xl text-[#231f20]">
                {/* Thin inner golden border */}
                <div className="pointer-events-none absolute inset-3 rounded-lg border border-[#b68d40]/25" />
                <div className="pointer-events-none absolute inset-4 rounded-md border border-[#b68d40]/10" />

                {/* Card Header with Vertical Date & Botanical Floral Element */}
                <div className="relative flex justify-between items-start gap-4">
                  {/* Left flower art snippet */}
                  <div className="w-24 sm:w-32 -mt-4 -ml-2">
                    <DriedFlowerBotanical className="w-full h-auto drop-shadow-sm opacity-90" />
                  </div>

                  {/* Right Vertical Date matching PDF Page 1 */}
                  <div className="flex flex-col items-end">
                    <div className="flex flex-col items-center border-l-2 border-[#231f20] pl-3 py-1 font-serif text-2xl sm:text-3xl font-light tracking-widest text-[#231f20]">
                      <span className="leading-tight">26</span>
                      <span className="leading-tight">12</span>
                      <span className="leading-tight">26</span>
                    </div>
                  </div>
                </div>

                {/* "On se dit oui." script from PDF */}
                <div className="my-6 text-center sm:text-left">
                  <h2 className="font-script text-5xl sm:text-6xl text-[#231f20] leading-none mb-3">
                    On se dit oui.
                  </h2>
                  <p className="font-serif italic text-base sm:text-lg text-[#5e5953] leading-relaxed max-w-md">
                    « Ensemble, nous avons choisi de débuter notre aventure. Rejoignez-nous pour célébrer notre amour le jour de notre mariage. »
                  </p>
                </div>

                {/* Date, Time & Location highlights */}
                <div className="mt-8 pt-6 border-t border-[#b68d40]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-xs uppercase tracking-widest text-[#a65b32] font-semibold">
                      Réception & Soirée
                    </p>
                    <p className="font-serif text-base font-medium text-[#231f20]">
                      à 19h00
                    </p>
                    <p className="text-xs text-[#5e5953]">
                      20 avenue LOFOI, Lubumbashi
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-serif text-sm tracking-widest uppercase font-bold text-[#231f20]">
                      SIFA ET RONY
                    </p>
                    <span className="inline-block mt-1 text-[11px] font-sans uppercase tracking-wider text-[#a65b32] bg-[#a65b32]/10 px-3 py-0.5 rounded-full font-medium">
                      RSVP avant le 30 Nov 2026
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Click prompt overlay when closed */}
            {!isOpen && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-transparent">
                <div className="mt-40 rounded-full bg-[#231f20]/80 px-5 py-2 font-serif text-xs tracking-widest uppercase text-white shadow-xl backdrop-blur transition-all duration-300 hover:bg-[#231f20] hover:scale-105 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-[#d4af37]" />
                  <span>Cliquer pour ouvrir le faire-part</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
