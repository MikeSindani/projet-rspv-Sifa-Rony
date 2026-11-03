import { createFileRoute } from '@tanstack/react-router'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import {
  DriedFlowerBotanical,
  WeddingRingsIcon,
  ChurchIcon,
  WeddingCakeIcon,
} from '../components/WeddingIcons'
import {
  Heart,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Calendar,
  Check,
  MessageSquare,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react'
import { FloatingPetals } from '../components/FloatingPetals'

export const Route = createFileRoute('/')({ component: WeddingApp })

/* ═══════════════════════════════════════════════════════════════════════════
   AUDIO ENGINE  (piano doux, démarré par le geste utilisateur)
   ═══════════════════════════════════════════════════════════════════════════ */
function useAmbiance() {
  const ctxRef = useRef<AudioContext | null>(null)
  const playingRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [playing, setPlaying] = useState(false)

  /* Accords romantiques Canon-in-D / valse */
  const CHORDS = [
    [261.63, 329.63, 392.0, 523.25],   // C maj
    [220.0,  277.18, 329.63, 440.0],   // A min
    [174.61, 220.0,  261.63, 349.23],  // F maj
    [196.0,  246.94, 293.66, 392.0],   // G maj
    [261.63, 311.13, 392.0, 523.25],   // C maj7
    [220.0,  261.63, 329.63, 440.0],   // A min7
  ]

  const playChord = useCallback((freqs: number[]) => {
    const ctx = ctxRef.current
    if (!ctx || !playingRef.current) return
    freqs.forEach((freq, i) => {
      setTimeout(() => {
        if (!playingRef.current || !ctx) return
        const osc  = ctx.createOscillator()
        const gain = ctx.createGain()
        const filt = ctx.createBiquadFilter()
        filt.type = 'lowpass'
        filt.frequency.value = 1800
        osc.type = 'triangle'
        osc.frequency.value = freq
        gain.gain.setValueAtTime(0.001, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.055, ctx.currentTime + 0.08)
        gain.gain.exponentialRampToValueAtTime(0.022, ctx.currentTime + 1.2)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2)
        osc.connect(filt)
        filt.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 3.4)
      }, i * 150)
    })
  }, [])

  const loop = useCallback((step = 0) => {
    if (!playingRef.current) return
    playChord(CHORDS[step % CHORDS.length])
    timerRef.current = setTimeout(() => loop(step + 1), 3500)
  }, [playChord])

  const startAmbiance = useCallback(() => {
    if (playingRef.current) return
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext
      ctxRef.current = new Ctx()
    }
    if (ctxRef.current.state === 'suspended') ctxRef.current.resume()
    playingRef.current = true
    setPlaying(true)
    loop(0)
  }, [loop])

  const toggleAmbiance = useCallback(() => {
    if (playing) {
      playingRef.current = false
      setPlaying(false)
      if (timerRef.current) clearTimeout(timerRef.current)
    } else {
      startAmbiance()
    }
  }, [playing, startAmbiance])

  useEffect(() => {
    return () => {
      playingRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return { playing, startAmbiance, toggleAmbiance }
}

/* ═══════════════════════════════════════════════════════════════════════════
   ORCHESTRATEUR PRINCIPAL
   ═══════════════════════════════════════════════════════════════════════════ */
function WeddingApp() {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed')
  const invitationRef = useRef<HTMLDivElement>(null)
  const { playing, startAmbiance, toggleAmbiance } = useAmbiance()

  const handleEnvelopeClick = () => {
    if (phase !== 'closed') return
    setPhase('opening')

    /* Lance la musique dès le premier geste */
    startAmbiance()

    /* Confettis dorés */
    try {
      confetti({
        particleCount: 90,
        spread: 110,
        origin: { y: 0.45 },
        colors: ['#b68d40', '#d4af37', '#f5edd6', '#a65b32', '#fff8ee'],
        scalar: 1.15,
        gravity: 0.8,
      })
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 50,
          origin: { x: 0, y: 0.5 },
          colors: ['#b68d40', '#d4af37', '#f5edd6'],
        })
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 50,
          origin: { x: 1, y: 0.5 },
          colors: ['#b68d40', '#d4af37', '#f5edd6'],
        })
      }, 400)
    } catch {}

    /* Transition → invitation avec défilement automatique */
    setTimeout(() => {
      setPhase('open')
      /* Défile vers l'invitation après son apparition */
      setTimeout(() => {
        invitationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }, 1600)
  }

  return (
    <div
      className="relative overflow-x-hidden"
      style={{
        background:
          'linear-gradient(155deg, #faf4ea 0%, #f2e4cc 40%, #ece0cf 70%, #e4d4bc 100%)',
        minHeight: '100vh',
      }}
    >
      <FloatingPetals />

      {/* ── Scène enveloppe ── */}
      <EnvelopeScene
        phase={phase}
        onClick={handleEnvelopeClick}
      />

      {/* ── Invitation (montée douce après ouverture) ── */}
      {phase === 'open' && (
        <div
          ref={invitationRef}
          style={{ animation: 'riseInvitation 1s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          <InvitationPage />
        </div>
      )}

      {/* ── Bouton musique flottant ── */}
      {phase === 'open' && (
        <button
          onClick={toggleAmbiance}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border px-4 py-2.5 font-serif text-xs uppercase tracking-wider shadow-2xl backdrop-blur transition-all duration-300"
          style={{
            background: playing ? '#b68d40' : 'rgba(255,250,244,0.92)',
            border: `1px solid ${playing ? '#b68d40' : 'rgba(182,141,64,0.45)'}`,
            color: playing ? '#fff' : '#231f20',
            boxShadow: playing
              ? '0 0 0 4px rgba(182,141,64,0.22), 0 8px 24px rgba(0,0,0,0.15)'
              : '0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          {playing ? (
            <Volume2 className="h-4 w-4" style={{ animation: 'pulse 1.5s infinite' }} />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
          <span>{playing ? 'Musique active' : 'Musique'}</span>
        </button>
      )}

      <style>{`
        @keyframes riseInvitation {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCÈNE ENVELOPPE — plein écran, belle perspective
   ═══════════════════════════════════════════════════════════════════════════ */
function EnvelopeScene({
  phase,
  onClick,
}: {
  phase: 'closed' | 'opening' | 'open'
  onClick: () => void
}) {
  const isOpening = phase === 'opening'
  const isDone    = phase === 'open'

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-16"
      style={{
        /* Reste visible pendant l'ouverture puis disparaît */
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        opacity: isDone ? 0 : 1,
        pointerEvents: isDone ? 'none' : 'auto',
        position: isDone ? 'absolute' : 'relative',
        inset: isDone ? 0 : 'auto',
      }}
    >
      {/* Halo lumineux centré */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 52%, rgba(212,175,55,0.13) 0%, transparent 70%)',
        }}
      />

      {/* En-tête calligraphique */}
      <div
        className="mb-12 text-center"
        style={{
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          opacity: isOpening ? 0 : 1,
          transform: isOpening ? 'translateY(-18px)' : 'translateY(0)',
        }}
      >
        <p
          className="font-serif uppercase tracking-[0.4em] text-[#a65b32]"
          style={{ fontSize: '0.72rem' }}
        >
          Vous avez reçu une invitation
        </p>
        <h1
          className="mt-3 text-[#231f20]"
          style={{
            fontFamily: "'Alex Brush', cursive",
            fontSize: 'clamp(3.2rem, 10vw, 6rem)',
            lineHeight: 1,
          }}
        >
          Sifa &amp; Rony
        </h1>
        <p className="mt-2 font-serif text-sm tracking-[0.3em] text-[#5e5953]">
          26 • 12 • 2026
        </p>

        {/* Séparateur doré */}
        <div className="mx-auto mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#b68d40]/50" style={{ maxWidth: 80 }} />
          <span className="text-[#b68d40] text-lg">✦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#b68d40]/50" style={{ maxWidth: 80 }} />
        </div>
      </div>

      {/* ── L'ENVELOPPE ── */}
      <div
        className="relative select-none"
        style={{
          width: 'min(500px, 88vw)',
          cursor: isOpening ? 'default' : 'pointer',
          /* Perspective pour le rabat 3D */
          perspective: '1200px',
        }}
        onClick={onClick}
        role="button"
        aria-label="Ouvrir l'invitation"
      >
        {/* Ombre portée sous l'enveloppe */}
        <div
          className="absolute -bottom-4 left-4 right-4 rounded-full"
          style={{
            height: 24,
            background: 'rgba(90,50,10,0.18)',
            filter: 'blur(14px)',
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: isOpening ? 'scaleX(1.1) translateY(4px)' : 'scaleX(1)',
            opacity: isOpening ? 0.3 : 0.6,
          }}
        />

        {/* Corps principal de l'enveloppe */}
        <div
          className="relative rounded-2xl"
          style={{
            paddingBottom: '66%',
            background: 'linear-gradient(170deg, #ede3ce 0%, #dfd1b8 55%, #d4c5a5 100%)',
            border: '1px solid rgba(182,141,64,0.4)',
            boxShadow:
              '0 2px 0 rgba(255,255,255,0.55) inset, 0 30px 60px rgba(80,45,10,0.22), 0 8px 20px rgba(80,45,10,0.14)',
            transition: 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
            transform: isOpening ? 'scale(1.03) translateY(-6px)' : 'scale(1) translateY(0)',
            overflow: 'hidden',
          }}
        >
          {/* ── Texture fine (grain papier kraft) ── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
              opacity: 0.6,
            }}
          />

          {/* Ligne intérieure décorative */}
          <div
            className="pointer-events-none absolute"
            style={{
              inset: '10px',
              border: '1px solid rgba(182,141,64,0.22)',
              borderRadius: '14px',
            }}
          />

          {/* ── Rabat GAUCHE ── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              clipPath: 'polygon(0 0, 47% 54%, 0 100%)',
              background:
                'linear-gradient(92deg, #cfc0a2 0%, #c4b393 50%, #b8a885 100%)',
              opacity: isOpening ? 0.35 : 1,
              transition: 'opacity 0.7s ease',
              zIndex: 2,
            }}
          />
          {/* ── Rabat DROIT ── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              clipPath: 'polygon(100% 0, 53% 54%, 100% 100%)',
              background:
                'linear-gradient(268deg, #cfc0a2 0%, #c4b393 50%, #b8a885 100%)',
              opacity: isOpening ? 0.35 : 1,
              transition: 'opacity 0.7s ease',
              zIndex: 2,
            }}
          />
          {/* ── Rabat BAS ── */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              clipPath: 'polygon(0 100%, 50% 54%, 100% 100%)',
              background:
                'linear-gradient(2deg, #c9b99a 0%, #d4c4a8 60%, #d8c9b0 100%)',
              opacity: isOpening ? 0.35 : 1,
              transition: 'opacity 0.7s ease',
              zIndex: 2,
            }}
          />

          {/* ── RABAT HAUT — rotation 3D sur axe X ── */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-0"
            style={{
              height: '100%',
              clipPath: 'polygon(0 0, 100% 0, 50% 56%)',
              background:
                'linear-gradient(178deg, #f2e5d0 0%, #e5d4b8 55%, #d8c9a8 100%)',
              zIndex: 20,
              transformOrigin: 'top center',
              transform: isOpening ? 'rotateX(175deg)' : 'rotateX(0deg)',
              transition: 'transform 1.15s cubic-bezier(0.25, 1, 0.35, 1)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.14)',
            }}
          >
            {/* Reflet sur le rabat */}
            <div
              style={{
                position: 'absolute',
                clipPath: 'polygon(0 0, 100% 0, 50% 56%)',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.35) 0%, transparent 60%)',
              }}
            />
          </div>

          {/* ── Carton d'invitation qui monte hors de l'enveloppe ── */}
          {isOpening && (
            <div
              className="absolute inset-x-8 rounded-xl flex flex-col items-center justify-center gap-1"
              style={{
                top: '12%',
                bottom: '8%',
                background: 'linear-gradient(170deg, #fdfaf4 0%, #f8f0e0 100%)',
                border: '1px solid rgba(182,141,64,0.3)',
                boxShadow:
                  '0 2px 0 rgba(255,255,255,0.8) inset, 0 12px 32px rgba(80,45,10,0.18)',
                zIndex: 10,
                animation: 'cardRise 1s 0.45s cubic-bezier(0.16,1,0.3,1) both',
              }}
            >
              <div
                className="pointer-events-none absolute inset-3 rounded-lg"
                style={{ border: '1px solid rgba(182,141,64,0.18)' }}
              />
              <p
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: 'clamp(1.8rem,6vw,2.8rem)',
                  color: '#231f20',
                  lineHeight: 1.1,
                }}
              >
                On se dit oui.
              </p>
              <p className="font-serif text-xs tracking-[0.25em] uppercase text-[#a65b32] mt-1">
                Sifa &amp; Rony • 26 · 12 · 2026
              </p>
            </div>
          )}

          {/* ── SCEAU DE CIRE ── */}
          <div
            className="absolute left-1/2 top-1/2 z-30"
            style={{
              transition: 'transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s',
              transform: isOpening
                ? 'translate(-50%,-50%) scale(1.35)'
                : 'translate(-50%,-50%) scale(1)',
              opacity: isOpening ? 0 : 1,
            }}
          >
            <WaxSeal />
          </div>
        </div>

        {/* ── Invite à cliquer ── */}
        {!isOpening && (
          <div
            className="mt-9 flex justify-center"
            style={{ animation: 'breathe 2.8s ease-in-out infinite' }}
          >
            <span
              className="inline-flex items-center gap-2.5 rounded-full border bg-white/75 px-6 py-2.5 font-serif text-sm text-[#231f20] shadow-lg backdrop-blur"
              style={{
                border: '1px solid rgba(182,141,64,0.45)',
                letterSpacing: '0.12em',
              }}
            >
              <span className="text-[#b68d40]">✦</span>
              Cliquer pour ouvrir l'invitation
              <span className="text-[#b68d40]">✦</span>
            </span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cardRise {
          from { opacity: 0; transform: translateY(28px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes breathe {
          0%, 100% { transform: translateY(0);   opacity: 1; }
          50%       { transform: translateY(-5px); opacity: 0.85; }
        }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SCEAU DE CIRE
   ═══════════════════════════════════════════════════════════════════════════ */
function WaxSeal() {
  return (
    <div className="group relative" style={{ width: 100, height: 100 }}>
      {/* Ombre du sceau */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '6px 4px -6px 4px',
          background: 'rgba(60,15,10,0.28)',
          filter: 'blur(10px)',
        }}
      />

      {/* Fond du sceau avec dégradé cramoisi */}
      <div
        className="relative flex h-full w-full items-center justify-center rounded-full"
        style={{
          background:
            'radial-gradient(circle at 38% 35%, #b82626 0%, #8b1c1c 50%, #5a1010 100%)',
          boxShadow:
            '0 0 0 3px rgba(182,141,64,0.55), 0 0 0 5px rgba(182,141,64,0.18), inset 0 2px 4px rgba(255,255,255,0.15)',
        }}
      >
        {/* Dents du sceau — polygone SVG */}
        <svg
          className="pointer-events-none absolute inset-0"
          viewBox="0 0 100 100"
          style={{ overflow: 'visible' }}
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 360) / 18
            const rad = (angle * Math.PI) / 180
            const r1 = 46, r2 = 51
            const x1 = 50 + r1 * Math.cos(rad)
            const y1 = 50 + r1 * Math.sin(rad)
            const x2 = 50 + r2 * Math.cos(rad)
            const y2 = 50 + r2 * Math.sin(rad)
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(182,141,64,0.6)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )
          })}
          {/* Cercle décoratif interne */}
          <circle
            cx="50" cy="50" r="36"
            fill="none"
            stroke="rgba(240,200,140,0.22)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
          />
          <circle
            cx="50" cy="50" r="28"
            fill="none"
            stroke="rgba(240,200,140,0.18)"
            strokeWidth="0.8"
          />
        </svg>

        {/* Initiales */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <span
            className="font-serif font-bold tracking-widest"
            style={{ fontSize: '0.9rem', color: '#fbeee0', letterSpacing: '0.18em' }}
          >
            S &amp; R
          </span>
          <span
            className="font-serif"
            style={{ fontSize: '0.55rem', color: 'rgba(251,238,224,0.7)', letterSpacing: '0.2em', marginTop: 1 }}
          >
            2026
          </span>
        </div>
      </div>

      {/* Tooltip au survol */}
      <div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full font-serif text-[11px] text-white opacity-0 transition-all group-hover:opacity-100 group-hover:-bottom-10"
        style={{
          background: 'rgba(35,31,32,0.82)',
          padding: '3px 14px',
          letterSpacing: '0.08em',
          backdropFilter: 'blur(4px)',
        }}
      >
        Ouvrir l'invitation
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE D'INVITATION COMPLÈTE
   ═══════════════════════════════════════════════════════════════════════════ */
function InvitationPage() {
  return (
    <div className="relative z-10 pt-10">
      <HeroCard />
      <CountdownSection />
      <ReceptionSection />
      <RsvpSection />
      <WeddingFooter />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* HERO — reproduction fidèle du faire-part PDF                               */
/* ─────────────────────────────────────────────────────────────────────────── */
function HeroCard() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-10">
      <div
        className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-14 shadow-2xl"
        style={{
          background: 'linear-gradient(172deg, #fdfaf3 0%, #f8f0de 60%, #f2e5cc 100%)',
          border: '1px solid rgba(182,141,64,0.3)',
          boxShadow:
            '0 2px 0 rgba(255,255,255,0.7) inset, 0 32px 64px rgba(80,45,10,0.14), 0 8px 20px rgba(80,45,10,0.08)',
        }}
      >
        {/* Doubles bordures intérieures */}
        <div
          className="pointer-events-none absolute"
          style={{ inset: 14, border: '1px solid rgba(182,141,64,0.18)', borderRadius: '2rem' }}
        />
        <div
          className="pointer-events-none absolute"
          style={{ inset: 22, border: '1px solid rgba(182,141,64,0.1)', borderRadius: '1.6rem' }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Illustration botanique */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div
              className="w-44 sm:w-60 max-w-full"
              style={{ animation: 'floatBotanical 9s ease-in-out infinite' }}
            >
              <DriedFlowerBotanical className="w-full h-auto drop-shadow-md" />
            </div>
          </div>

          {/* Texte */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Date verticale */}
            <div className="flex justify-end">
              <div className="flex items-center gap-3">
                <div
                  className="flex flex-col items-center font-serif text-[#231f20] leading-none"
                  style={{ fontSize: 'clamp(1.6rem,4.5vw,2.8rem)' }}
                >
                  <span>26</span>
                  <span>12</span>
                  <span>26</span>
                </div>
                <div style={{ width: 2, height: 108, background: '#231f20' }} />
              </div>
            </div>

            {/* Titre script */}
            <div>
              <h1
                className="text-[#231f20]"
                style={{
                  fontFamily: "'Alex Brush', cursive",
                  fontSize: 'clamp(3.2rem,9vw,5.5rem)',
                  lineHeight: 1,
                }}
              >
                On se dit oui.
              </h1>
              <p
                className="mt-5 font-serif italic text-[#5e5953] leading-relaxed"
                style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)' }}
              >
                Ensemble, nous avons choisi de débuter notre aventure. Rejoignez-nous pour célébrer notre amour le jour de notre mariage.
              </p>
            </div>

            {/* Lieu & heure */}
            <div className="space-y-2 border-t border-[#b68d40]/18 pt-5">
              <p className="flex items-center gap-2 font-serif text-lg text-[#231f20]">
                <Clock className="h-4 w-4 text-[#a65b32]" />à 19h00
              </p>
              <p className="flex items-center gap-2 font-serif text-sm text-[#5e5953]">
                <MapPin className="h-4 w-4 text-[#a65b32]" />
                20 avenue LOFOI, Lubumbashi
              </p>
            </div>

            {/* Signature */}
            <div>
              <p
                className="font-serif font-bold uppercase text-[#231f20]"
                style={{ fontSize: 'clamp(1rem,2.5vw,1.3rem)', letterSpacing: '0.24em' }}
              >
                SIFA ET RONY
              </p>
              <p
                className="font-serif uppercase text-[#a65b32]"
                style={{ fontSize: '0.65rem', letterSpacing: '0.28em', marginTop: 3 }}
              >
                Lubumbashi • 2026
              </p>
            </div>
          </div>
        </div>

        {/* Familles */}
        <div className="relative z-10 mt-10 border-t border-[#b68d40]/18 pt-8 text-center">
          <WeddingRingsIcon className="mx-auto mb-3 h-10 w-16 text-[#231f20]" />
          <p className="font-serif text-sm text-[#5e5953] leading-relaxed">
            Les familles{' '}
            <strong className="text-[#231f20]">A TSHIKWAND</strong> et{' '}
            <strong className="text-[#231f20]">KALINDA</strong>
            {' '}ont le plaisir de vous convier à l'union de leurs enfants
          </p>
          <p
            className="mt-2 font-serif font-medium text-[#a65b32]"
            style={{ fontSize: 'clamp(1rem,3vw,1.4rem)' }}
          >
            Rony Kaleng &amp; Sifa Djuma
          </p>
        </div>
      </div>

      <style>{`
        @keyframes floatBotanical {
          0%, 100% { transform: translateY(0) rotate(-0.8deg); }
          50%       { transform: translateY(-10px) rotate(0.8deg); }
        }
      `}</style>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* COMPTE À REBOURS                                                            */
/* ─────────────────────────────────────────────────────────────────────────── */
function CountdownSection() {
  const calc = () => {
    const diff = new Date('2026-12-26T15:00:00+02:00').getTime() - Date.now()
    if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 }
    return {
      d: Math.floor(diff / 86_400_000),
      h: Math.floor((diff % 86_400_000) / 3_600_000),
      m: Math.floor((diff % 3_600_000) / 60_000),
      s: Math.floor((diff % 60_000) / 1000),
    }
  }
  const [t, setT] = useState(calc)
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id) }, [])

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Mariage Sifa & Rony')}&dates=20261226T130000Z/20261226T230000Z&details=${encodeURIComponent('15h00 : Cérémonie Paroisse Saint Laurent\n19h30 : Dîner & Soirée — 20 avenue LOFOI Lubumbashi')}&location=${encodeURIComponent('20 avenue LOFOI, Lubumbashi')}`

  return (
    <section className="mx-auto max-w-3xl px-4 py-8">
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-center shadow-xl"
        style={{
          background: 'linear-gradient(168deg, #fdfaf4 0%, #f5ead5 100%)',
          border: '1px solid rgba(182,141,64,0.26)',
          boxShadow: '0 2px 0 rgba(255,255,255,0.6) inset, 0 20px 48px rgba(80,45,10,0.1)',
        }}
      >
        <p
          className="font-serif uppercase text-[#a65b32]"
          style={{ fontSize: '0.68rem', letterSpacing: '0.3em' }}
        >
          Le grand jour approche
        </p>
        <h3
          className="mt-2 font-serif font-light text-[#231f20]"
          style={{ fontSize: 'clamp(1.2rem,3vw,1.6rem)' }}
        >
          Samedi 26 Décembre 2026
        </h3>

        <div className="mx-auto mt-7 mb-8 grid grid-cols-4 gap-3 max-w-xs">
          {([['Jours', t.d], ['Heures', t.h], ['Min', t.m], ['Sec', t.s]] as [string, number][]).map(([label, v]) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl p-3 shadow-sm"
              style={{
                background: 'rgba(255,255,255,0.85)',
                border: '1px solid rgba(182,141,64,0.22)',
              }}
            >
              <span
                className="font-serif font-bold text-[#231f20]"
                style={{ fontSize: 'clamp(1.6rem,5vw,2.2rem)', lineHeight: 1 }}
              >
                {String(v).padStart(2, '0')}
              </span>
              <span
                className="mt-1 text-[#5e5953] uppercase"
                style={{ fontSize: '0.58rem', letterSpacing: '0.2em' }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        <a
          href={gcal}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full font-serif text-xs uppercase tracking-widest text-white shadow transition hover:scale-105"
          style={{
            background: '#b68d40',
            border: '1px solid rgba(182,141,64,0.7)',
            padding: '0.65rem 1.5rem',
            letterSpacing: '0.18em',
          }}
        >
          <Calendar className="h-4 w-4" />
          Ajouter à Google Calendar
        </a>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* RÉCEPTIONS                                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
function ReceptionSection() {
  const cardStyle = {
    background: 'linear-gradient(162deg, #fdfaf4 0%, #f5ebd5 100%)',
    border: '1px solid rgba(182,141,64,0.24)',
    boxShadow: '0 2px 0 rgba(255,255,255,0.6) inset, 0 16px 40px rgba(80,45,10,0.1)',
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10 text-center">
        <p
          className="font-serif uppercase text-[#a65b32]"
          style={{ fontSize: '0.68rem', letterSpacing: '0.3em' }}
        >
          Programme de la journée
        </p>
        <h2
          className="mt-2 font-serif font-light uppercase text-[#231f20]"
          style={{ fontSize: 'clamp(1.6rem,5vw,2.4rem)', letterSpacing: '0.12em' }}
        >
          26 Décembre 2026
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b68d40]/50" />
          <span className="text-[#b68d40]">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#b68d40]/50" />
        </div>
      </div>

      {/* Timeline */}
      <div
        className="relative space-y-8"
        style={{ '--tl-color': 'rgba(182,141,64,0.28)' } as React.CSSProperties}
      >
        <div
          className="pointer-events-none absolute"
          style={{
            left: 24, top: 12, bottom: 12, width: 2,
            background: 'linear-gradient(to bottom, transparent, rgba(182,141,64,0.35) 10%, rgba(182,141,64,0.35) 90%, transparent)',
          }}
        />

        {/* Cérémonie */}
        <TimelineCard
          time="15h00"
          step={1}
          icon={<ChurchIcon className="h-7 w-7 text-[#231f20]" />}
          title="Cérémonie à l'église"
          place="Église Paroisse Saint Laurent"
          note="Installation des invités dès 14h30"
          mapsUrl="https://maps.google.com/?q=Paroisse+Saint+Laurent+Lubumbashi"
          cardStyle={cardStyle}
          accentColor="#b68d40"
        />

        {/* Réception */}
        <TimelineCard
          time="19h30"
          step={2}
          icon={<WeddingCakeIcon className="h-7 w-7 text-[#231f20]" />}
          title="Dîner & Soirée dansante"
          place="20 Avenue LOFOI"
          note="Cocktail de bienvenue · Dîner gastronomique · Soirée"
          mapsUrl="https://maps.google.com/?q=20+avenue+LOFOI+Lubumbashi"
          cardStyle={cardStyle}
          accentColor="#a65b32"
        />
      </div>

      {/* Dress code + Contacts */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 shadow-lg" style={cardStyle}>
          <p
            className="font-serif uppercase font-bold text-[#a65b32] mb-2"
            style={{ fontSize: '0.65rem', letterSpacing: '0.28em' }}
          >
            Tenue souhaitée
          </p>
          <p className="font-serif text-lg text-[#231f20] mb-4">Élégance &amp; Tons Doux</p>
          <div className="flex gap-2 mb-4">
            {['#a65b32', '#d4af37', '#b88350', '#f5edd6'].map((c) => (
              <div
                key={c}
                className="flex-1 rounded-lg shadow-inner"
                style={{ height: 32, background: c, border: '1px solid rgba(0,0,0,0.08)' }}
              />
            ))}
          </div>
          <p className="text-xs text-[#5e5953] font-serif leading-relaxed">
            Terracotta · Sable Doré · Ocre · Ivoire
            <br />
            <em className="text-[#a65b32]">Le blanc pur est réservé à la mariée.</em>
          </p>
        </div>

        <div className="rounded-2xl p-6 shadow-lg" style={cardStyle}>
          <p
            className="font-serif uppercase font-bold text-[#a65b32] mb-3"
            style={{ fontSize: '0.65rem', letterSpacing: '0.28em' }}
          >
            Contacts
          </p>
          {[
            { label: 'Famille A TSHIKWAND', num: '0970519974', wa: '243970519974' },
            { label: 'Famille KALINDA',     num: '0972747664', wa: '243972747664' },
          ].map((c) => (
            <div
              key={c.num}
              className="mb-3 flex items-center justify-between rounded-xl px-3 py-2.5"
              style={{ background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(182,141,64,0.18)' }}
            >
              <div>
                <p className="font-serif text-[10px] uppercase tracking-widest text-[#a65b32]">{c.label}</p>
                <p className="font-serif text-base font-bold text-[#231f20]">{c.num}</p>
              </div>
              <div className="flex gap-1.5">
                <a
                  href={`tel:+${c.wa}`}
                  className="rounded-full p-2 text-white transition hover:opacity-85"
                  style={{ background: '#231f20' }}
                >
                  <Phone className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`https://wa.me/${c.wa}?text=${encodeURIComponent('Bonjour, je vous contacte au sujet du mariage Sifa & Rony du 26/12/2026.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-2 py-2 font-bold text-white transition hover:opacity-85 flex items-center text-[10px]"
                  style={{ background: '#25D366' }}
                >
                  WA
                </a>
              </div>
            </div>
          ))}
          <p
            className="mt-2 text-center font-bold uppercase text-[#802020]"
            style={{ fontSize: '0.62rem', letterSpacing: '0.22em' }}
          >
            RSVP avant le 30 Novembre 2026
          </p>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({
  time, step, icon, title, place, note, mapsUrl, cardStyle, accentColor,
}: {
  time: string; step: number; icon: React.ReactNode; title: string
  place: string; note: string; mapsUrl: string; cardStyle: React.CSSProperties; accentColor: string
}) {
  return (
    <div className="relative pl-16 group">
      <div
        className="absolute left-0 flex h-12 w-12 items-center justify-center rounded-full shadow-md transition-transform group-hover:scale-110"
        style={{
          background: 'linear-gradient(145deg, #fdfaf4, #f0e8d4)',
          border: `2px solid ${accentColor}`,
        }}
      >
        {icon}
      </div>
      <div
        className="rounded-2xl p-6 shadow-lg transition-transform duration-300 group-hover:-translate-y-1"
        style={cardStyle}
      >
        <span
          className="font-serif uppercase font-bold text-[#a65b32]"
          style={{ fontSize: '0.65rem', letterSpacing: '0.28em' }}
        >
          {time} • Étape {step}
        </span>
        <h3
          className="mt-1 font-serif text-[#231f20]"
          style={{ fontSize: 'clamp(1.15rem,3vw,1.5rem)' }}
        >
          {title}
        </h3>
        <p className="mt-2 font-serif text-sm font-semibold text-[#231f20]">{place}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-[#5e5953]">
          <MapPin className="h-3.5 w-3.5 text-[#a65b32]" />
          Lubumbashi, RDC
        </p>
        <p className="mt-2 text-xs text-[#5e5953] italic">{note}</p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 rounded-full font-serif text-xs uppercase tracking-wider transition hover:text-white"
          style={{
            border: '1px solid rgba(35,31,32,0.22)',
            padding: '0.35rem 1rem',
            background: 'rgba(255,255,255,0.7)',
            color: '#231f20',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#231f20'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.7)'; (e.currentTarget as HTMLElement).style.color = '#231f20' }}
        >
          <Navigation className="h-3.5 w-3.5" /> Itinéraire GPS
        </a>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* RSVP                                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
function RsvpSection() {
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('')
  const [attending, setAttending] = useState<'yes' | 'no'>('yes')
  const [events, setEvents]       = useState({ ceremony: true, dinner: true })
  const [guests, setGuests]       = useState(1)
  const [guestNames, setGuestNames] = useState('')
  const [msg, setMsg]             = useState('')
  const [done, setDone]           = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    try {
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.65 }, colors: ['#b68d40', '#d4af37', '#a65b32', '#fff'] })
    } catch {}
    setDone(true)
  }

  const buildWA = () => {
    let t = `*RSVP Mariage Sifa & Rony (26.12.2026)*\n\n`
    t += `👤 *Nom :* ${name}\n📱 *Tél :* ${phone}\n`
    t += `💌 *Réponse :* ${attending === 'yes' ? '✅ Présent(e) avec joie !' : '❌ Absent(e) avec regrets'}\n`
    if (attending === 'yes') {
      t += `👥 *Invités :* ${guests} personne(s)${guestNames ? ` (${guestNames})` : ''}\n`
      const ev = [events.ceremony && 'Cérémonie 15h00', events.dinner && 'Soirée 19h30'].filter(Boolean).join(' + ')
      t += `📍 *Étapes :* ${ev}\n`
    }
    if (msg) t += `💬 *Message :* "${msg}"\n`
    return encodeURIComponent(t)
  }

  const panelStyle: React.CSSProperties = {
    background: 'linear-gradient(172deg, #fdfaf3 0%, #f8f0df 100%)',
    border: '1px solid rgba(182,141,64,0.3)',
    boxShadow: '0 2px 0 rgba(255,255,255,0.65) inset, 0 32px 64px rgba(80,45,10,0.12)',
  }

  return (
    <section id="rsvp-section" className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10 text-center">
        <span
          className="inline-block rounded-full font-serif font-bold uppercase text-[#802020]"
          style={{
            background: 'rgba(128,32,32,0.08)',
            padding: '0.25rem 1.1rem',
            fontSize: '0.62rem',
            letterSpacing: '0.28em',
          }}
        >
          Réponse souhaitée avant le 30 Nov 2026
        </span>
        <h2
          className="mt-3 font-serif font-light text-[#231f20]"
          style={{ fontSize: 'clamp(1.6rem,5vw,2.4rem)' }}
        >
          Confirmation de Présence
        </h2>
        <div className="mx-auto mt-3 flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#b68d40]/50" />
          <span className="text-[#b68d40]">✦</span>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#b68d40]/50" />
        </div>
      </div>

      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-12" style={panelStyle}>
        {done ? (
          <div className="py-8 text-center">
            <div
              className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full"
              style={{ background: 'rgba(37,211,102,0.12)' }}
            >
              <Check className="h-10 w-10 text-[#25D366]" />
            </div>
            <h3 className="font-serif text-2xl text-[#231f20] mb-2">
              {attending === 'yes' ? 'Merci pour votre confirmation !' : 'Merci de nous avoir prévenus'}
            </h3>
            <p className="font-serif text-sm text-[#5e5953] max-w-sm mx-auto mb-8">
              {attending === 'yes'
                ? 'Sifa & Rony seront ravis de vous accueillir le 26 Décembre 2026.'
                : 'Vous serez avec eux dans nos cœurs ce beau jour.'}
            </p>
            <p
              className="font-serif uppercase text-[#5e5953] mb-3"
              style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
            >
              Transmettez votre réponse par WhatsApp :
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
              {[
                { num: '243970519974', label: '0970 519 974' },
                { num: '243972747664', label: '0972 747 664' },
              ].map((c) => (
                <a
                  key={c.num}
                  href={`https://wa.me/${c.num}?text=${buildWA()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl font-serif text-xs font-bold uppercase tracking-wider text-white shadow transition hover:scale-105"
                  style={{ background: '#25D366', padding: '0.75rem 1.25rem', letterSpacing: '0.15em' }}
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp {c.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => setDone(false)}
              className="font-serif text-xs text-[#5e5953] underline hover:text-[#231f20]"
            >
              Modifier ma réponse
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-6">
            <RField label="Nom et Prénom *">
              <input required value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Sarah Kalonda ou Famille Mukendi" className="rsvp-in" />
            </RField>

            <RField label="Téléphone / WhatsApp *">
              <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                placeholder="+243 970 000 000" className="rsvp-in" />
            </RField>

            <RField label="Serez-vous présent(e) le 26 Décembre 2026 ? *">
              <div className="grid grid-cols-2 gap-4">
                {(['yes', 'no'] as const).map((val) => (
                  <label
                    key={val}
                    className="flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all"
                    style={{
                      border: attending === val
                        ? `1px solid ${val === 'yes' ? '#b68d40' : '#802020'}`
                        : '1px solid rgba(35,31,32,0.12)',
                      background: attending === val
                        ? `${val === 'yes' ? 'rgba(182,141,64,0.08)' : 'rgba(128,32,32,0.08)'}`
                        : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    <input type="radio" name="att" checked={attending === val}
                      onChange={() => setAttending(val)} className="h-4 w-4" />
                    <span className="font-serif text-sm text-[#231f20]">
                      {val === 'yes' ? '✓  Avec joie !' : '✗  Avec regret'}
                    </span>
                  </label>
                ))}
              </div>
            </RField>

            {attending === 'yes' && (
              <>
                <RField label="Présence aux étapes :">
                  <div className="space-y-2">
                    {[
                      { key: 'ceremony', label: "15h00 — Cérémonie à l'Église Paroisse Saint Laurent" },
                      { key: 'dinner',   label: '19h30 — Dîner & Soirée au 20 avenue LOFOI' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox"
                          checked={events[key as keyof typeof events]}
                          onChange={(e) => setEvents((ev) => ({ ...ev, [key]: e.target.checked }))}
                          className="h-4 w-4 rounded" />
                        <span className="font-serif text-sm text-[#231f20]">{label}</span>
                      </label>
                    ))}
                  </div>
                </RField>

                <div className="grid grid-cols-2 gap-4">
                  <RField label="Nombre de personnes">
                    <select value={guests} onChange={(e) => setGuests(Number(e.target.value))} className="rsvp-in">
                      {[1,2,3,4,5].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'personne' : 'personnes'}</option>
                      ))}
                    </select>
                  </RField>
                  <RField label="Accompagnateurs">
                    <input value={guestNames} onChange={(e) => setGuestNames(e.target.value)}
                      placeholder="Optionnel" className="rsvp-in" />
                  </RField>
                </div>
              </>
            )}

            <RField label="Un mot pour les mariés (optionnel)">
              <textarea rows={3} value={msg} onChange={(e) => setMsg(e.target.value)}
                placeholder="Vos vœux, bénédictions..." className="rsvp-in resize-none" />
            </RField>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-2xl font-serif text-sm uppercase text-white shadow-lg transition hover:scale-[1.01]"
              style={{
                background: 'linear-gradient(135deg, #c8a050 0%, #b68d40 50%, #a07828 100%)',
                padding: '1rem',
                letterSpacing: '0.18em',
                boxShadow: '0 4px 20px rgba(182,141,64,0.4)',
              }}
            >
              <Heart className="h-4 w-4 fill-white" />
              Valider ma confirmation RSVP
              <Sparkles className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>

      <style>{`
        .rsvp-in {
          width: 100%;
          border: 1px solid rgba(182,141,64,0.35);
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.82);
          color: #231f20;
          padding: 0.7rem 0.9rem;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 180ms, box-shadow 180ms;
        }
        .rsvp-in:focus {
          border-color: #b68d40;
          box-shadow: 0 0 0 3px rgba(182,141,64,0.18);
        }
      `}</style>
    </section>
  )
}

function RField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block font-serif text-sm font-semibold text-[#231f20]">{label}</label>
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* FOOTER                                                                       */
/* ─────────────────────────────────────────────────────────────────────────── */
function WeddingFooter() {
  return (
    <footer
      className="border-t px-4 py-14 text-center text-[#5e5953]"
      style={{ borderColor: 'rgba(182,141,64,0.2)', background: 'rgba(240,228,210,0.5)' }}
    >
      <WeddingRingsIcon className="mx-auto mb-3 h-10 w-16 text-[#231f20]" />
      <h3
        className="font-serif font-light uppercase tracking-wide text-[#231f20]"
        style={{ fontSize: 'clamp(1.1rem,3vw,1.5rem)', letterSpacing: '0.2em' }}
      >
        SIFA &amp; RONY
      </h3>
      <p className="mt-2 font-serif italic text-sm">
        « L'amour ne donne rien que lui-même »
      </p>
      <p
        className="mt-4 font-serif uppercase text-[#a65b32]"
        style={{ fontSize: '0.62rem', letterSpacing: '0.28em' }}
      >
        Samedi 26 Décembre 2026 • Lubumbashi
      </p>
    </footer>
  )
}
