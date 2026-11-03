import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, Music } from 'lucide-react'

export function WeddingAudioAmbiance() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const isPlayingRef = useRef(false)
  const timerRef = useRef<any>(null)

  // Gentle romantic harp / music-box chords using Web Audio API
  const playRomanticChord = (frequencies: number[]) => {
    if (!audioCtxRef.current) return
    const ctx = audioCtxRef.current

    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        if (!isPlayingRef.current || !ctx) return
        try {
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()

          osc.type = 'sine'
          osc.frequency.setValueAtTime(freq, ctx.currentTime)

          // Soft bell / harp envelope
          gain.gain.setValueAtTime(0.001, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05)
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8)

          osc.connect(gain)
          gain.connect(ctx.destination)

          osc.start()
          osc.stop(ctx.currentTime + 3.0)
        } catch (e) {
          // ignore
        }
      }, idx * 120)
    })
  }

  const loopMelody = () => {
    // Beautiful romantic progressions in F major / D minor (Canon in D / Wedding theme style)
    const chords = [
      [261.63, 329.63, 392.0, 523.25], // C major
      [220.0, 261.63, 329.63, 440.0],  // A minor
      [174.61, 220.0, 261.63, 349.23], // F major
      [196.0, 246.94, 293.66, 392.0],  // G major
    ]

    let step = 0
    const tick = () => {
      if (!isPlayingRef.current) return
      playRomanticChord(chords[step % chords.length])
      step++
      timerRef.current = setTimeout(tick, 3200)
    }

    tick()
  }

  const toggleMusic = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
        audioCtxRef.current = new AudioCtx()
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume()
      }
      isPlayingRef.current = true
      setIsPlaying(true)
      loopMelody()
    } else {
      isPlayingRef.current = false
      setIsPlaying(false)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }

  useEffect(() => {
    return () => {
      isPlayingRef.current = false
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        className={`group flex items-center gap-2 rounded-full border px-4 py-2.5 font-serif text-xs uppercase tracking-wider shadow-xl backdrop-blur transition-all duration-300 ${
          isPlaying
            ? 'border-[#b68d40] bg-[#b68d40] text-white ring-4 ring-[#b68d40]/20 scale-105'
            : 'border-[#b68d40]/40 bg-white/90 text-[#231f20] hover:bg-[#b68d40] hover:text-white'
        }`}
        title={isPlaying ? 'Couper la musique' : 'Activer l’ambiance musicale'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="h-4 w-4 animate-bounce" />
            <span className="hidden sm:inline">Musique d'ambiance active</span>
          </>
        ) : (
          <>
            <Music className="h-4 w-4 text-[#b68d40] group-hover:text-white" />
            <span className="hidden sm:inline">Ambiance Romantique</span>
          </>
        )}
      </button>
    </div>
  )
}
