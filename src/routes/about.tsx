import { createFileRoute, Link } from '@tanstack/react-router'
import { WeddingRingsIcon } from '../components/WeddingIcons'
import { Heart, Calendar, MapPin, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutWedding,
})

function AboutWedding() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-[#b68d40]/30 bg-white/90 p-8 sm:p-14 shadow-2xl backdrop-blur">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-serif text-xs uppercase tracking-widest text-[#a65b32] hover:text-[#884622] transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour à l'accueil / Faire-part</span>
        </Link>

        <div className="text-center mb-10">
          <div className="mx-auto mb-3 flex justify-center text-[#231f20]">
            <WeddingRingsIcon className="h-14 w-20" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#231f20] uppercase">
            Notre Aventure Commence
          </h1>

          <p className="mt-3 font-script text-4xl text-[#a65b32]">
            Sifa & Rony
          </p>

          <div className="mx-auto my-4 h-[1px] w-24 bg-[#b68d40]/50" />
        </div>

        <div className="space-y-6 font-serif text-base sm:text-lg text-[#5e5953] leading-relaxed">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#a65b32] first-letter:mr-2 first-letter:float-left">
            « Ensemble, nous avons choisi de débuter notre aventure. Rejoignez-nous pour célébrer notre amour le jour de notre mariage. »
          </p>

          <p>
            C’est entourés de nos familles, de nos proches et de nos amis les plus chers que nous souhaitons sceller cette belle promesse. Ce 26 Décembre 2026 à Lubumbashi restera gravé dans nos mémoires, et votre présence à nos côtés en fera un souvenir inoubliable.
          </p>

          <div className="my-8 rounded-2xl border border-[#b68d40]/20 bg-[#faf7f2] p-6 text-center">
            <h2 className="font-serif text-xl font-bold text-[#231f20] mb-2">
              Familles à l'honneur
            </h2>
            <p className="text-sm text-[#5e5953]">
              Famille <strong className="text-[#231f20]">A TSHIKWAND</strong> & Famille{' '}
              <strong className="text-[#231f20]">KALINDA</strong>
            </p>
            <p className="text-xs text-[#a65b32] uppercase tracking-wider mt-2">
              Lubumbashi, République Démocratique du Congo
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#b68d40] px-6 py-3 font-serif text-xs uppercase tracking-widest text-white shadow-md transition hover:bg-[#9a7431] hover:scale-105"
          >
            <Heart className="h-4 w-4 fill-white" />
            <span>Accéder au faire-part & RSVP</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
