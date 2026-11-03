import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Heart,
  CheckCircle,
  ExternalLink,
  Send,
  MessageSquare,
  Calendar,
  Sparkles,
  Edit3,
  Phone,
  AlertCircle,
} from 'lucide-react'

export function RsvpSection() {
  // Google Form Default or User Custom URL
  const [googleFormUrl, setGoogleFormUrl] = useState(
    'https://docs.google.com/forms/d/e/1FAIpQLScJp7w9rC7w1cW5eXG9wZkP9o_rsvp_sifa_rony/viewform?embedded=true',
  )
  const [isEditingUrl, setIsEditingUrl] = useState(false)
  const [activeTab, setActiveTab] = useState<'form' | 'google-embed'>('form')

  // Form states
  const [fullName, setFullName] = useState('')
  const [attending, setAttending] = useState<'yes' | 'no' | null>('yes')
  const [ceremony, setCeremony] = useState(true)
  const [reception, setReception] = useState(true)
  const [guestCount, setGuestCount] = useState(1)
  const [guestNames, setGuestNames] = useState('')
  const [dietary, setDietary] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!fullName.trim()) return

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#b68d40', '#d4af37', '#a65b32', '#802020', '#ffffff'],
      })
    } catch (e) {
      // safe fallback
    }

    setSubmitted(true)
  }

  // Generate WhatsApp confirmation message for Sifa & Rony's coordinators
  const getWhatsAppMessage = () => {
    const statusText =
      attending === 'yes'
        ? '✅ JE CONFIRME MA PRÉSENCE AVEC JOIE !'
        : '❌ Malheureusement je ne pourrai pas être présent(e).'

    const eventsList = []
    if (ceremony) eventsList.push('• Cérémonie à l’Église Paroisse Saint Laurent (15h00)')
    if (reception) eventsList.push('• Dîner & Soirée au 20 avenue LOFOI (19h30)')

    let text = `*RSVP Mariage Sifa & Rony (26.12.2026)*\n\n`
    text += `👤 *Nom complet :* ${fullName}\n`
    text += `📱 *Téléphone :* ${phone || 'Non renseigné'}\n`
    text += `💌 *Réponse :* ${statusText}\n`

    if (attending === 'yes') {
      text += `👥 *Nombre de personnes :* ${guestCount}\n`
      if (guestNames) text += `👥 *Accompagnateurs :* ${guestNames}\n`
      text += `📍 *Présence aux étapes :*\n${eventsList.join('\n')}\n`
      if (dietary) text += `🍽️ *Régime / Notes :* ${dietary}\n`
    }

    if (message) {
      text += `\n💬 *Message pour Sifa & Rony :*\n"${message}"\n`
    }

    text += `\nEnvoyé depuis le site de mariage Sifa & Rony.`
    return encodeURIComponent(text)
  }

  const resetForm = () => {
    setSubmitted(false)
  }

  return (
    <section id="rsvp-section" className="relative my-20 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block rounded-full bg-[#802020]/10 px-4 py-1 font-serif text-xs font-bold uppercase tracking-widest text-[#802020]">
            Réponse Souhaitée
          </span>

          <h2 className="mt-3 font-serif text-3xl sm:text-5xl font-light text-[#231f20]">
            Confirmation de Présence
          </h2>

          <div className="mx-auto my-3 h-[1px] w-20 bg-[#b68d40]/60" />

          <p className="font-serif text-base text-[#5e5953] max-w-lg mx-auto">
            Merci de bien vouloir nous confirmer votre présence{' '}
            <strong className="text-[#a65b32]">avant le 30 Novembre 2026</strong> afin de faciliter l'organisation de notre réception.
          </p>

          {/* Mode Switcher */}
          <div className="mt-8 inline-flex rounded-full border border-[#b68d40]/30 bg-white/70 p-1 shadow-sm backdrop-blur">
            <button
              onClick={() => setActiveTab('form')}
              className={`rounded-full px-5 py-2 font-serif text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === 'form'
                  ? 'bg-[#b68d40] text-white shadow-sm'
                  : 'text-[#5e5953] hover:text-[#231f20]'
              }`}
            >
              Formulaire Interactif
            </button>
            <button
              onClick={() => setActiveTab('google-embed')}
              className={`rounded-full px-5 py-2 font-serif text-xs font-semibold uppercase tracking-wider transition ${
                activeTab === 'google-embed'
                  ? 'bg-[#b68d40] text-white shadow-sm'
                  : 'text-[#5e5953] hover:text-[#231f20]'
              }`}
            >
              Google Forms Officiel
            </button>
          </div>
        </div>

        {/* CONTAINER FOR RSVP */}
        <div className="relative overflow-hidden rounded-3xl border border-[#b68d40]/30 bg-white/95 p-6 sm:p-12 shadow-2xl backdrop-blur">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#b68d40]/10 blur-2xl" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-[#a65b32]/10 blur-2xl" />

          {/* TAB 1: INTERACTIVE FORM WITH WHATSAPP CONFIRMATION */}
          {activeTab === 'form' && (
            <div>
              {submitted ? (
                /* Success Screen */
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366] shadow-inner">
                    <CheckCircle className="h-10 w-10" />
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#231f20] mb-2">
                    {attending === 'yes'
                      ? 'Merci infiniment pour votre confirmation !'
                      : 'Merci de nous avoir prévenus'}
                  </h3>

                  <p className="font-serif text-base text-[#5e5953] max-w-md mx-auto mb-8">
                    {attending === 'yes'
                      ? `Sifa & Rony ont hâte de célébrer ce grand moment à Lubumbashi le samedi 26 décembre 2026.`
                      : `Votre pensée nous touche beaucoup. Vous serez avec nous par le cœur.`}
                  </p>

                  {/* Summary of reservation */}
                  <div className="mx-auto max-w-md rounded-2xl border border-[#b68d40]/25 bg-[#faf7f2] p-5 text-left mb-8 shadow-sm">
                    <p className="text-xs uppercase font-serif tracking-widest text-[#a65b32] font-semibold mb-2">
                      Récapitulatif de votre réponse
                    </p>
                    <p className="font-serif text-lg font-bold text-[#231f20]">
                      {fullName}
                    </p>
                    <p className="text-sm text-[#5e5953]">
                      Statut :{' '}
                      <span className="font-semibold text-[#231f20]">
                        {attending === 'yes' ? `Présent (${guestCount} personne(s))` : 'Non disponible'}
                      </span>
                    </p>
                    {attending === 'yes' && (
                      <div className="mt-2 text-xs text-[#5e5953] space-y-1 border-t border-[#b68d40]/15 pt-2">
                        {ceremony && <p>✓ Cérémonie à l'église (15h00)</p>}
                        {reception && <p>✓ Dîner & Soirée au 20 avenue LOFOI (19h30)</p>}
                      </div>
                    )}
                  </div>

                  {/* WhatsApp Direct Notification Buttons */}
                  <div className="mx-auto max-w-md space-y-3 mb-8">
                    <p className="font-serif text-xs uppercase tracking-wider text-[#5e5953]">
                      Transmettre directement votre confirmation par WhatsApp aux coordinateurs :
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={`https://wa.me/243970519974?text=${getWhatsAppMessage()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-serif text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#20bd5a] hover:scale-105"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>WhatsApp (0970519974)</span>
                      </a>

                      <a
                        href={`https://wa.me/243972747664?text=${getWhatsAppMessage()}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-serif text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-[#20bd5a] hover:scale-105"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>WhatsApp (0972747664)</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="font-serif text-xs uppercase tracking-wider text-[#5e5953] hover:text-[#231f20] underline"
                  >
                    Modifier ma réponse
                  </button>
                </div>
              ) : (
                /* The form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                      Nom et Prénom <span className="text-[#802020]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ex : Sarah Kalonda ou Famille Mukendi"
                      className="w-full rounded-xl border border-[#b68d40]/30 bg-[#faf7f2] px-4 py-3 font-serif text-[#231f20] placeholder-[#5e5953]/50 focus:border-[#b68d40] focus:outline-none focus:ring-2 focus:ring-[#b68d40]/20"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                      Numéro de Téléphone / WhatsApp <span className="text-[#802020]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex : 0970000000 ou +243 ..."
                      className="w-full rounded-xl border border-[#b68d40]/30 bg-[#faf7f2] px-4 py-3 font-serif text-[#231f20] placeholder-[#5e5953]/50 focus:border-[#b68d40] focus:outline-none focus:ring-2 focus:ring-[#b68d40]/20"
                    />
                  </div>

                  {/* Presence Radio */}
                  <div>
                    <label className="block font-serif text-sm font-semibold text-[#231f20] mb-3">
                      Serez-vous des nôtres le 26 Décembre 2026 ? <span className="text-[#802020]">*</span>
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                          attending === 'yes'
                            ? 'border-[#b68d40] bg-[#b68d40]/10 shadow-sm'
                            : 'border-[#231f20]/15 bg-[#faf7f2] hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          checked={attending === 'yes'}
                          onChange={() => setAttending('yes')}
                          className="h-4 w-4 text-[#b68d40] focus:ring-[#b68d40]"
                        />
                        <div>
                          <p className="font-serif font-semibold text-[#231f20]">
                            Oui, avec une immense joie !
                          </p>
                          <p className="text-xs text-[#5e5953]">
                            Je serai présent(e) pour célébrer
                          </p>
                        </div>
                      </label>

                      <label
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition ${
                          attending === 'no'
                            ? 'border-[#802020] bg-[#802020]/10 shadow-sm'
                            : 'border-[#231f20]/15 bg-[#faf7f2] hover:bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          checked={attending === 'no'}
                          onChange={() => setAttending('no')}
                          className="h-4 w-4 text-[#802020] focus:ring-[#802020]"
                        />
                        <div>
                          <p className="font-serif font-semibold text-[#231f20]">
                            Avec regret, je ne pourrai pas
                          </p>
                          <p className="text-xs text-[#5e5953]">
                            Je serai avec vous par la pensée
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Conditional fields if attending */}
                  {attending === 'yes' && (
                    <div className="space-y-6 rounded-2xl border border-[#b68d40]/25 bg-[#faf7f2]/80 p-6">
                      {/* Events check */}
                      <div>
                        <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                          Sélectionnez les étapes où vous participerez :
                        </label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={ceremony}
                              onChange={(e) => setCeremony(e.target.checked)}
                              className="h-4 w-4 rounded text-[#b68d40] focus:ring-[#b68d40]"
                            />
                            <span className="font-serif text-sm text-[#231f20]">
                              15h00 : Cérémonie à la <strong>Paroisse Saint Laurent</strong>
                            </span>
                          </label>

                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={reception}
                              onChange={(e) => setReception(e.target.checked)}
                              className="h-4 w-4 rounded text-[#b68d40] focus:ring-[#b68d40]"
                            />
                            <span className="font-serif text-sm text-[#231f20]">
                              19h30 : Dîner & Soirée dansante au <strong>20 avenue LOFOI Lubumbashi</strong>
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Guest Count */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                            Nombre total de convives
                          </label>
                          <select
                            value={guestCount}
                            onChange={(e) => setGuestCount(Number(e.target.value))}
                            className="w-full rounded-xl border border-[#b68d40]/30 bg-white px-4 py-2.5 font-serif text-[#231f20] focus:border-[#b68d40] focus:outline-none"
                          >
                            <option value={1}>1 personne (Moi seul(e))</option>
                            <option value={2}>2 personnes (Couple / +1)</option>
                            <option value={3}>3 personnes</option>
                            <option value={4}>4 personnes</option>
                            <option value={5}>5 personnes et plus (Famille)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                            Noms des accompagnateurs
                          </label>
                          <input
                            type="text"
                            value={guestNames}
                            onChange={(e) => setGuestNames(e.target.value)}
                            placeholder="Ex : M. & Mme X..."
                            className="w-full rounded-xl border border-[#b68d40]/30 bg-white px-4 py-2.5 font-serif text-[#231f20] focus:border-[#b68d40] focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Dietary notes */}
                      <div>
                        <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                          Régime alimentaire spécifique ou remarques
                        </label>
                        <input
                          type="text"
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          placeholder="Ex : Végétarien, allergies..."
                          className="w-full rounded-xl border border-[#b68d40]/30 bg-white px-4 py-2.5 font-serif text-[#231f20] focus:border-[#b68d40] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Wishes message */}
                  <div>
                    <label className="block font-serif text-sm font-semibold text-[#231f20] mb-2">
                      Un mot tendre ou vœux pour les mariés (Sifa & Rony)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Laissez votre message de bénédiction et d'encouragement..."
                      className="w-full rounded-xl border border-[#b68d40]/30 bg-[#faf7f2] px-4 py-3 font-serif text-[#231f20] placeholder-[#5e5953]/50 focus:border-[#b68d40] focus:outline-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#b68d40] py-4 font-serif text-sm uppercase tracking-widest text-white shadow-lg transition hover:bg-[#9a7431] hover:scale-[1.01]"
                    >
                      <Heart className="h-4 w-4 fill-white" />
                      <span>Valider ma confirmation RSVP</span>
                      <Sparkles className="h-4 w-4 text-[#faf7f2]" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: GOOGLE FORMS DIRECT EMBED */}
          {activeTab === 'google-embed' && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-[#faf7f2] p-5 border border-[#b68d40]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#231f20]">
                    Google Form Officiel de Confirmation
                  </h4>
                  <p className="text-xs text-[#5e5953] mt-1">
                    Vous pouvez répondre directement ci-dessous ou ouvrir le formulaire dans un nouvel onglet Google.
                  </p>
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://forms.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#231f20] px-4 py-2 font-serif text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-[#a65b32]"
                  >
                    <span>Ouvrir sur Google</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    onClick={() => setIsEditingUrl(!isEditingUrl)}
                    className="inline-flex items-center gap-1 rounded-full border border-[#231f20]/20 bg-white px-3 py-2 font-serif text-xs text-[#5e5953] hover:text-[#231f20]"
                    title="Personnaliser le lien Google Form"
                  >
                    <Edit3 className="h-3.5 w-3.5" />
                    <span>Lien URL</span>
                  </button>
                </div>
              </div>

              {/* Editable URL Bar for Wedding Planners */}
              {isEditingUrl && (
                <div className="rounded-xl border border-dashed border-[#b68d40] bg-white p-4">
                  <p className="text-xs font-serif font-bold text-[#a65b32] mb-1">
                    Lien personnalisé de votre Google Form :
                  </p>
                  <p className="text-[11px] text-[#5e5953] mb-2">
                    Collez ici l'URL de partage de votre Google Form (ex : https://docs.google.com/forms/d/e/.../viewform).
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={googleFormUrl}
                      onChange={(e) => setGoogleFormUrl(e.target.value)}
                      className="flex-1 rounded-lg border border-[#b68d40]/40 px-3 py-2 text-xs font-mono"
                    />
                    <button
                      onClick={() => setIsEditingUrl(false)}
                      className="rounded-lg bg-[#b68d40] px-4 py-2 font-serif text-xs font-bold text-white"
                    >
                      Enregistrer
                    </button>
                  </div>
                </div>
              )}

              {/* Google Form Responsive Frame */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-[#b68d40]/30 shadow-inner bg-white min-h-[550px]">
                <iframe
                  src={googleFormUrl}
                  width="100%"
                  height="650"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="w-full"
                  title="Formulaire de confirmation Google Form"
                >
                  Chargement du formulaire Google Form...
                </iframe>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
