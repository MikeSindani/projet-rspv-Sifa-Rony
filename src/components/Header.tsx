import React, { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Heart, Menu, X, Phone, Calendar, Mail } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#b68d40]/20 bg-[#faf7f2]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:py-4">
        {/* Monogram / Brand */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-decoration-none group"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#802020] to-[#5a1314] text-[#fbeee0] shadow-sm font-serif font-bold text-xs ring-2 ring-[#b68d40]/40 group-hover:scale-105 transition-transform">
              S & R
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base font-semibold tracking-wider text-[#231f20] leading-none">
                SIFA & RONY
              </span>
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#a65b32] mt-0.5">
                26 • 12 • 2026
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-serif text-xs uppercase tracking-widest text-[#5e5953]">
          <button
            onClick={() => scrollTo('hero-section')}
            className="hover:text-[#231f20] transition"
          >
            Faire-Part
          </button>
          <button
            onClick={() => scrollTo('envelope-section')}
            className="hover:text-[#231f20] transition"
          >
            Enveloppe
          </button>
          <button
            onClick={() => scrollTo('receptions-section')}
            className="hover:text-[#231f20] transition"
          >
            Programme & Réceptions
          </button>
          <button
            onClick={() => scrollTo('rsvp-section')}
            className="hover:text-[#231f20] transition"
          >
            RSVP (Google Form)
          </button>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollTo('rsvp-section')}
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-[#a65b32] bg-[#a65b32] px-4 py-1.5 font-serif text-xs uppercase tracking-wider text-white shadow-sm transition hover:bg-[#884622] hover:scale-105"
          >
            <Heart className="h-3.5 w-3.5 fill-white" />
            <span>Confirmer (RSVP)</span>
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden rounded-lg p-2 text-[#231f20] hover:bg-black/5"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#b68d40]/20 bg-[#faf7f2] px-6 py-4 shadow-lg">
          <div className="flex flex-col gap-3 font-serif text-sm tracking-wider uppercase text-[#231f20]">
            <button
              onClick={() => scrollTo('hero-section')}
              className="text-left py-2 border-b border-black/5"
            >
              Faire-Part
            </button>
            <button
              onClick={() => scrollTo('envelope-section')}
              className="text-left py-2 border-b border-black/5"
            >
              L'Enveloppe Interactive
            </button>
            <button
              onClick={() => scrollTo('receptions-section')}
              className="text-left py-2 border-b border-black/5"
            >
              Programme des Réceptions
            </button>
            <button
              onClick={() => scrollTo('rsvp-section')}
              className="text-left py-2 text-[#a65b32] font-bold"
            >
              Confirmer sa présence (RSVP)
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
