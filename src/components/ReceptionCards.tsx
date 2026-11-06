import React, { useState } from 'react'
import {
  ChurchIcon,
  WeddingCakeIcon,
  WeddingRingsIcon,
  TownHallIcon,
} from './WeddingIcons'
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Sparkles,
  Calendar,
  Heart,
  Palette,
  Users,
  Info,
} from 'lucide-react'

export function ReceptionCards() {
  const [activeTab, setActiveTab] = useState<'all' | 'civil' | 'ceremony' | 'reception' | 'practical'>('all')

  return (
    <section id="receptions-section" className="relative my-16 px-4">
      <div className="mx-auto max-w-5xl">
        {/* Header with intertwined rings matching PDF Page 2 */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-3 flex items-center justify-center text-[#231f20]">
            <WeddingRingsIcon className="h-16 w-24 text-[#231f20] hover:scale-110 transition-transform" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-wide text-[#231f20] uppercase">
            SIFA & RONY
          </h2>

          <div className="mx-auto my-4 h-[1px] w-24 bg-[#b68d40]/60" />

          {/* Families invitation quote matching PDF */}
          <p className="mx-auto max-w-2xl font-serif text-base sm:text-lg leading-relaxed text-[#5e5953]">
            Les familles <span className="font-semibold text-[#231f20]">A TSHIKWAND</span> et{' '}
            <span className="font-semibold text-[#231f20]">KALINDA</span> ont le plaisir de vous convier à l'union de leurs enfants
          </p>

          <p className="mt-2 font-serif text-xl sm:text-2xl font-medium tracking-wide text-[#a65b32]">
            Rony Kaleng et Sifa Djuma
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b68d40]/40 bg-[#faf7f2] px-5 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-[#b68d40]" />
              <span className="font-serif text-sm sm:text-base font-medium text-[#231f20]">
                Civil : Jeudi 24 Décembre 2026 à 11h
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#b68d40]/40 bg-[#faf7f2] px-5 py-2 shadow-sm">
              <Calendar className="h-4 w-4 text-[#b68d40]" />
              <span className="font-serif text-sm sm:text-base font-medium text-[#231f20]">
                Célébration : Samedi 26 Décembre 2026
              </span>
            </div>
          </div>

          {/* Timeline Bar matching celebrations */}
          <div className="relative mx-auto mt-12 max-w-2xl px-4">
            <div className="relative flex items-center justify-between">
              {/* Connecting line */}
              <div className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 bg-[#231f20]/60" />

              {/* Point 1: 24 Déc 11H00 */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#231f20] mb-2 bg-[#faf7f2] px-2 text-center">
                  24 Déc • 11H
                </span>
                <div className="h-4 w-4 rounded-full border-2 border-[#b68d40] bg-[#b68d40]" />
                <span className="mt-2 text-[11px] font-serif uppercase tracking-wider text-[#5e5953] bg-[#faf7f2] px-2">
                  Mariage Civil
                </span>
              </div>

              {/* Point 2: 26 Déc 15H00 */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#231f20] mb-2 bg-[#faf7f2] px-2 text-center">
                  26 Déc • 15H
                </span>
                <div className="h-4 w-4 rounded-full border-2 border-[#231f20] bg-[#faf7f2]" />
                <span className="mt-2 text-[11px] font-serif uppercase tracking-wider text-[#5e5953] bg-[#faf7f2] px-2">
                  Église
                </span>
              </div>

              {/* Point 3: 26 Déc 19H30 */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-serif text-xs sm:text-sm font-bold text-[#231f20] mb-2 bg-[#faf7f2] px-2 text-center">
                  26 Déc • 19H30
                </span>
                <div className="h-4 w-4 rounded-full border-2 border-[#231f20] bg-[#faf7f2]" />
                <span className="mt-2 text-[11px] font-serif uppercase tracking-wider text-[#5e5953] bg-[#faf7f2] px-2">
                  Réception
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter / Navigation tabs */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: 'Tout le programme' },
            { id: 'civil', label: '24 Déc. 11h - Civil' },
            { id: 'ceremony', label: '26 Déc. 15h - Église' },
            { id: 'reception', label: '26 Déc. 19h30 - Soirée' },
            { id: 'practical', label: 'Infos & Contacts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-full px-4 py-2 font-serif text-xs tracking-wider uppercase transition-all duration-300 ${
                activeTab === tab.id
                  ? 'border border-[#b68d40] bg-[#b68d40] text-white shadow-sm'
                  : 'border border-[#231f20]/15 bg-white/60 text-[#5e5953] hover:bg-white hover:text-[#231f20]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* CARDS GRID */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* CARTE 0: MARIAGE CIVIL (au-dessus de l'église) */}
          {(activeTab === 'all' || activeTab === 'civil') && (
            <div className="group relative overflow-hidden rounded-2xl border border-[#b68d40]/30 bg-white/90 p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:col-span-2">
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#b68d40]/10 blur-xl group-hover:bg-[#b68d40]/20 transition-all" />
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-full bg-[#b68d40]/15 px-3 py-1 font-serif text-xs font-semibold uppercase tracking-widest text-[#a65b32]">
                    Étape 1 • Jeudi 24 Décembre 2026 à 11h00
                  </span>
                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#231f20]">
                    Mariage Civil
                  </h3>
                </div>

                <div className="rounded-xl border border-[#b68d40]/20 bg-[#faf7f2] p-3 text-[#231f20] transition-transform group-hover:scale-105">
                  <TownHallIcon className="h-16 w-16" />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-[#faf7f2] p-4 border border-[#b68d40]/15">
                  <p className="text-[11px] font-serif uppercase tracking-widest text-[#a65b32] font-bold">
                    Lieu de l'union civile
                  </p>
                  <p className="font-serif text-lg font-semibold text-[#231f20]">
                    AVENUE ROUSSEL N° 7, PLATEAU KARAVIA
                  </p>
                  <p className="text-xs font-medium text-[#a65b32] mt-0.5">
                    Réf. Kin Marché
                  </p>
                  <p className="text-xs text-[#5e5953] flex items-center gap-1.5 mt-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#a65b32] flex-shrink-0" />
                    <span>Lubumbashi, République Démocratique du Congo</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5e5953]">
                  <Clock className="h-4 w-4 text-[#b68d40]" />
                  <span>Célébration officielle de l'union civile à 11h00</span>
                </div>

                <div className="rounded-xl border border-[#b68d40]/25 bg-[#faf7f2] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-[#a65b32]" />
                      <span className="font-serif text-xs font-bold text-[#231f20] uppercase tracking-wide">
                        Thème : Fluo Tropicale
                      </span>
                    </div>
                    <span className="text-[11px] font-serif text-[#a65b32] font-semibold">Palette de Couleurs</span>
                  </div>
                  <div className="mt-3 overflow-hidden rounded-lg border border-[#b68d40]/20 shadow-sm max-w-sm">
                    <img
                      src="/theme-civil-fluo-tropicale.jpg"
                      alt="Thème Mariage Civil - Fluo Tropicale"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#b68d40]/20 flex flex-wrap gap-2">
                <a
                  href="https://maps.google.com/?q=Avenue+Roussel+Lubumbashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#231f20]/20 bg-white px-4 py-2 text-xs font-serif uppercase tracking-wider text-[#231f20] shadow-sm transition hover:bg-[#231f20] hover:text-white"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Itinéraire GPS</span>
                </a>
                <a
                  href="#rsvp-section"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#b68d40] bg-[#b68d40]/10 px-4 py-2 text-xs font-serif uppercase tracking-wider text-[#a65b32] transition hover:bg-[#b68d40] hover:text-white"
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>Confirmer pour le civil</span>
                </a>
              </div>
            </div>
          )}
          {/* CARTE 1: CÉRÉMONIE À L'ÉGLISE */}
          {(activeTab === 'all' || activeTab === 'ceremony') && (
            <div className="group relative overflow-hidden rounded-2xl border border-[#b68d40]/30 bg-white/90 p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#b68d40]/10 blur-xl group-hover:bg-[#b68d40]/20 transition-all" />
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-full bg-[#b68d40]/15 px-3 py-1 font-serif text-xs font-semibold uppercase tracking-widest text-[#a65b32]">
                    Étape 1 • 15h00
                  </span>
                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#231f20]">
                    Cérémonie à l'église
                  </h3>
                </div>

                {/* Church Line Art Icon matching PDF */}
                <div className="rounded-xl border border-[#b68d40]/20 bg-[#faf7f2] p-3 text-[#231f20] transition-transform group-hover:scale-105">
                  <ChurchIcon className="h-16 w-16" />
                </div>
              </div>

              {/* Church Details matching PDF */}
              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-[#faf7f2] p-4 border border-[#b68d40]/15">
                  <p className="text-[11px] font-serif uppercase tracking-widest text-[#a65b32] font-bold">
                    Lieu Sacré
                  </p>
                  <p className="font-serif text-lg font-semibold text-[#231f20]">
                    ÉGLISE PAROISSE SAINT LAURENT
                  </p>
                  <p className="text-xs text-[#5e5953] flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-[#a65b32] flex-shrink-0" />
                    <span>Lubumbashi, République Démocratique du Congo</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5e5953]">
                  <Clock className="h-4 w-4 text-[#b68d40]" />
                  <span>Installation des invités dès 14h30 • Début de l'office à 15h00 pile</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-6 border-t border-[#b68d40]/20 flex flex-wrap gap-2">
                <a
                  href="https://maps.google.com/?q=Paroisse+Saint+Laurent+Lubumbashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#231f20]/20 bg-white px-4 py-2 text-xs font-serif uppercase tracking-wider text-[#231f20] shadow-sm transition hover:bg-[#231f20] hover:text-white"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Itinéraire GPS</span>
                </a>
                <a
                  href="#rsvp-section"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#b68d40] bg-[#b68d40]/10 px-4 py-2 text-xs font-serif uppercase tracking-wider text-[#a65b32] transition hover:bg-[#b68d40] hover:text-white"
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>Confirmer pour la messe</span>
                </a>
              </div>
            </div>
          )}

          {/* CARTE 2: DÎNER ET SOIRÉE DANSANTE */}
          {(activeTab === 'all' || activeTab === 'reception') && (
            <div className="group relative overflow-hidden rounded-2xl border border-[#b68d40]/30 bg-white/90 p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[#a65b32]/10 blur-xl group-hover:bg-[#a65b32]/20 transition-all" />

              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block rounded-full bg-[#a65b32]/15 px-3 py-1 font-serif text-xs font-semibold uppercase tracking-widest text-[#a65b32]">
                    Étape 2 • 19h30
                  </span>
                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl font-medium text-[#231f20]">
                    Dîner et soirée dansante
                  </h3>
                </div>

                {/* Wedding Cake Line Art Icon matching PDF */}
                <div className="rounded-xl border border-[#b68d40]/20 bg-[#faf7f2] p-3 text-[#231f20] transition-transform group-hover:scale-105">
                  <WeddingCakeIcon className="h-16 w-16" />
                </div>
              </div>

              {/* Reception Details matching PDF */}
              <div className="mt-6 space-y-3">
                <div className="rounded-lg bg-[#faf7f2] p-4 border border-[#b68d40]/15">
                  <p className="text-[11px] font-serif uppercase tracking-widest text-[#a65b32] font-bold">
                    Lieu de la Réception
                  </p>
                  <p className="font-serif text-lg font-semibold text-[#231f20]">
                    20 AVENUE LOFOI
                  </p>
                  <p className="text-xs text-[#5e5953] flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3.5 w-3.5 text-[#a65b32] flex-shrink-0" />
                    <span>Lubumbashi, République Démocratique du Congo</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#5e5953]">
                  <Sparkles className="h-4 w-4 text-[#b68d40]" />
                  <span>Cocktail de bienvenue dès 19h00 • Dîner gastronomique, gâteau & soirée dansante</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-6 border-t border-[#b68d40]/20 flex flex-wrap gap-2">
                <a
                  href="https://maps.google.com/?q=20+avenue+LOFOI+Lubumbashi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#231f20]/20 bg-white px-4 py-2 text-xs font-serif uppercase tracking-wider text-[#231f20] shadow-sm transition hover:bg-[#231f20] hover:text-white"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>Itinéraire GPS</span>
                </a>
                <a
                  href="#rsvp-section"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#a65b32] bg-[#a65b32] px-4 py-2 text-xs font-serif uppercase tracking-wider text-white shadow-sm transition hover:bg-[#884622]"
                >
                  <Heart className="h-3.5 w-3.5 fill-white" />
                  <span>Confirmer pour la soirée</span>
                </a>
              </div>
            </div>
          )}

          {/* CARTE 3: DRESS CODE */}
          {(activeTab === 'all' || activeTab === 'practical') && (
            <div className="relative overflow-hidden rounded-2xl border border-[#b68d40]/25 bg-gradient-to-br from-[#faf7f2] to-[#f4ece0] p-8 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#a65b32] font-serif text-xs font-semibold uppercase tracking-widest mb-3">
                  <Palette className="h-4 w-4" />
                  <span>Tenue Souhaitée</span>
                </div>

                <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#231f20] mb-4">
                  Chic et élégant en tenue de soirée
                </h4>

                <p className="font-serif text-sm text-[#5e5953] leading-relaxed">
                  Pour célébrer notre union et partager ces moments inoubliables, nous vous invitons à arborer une tenue chic et élégante en tenue de soirée.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#b68d40]/20 flex items-center gap-2 text-xs text-[#5e5953]">
                <Sparkles className="h-4 w-4 text-[#b68d40] flex-shrink-0" />
                <span>Nous avons hâte de célébrer cette journée magique en votre compagnie.</span>
              </div>
            </div>
          )}

          {/* CARTE 4: CONTACTS & ASSISTANCE FAMILLES */}
          {(activeTab === 'all' || activeTab === 'practical') && (
            <div className="relative overflow-hidden rounded-2xl border border-[#b68d40]/25 bg-gradient-to-br from-[#faf7f2] to-[#f4ece0] p-8 shadow-lg">
              <div className="flex items-center gap-2 text-[#a65b32] font-serif text-xs font-semibold uppercase tracking-widest mb-3">
                <Users className="h-4 w-4" />
                <span>Contacts & RSVP</span>
              </div>

              <h4 className="font-serif text-2xl font-normal text-[#231f20] mb-2">
                Familles A Tshikwand & Kalinda
              </h4>

              <p className="font-serif text-sm text-[#5e5953] leading-relaxed mb-4">
                Pour toute question, confirmation directe ou renseignement logistique, n'hésitez pas à joindre nos coordinateurs :
              </p>

              {/* Phone numbers directly from PDF */}
              <div className="space-y-3 mb-6">
                {[
                  { phone: '0970519974', intl: '+243970519974', label: 'Contact Famille A Tshikwand' },
                  { phone: '0972747664', intl: '+243972747664', label: 'Contact Famille Kalinda' },
                ].map((contact, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-white/80 p-3.5 border border-[#b68d40]/20 shadow-sm"
                  >
                    <div>
                      <p className="text-[10px] font-serif uppercase tracking-wider text-[#a65b32]">
                        {contact.label}
                      </p>
                      <p className="font-serif text-lg font-bold text-[#231f20] tracking-wider">
                        {contact.phone}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`tel:${contact.intl}`}
                        className="rounded-full bg-[#231f20] p-2 text-white hover:bg-[#a65b32] transition"
                        title="Appeler"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                      <a
                        href={`https://wa.me/${contact.intl.replace('+', '')}?text=${encodeURIComponent(
                          'Bonjour, je vous contacte concernant le mariage de Sifa & Rony le 26 décembre 2026.',
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#25D366] p-2 text-white hover:opacity-90 transition"
                        title="Message WhatsApp"
                      >
                        <span className="font-sans text-xs font-bold px-0.5">WA</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <span className="inline-block rounded-full bg-[#802020]/10 px-4 py-1 text-xs font-serif font-bold uppercase tracking-widest text-[#802020]">
                  RSVP AVANT LE 30 NOVEMBRE 2026
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
