import React from 'react'
import { WeddingRingsIcon } from './WeddingIcons'
import { Heart, Phone, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="mt-24 border-t border-[#b68d40]/20 bg-[#f5ede3] px-4 py-16 text-[#5e5953]">
      <div className="mx-auto max-w-4xl text-center">
        {/* Intertwined rings */}
        <div className="mx-auto mb-4 flex justify-center text-[#231f20]">
          <WeddingRingsIcon className="h-10 w-16" />
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-light tracking-wide text-[#231f20] uppercase">
          SIFA & RONY
        </h3>

        <p className="mt-2 font-serif italic text-base text-[#5e5953] max-w-md mx-auto">
          « L'amour ne donne rien que lui-même, et ne prend rien que de lui-même. »
        </p>

        <div className="mx-auto my-6 h-[1px] w-20 bg-[#b68d40]/40" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto text-xs font-serif mb-8 text-[#231f20]">
          <div className="rounded-xl bg-white/70 p-3 border border-[#b68d40]/20">
            <p className="uppercase tracking-widest text-[10px] text-[#a65b32] font-bold">
              Famille A TSHIKWAND
            </p>
            <p className="text-sm font-semibold mt-0.5">Tél : 0970519974</p>
          </div>
          <div className="rounded-xl bg-white/70 p-3 border border-[#b68d40]/20">
            <p className="uppercase tracking-widest text-[10px] text-[#a65b32] font-bold">
              Famille KALINDA
            </p>
            <p className="text-sm font-semibold mt-0.5">Tél : 0972747664</p>
          </div>
        </div>

        <p className="font-serif text-xs uppercase tracking-widest text-[#a65b32] font-bold mb-4">
          Samedi 26 Décembre 2026 • Lubumbashi
        </p>

        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 rounded-full border border-[#231f20]/20 bg-white/80 px-4 py-2 font-serif text-xs uppercase tracking-widest text-[#231f20] shadow-sm hover:bg-white transition"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>Haut de page</span>
          </button>
        </div>

        <p className="text-xs text-[#5e5953]/80">
          Créé avec soin pour le mariage de Sifa Djuma et Rony Kaleng • TanStack Start RSVP
        </p>
      </div>
    </footer>
  )
}
