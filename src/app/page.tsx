import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PACKAGES, OPENING, formatEuro } from "@/lib/packages";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative min-h-[72vh] overflow-hidden bg-ink">
          <Image
            src="/hero-domaine.jpg"
            alt="Château La Tour de l’Évêque"
            fill
            priority
            className="object-cover opacity-70"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />
          <div className="relative mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
            <p className="text-[11px] uppercase tracking-[0.28em] text-sand">
              Œnotourisme · Provence · {OPENING.label}
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl uppercase leading-tight tracking-[0.08em] text-white md:text-5xl lg:text-6xl">
              Réservez votre expérience au domaine
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/85 md:text-base">
              Visites de caves, dégustations, pique-nique dans les vignes, et
              rencontre avec l’artiste — en quelques clics, date et paiement en
              ligne.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reserver" className="btn-primary bg-white !text-ink border-white hover:!bg-sand">
                Réserver maintenant
              </Link>
              <a href="#experiences" className="btn-ghost !border-white !text-white hover:!bg-white hover:!text-ink">
                Voir les formules
              </a>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="border-b border-line bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 text-center text-[11px] uppercase tracking-[0.16em] text-muted md:grid-cols-3 md:px-8">
            <p>Bio · cave par gravité</p>
            <p>Paiement sécurisé en ligne</p>
            <p>Annulation gratuite −48 h</p>
          </div>
        </section>

        {/* Packages */}
        <section id="experiences" className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
              Formules 2026
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
              Expériences au château
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Des packages calibrés pour être lisibles, rentables pour le domaine,
              et faciles à choisir. La dégustation simple reste gratuite au
              caveau sans réservation.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PACKAGES.map((p) => {
              const price = p.isPairPrice
                ? `${formatEuro(p.pairPrice ?? 0)} / 2`
                : `${formatEuro(p.pricePerPerson)}`;
              return (
                <article
                  key={p.id}
                  className="card-package flex flex-col p-6"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {p.badge && (
                        <span className="mb-2 inline-block bg-sand px-2 py-0.5 text-[10px] uppercase tracking-[0.14em]">
                          {p.badge}
                        </span>
                      )}
                      <h3 className="font-display text-xl uppercase tracking-[0.08em]">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted">{p.tagline}</p>
                    </div>
                    <p className="shrink-0 text-right">
                      <span className="block text-2xl font-medium">{price}</span>
                      {!p.isPairPrice && (
                        <span className="text-[10px] uppercase tracking-wider text-muted">
                          / personne
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-soft">
                    {p.description}
                  </p>
                  <ul className="mt-5 space-y-1.5 border-t border-line pt-4">
                    {p.includes.map((inc) => (
                      <li key={inc} className="flex gap-2 text-xs text-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sand-deep" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/reserver?pack=${p.id}`}
                    className="btn-primary mt-6 w-full"
                  >
                    Choisir
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        {/* Artist + picnic highlight */}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-16 md:px-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                Option
              </p>
              <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.1em] md:text-3xl">
                Dégustation privée avec l’artiste
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                Pendant l’exposition REVERS(E) de Lilou Aurélie H. (LAH) au
                caveau : cochez l’option pour une rencontre exclusive autour des
                œuvres et du vin. +18 € / personne · sous réserve de présence.
              </p>
              <Link href="/reserver" className="btn-ghost mt-8 self-start">
                Ajouter à ma réservation
              </Link>
            </div>
            <div className="bg-cream-dark px-5 py-16 md:px-12">
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
                Nouveau
              </p>
              <h2 className="mt-3 font-display text-2xl uppercase tracking-[0.1em] md:text-3xl">
                Pique-nique vignes
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                À pied (38 €) ou à vélo Accueil Vélo (42 €) : panier gourmand,
                carte d’itinéraire, liberté dans le cirque de vignes. Idéal
                couples & familles légères.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/reserver?pack=picnic-pied"
                  className="btn-primary"
                >
                  À pied
                </Link>
                <Link
                  href="/reserver?pack=picnic-velo"
                  className="btn-ghost"
                >
                  À vélo
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Practical */}
        <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="font-display text-sm uppercase tracking-[0.16em]">
                Horaires
              </h3>
              <p className="mt-3 text-sm text-muted">{OPENING.label}</p>
            </div>
            <div>
              <h3 className="font-display text-sm uppercase tracking-[0.16em]">
                Adresse
              </h3>
              <p className="mt-3 text-sm text-muted">{OPENING.address}</p>
            </div>
            <div>
              <h3 className="font-display text-sm uppercase tracking-[0.16em]">
                Contact
              </h3>
              <p className="mt-3 text-sm text-muted">
                {OPENING.phone}
                <br />
                {OPENING.email}
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
