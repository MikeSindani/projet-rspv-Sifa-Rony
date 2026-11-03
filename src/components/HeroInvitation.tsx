import React from 'react'
import { DriedFlowerBotanical } from './WeddingIcons'
import { Calendar, MapPin, Clock, Heart, Sparkles, ChevronDown } from 'lucide-react'

export function HeroInvitation() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative mx-auto max-w-4xl px-4 pt-10 pb-16">
      {/* Background card mimicking the fine luxury paper from the PDF */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#b68d40]/30 bg-gradient-to-b from-[#faf6ef] via-[#f7f1e7] to-[#f2e8d9] p-8 sm:p-14 shadow-2xl">
        {/* Subtle decorative inner border */}
        <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-[#b68d40]/20" />
        <div className="pointer-events-none absolute inset-6 rounded-[1.7rem] border border-[#b68d40]/10" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* LEFT: Dried Botanical Flower matching PDF Page 1 */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div className="relative w-48 sm:w-64 max-w-full drop-shadow-md transition-transform duration-700 hover:scale-105">
              <DriedFlowerBotanical className="w-full h-auto" />
            </div>
          </div>

          {/* RIGHT: Typography & Content matching PDF Page 1 */}
          <div className="md:col-span-7 flex flex-col justify-between">
            {/* Top Right: Vertical Date & separator line */}
            <div className="flex justify-end mb-8">
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-center font-serif text-3xl sm:text-4xl font-light tracking-widest text-[#231f20] leading-none">
                  <span className="py-0.5">26</span>
                  <span className="py-0.5">12</span>
                  <span className="py-0.5">26</span>
                </div>
                {/* Vertical accent line from PDF */}
                <div className="h-28 w-[1.5px] bg-[#231f20]" />
              </div>
            </div>

            {/* "On se dit oui." script title */}
            <div className="my-6">
              <h1 className="font-script text-6xl sm:text-8xl text-[#231f20] leading-none tracking-normal">
                On se dit oui.
              </h1>

              {/* Poetic invitation quote */}
              <p className="mt-6 font-serif italic text-lg sm:text-xl text-[#5e5953] leading-relaxed">
                Ensemble, nous avons choisi de débuter notre aventure. Rejoignez-nous pour célébrer notre amour le jour de notre mariage.
              </p>
            </div>

            {/* Time & Place Details from PDF */}
            <div className="mt-8 space-y-2 border-t border-[#b68d40]/25 pt-6">
              <div className="flex items-center gap-2 font-serif text-lg text-[#231f20]">
                <Clock className="h-4 w-4 text-[#a65b32]" />
                <span className="font-medium">à 19h00</span>
              </div>

              <div className="flex items-center gap-2 font-serif text-base text-[#5e5953]">
                <MapPin className="h-4 w-4 text-[#a65b32]" />
                <span>20 avenue LOFOI, Lubumbashi</span>
              </div>
            </div>

            {/* Couple Signature from PDF */}
            <div className="mt-8 flex items-center justify-between">
              <div>
                <p className="font-serif text-lg sm:text-xl tracking-[0.25em] uppercase font-bold text-[#231f20]">
                  SIFA ET RONY
                </p>
                <p className="text-[11px] font-sans uppercase tracking-widest text-[#a65b32] font-semibold mt-0.5">
                  Lubumbashi • 2026
                </p>
              </div>

              <button
                onClick={() => scrollTo('receptions-section')}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-[#b68d40]/40 bg-white/80 shadow-md backdrop-blur transition-all hover:bg-[#b68d40] hover:text-white"
                title="Découvrir le programme"
              >
                <ChevronDown className="h-5 w-5 text-[#231f20] group-hover:text-white group-hover:translate-y-0.5 transition" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
