import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Share2, Check } from 'lucide-react'

export function WeddingCountdown() {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  })

  useEffect(() => {
    // Target date: 26 Dec 2026, 15:00:00 (Lubumbashi UTC+2)
    const targetDate = new Date('2026-12-26T15:00:00+02:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true })
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds, isPast: false })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      const shareData = {
        title: 'Mariage Sifa & Rony - 26 Décembre 2026',
        text: 'Rejoignez-nous pour célébrer le mariage de Sifa Djuma et Rony Kaleng à Lubumbashi.',
        url: window.location.href,
      }
      if (navigator.share) {
        try {
          await navigator.share(shareData)
        } catch (err) {
          // cancelled or failed
        }
      } else {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2500)
      }
    }
  }

  // Google Calendar link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Mariage Sifa & Rony',
  )}&dates=20261226T130000Z/20261226T230000Z&details=${encodeURIComponent(
    "Célébration du mariage de Sifa Djuma & Rony Kaleng.\n15h00 : Cérémonie à la Paroisse Saint Laurent.\n19h30 : Dîner et soirée au 20 avenue LOFOI Lubumbashi.",
  )}&location=${encodeURIComponent('Paroisse Saint Laurent & 20 avenue LOFOI, Lubumbashi')}`

  return (
    <div className="relative mx-auto my-12 max-w-4xl px-4 text-center">
      <div className="relative overflow-hidden rounded-2xl border border-[#b68d40]/30 bg-gradient-to-b from-[#faf7f2] to-[#f4ece0] p-8 shadow-xl">
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#b68d40]/10 blur-2xl" />
        <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-[#a65b32]/10 blur-2xl" />

        <p className="font-serif text-xs uppercase tracking-[0.25em] text-[#a65b32] font-semibold mb-2">
          Le compte à rebours est lancé
        </p>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#231f20] font-normal mb-6">
          Samedi 26 Décembre 2026
        </h3>

        {/* Counter Units */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-lg mx-auto mb-8">
          {[
            { label: 'Jours', value: timeLeft.days },
            { label: 'Heures', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Secondes', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-xl border border-[#b68d40]/25 bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur transition-transform hover:-translate-y-1"
            >
              <span className="font-serif text-2xl sm:text-4xl font-bold text-[#231f20] tracking-tight">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-widest text-[#5e5953] mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#b68d40] bg-[#b68d40] px-5 py-2.5 text-xs font-serif uppercase tracking-widest text-white shadow-sm transition hover:bg-[#9a7431] hover:scale-105"
          >
            <Calendar className="h-4 w-4" />
            <span>Ajouter au calendrier Google</span>
          </a>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-[#231f20]/20 bg-white/70 px-5 py-2.5 text-xs font-serif uppercase tracking-widest text-[#231f20] shadow-sm backdrop-blur transition hover:bg-white hover:scale-105"
          >
            {copied ? <Check className="h-4 w-4 text-green-600" /> : <Share2 className="h-4 w-4 text-[#a65b32]" />}
            <span>{copied ? 'Lien copié !' : 'Partager le faire-part'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
