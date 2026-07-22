"use client";

import { useMemo, useState } from "react";
import {
  ADDONS,
  PACKAGES,
  type AddonId,
  type PackageId,
  computeTotal,
  formatEuro,
  getPackage,
  isOpenDay,
} from "@/lib/packages";
import { addDays, format, parseISO, startOfDay } from "date-fns";
import { fr } from "date-fns/locale";

const STEPS = ["Expérience", "Date & heure", "Options", "Coordonnées"] as const;

function nextOpenDates(count = 45): string[] {
  const out: string[] = [];
  let d = startOfDay(new Date());
  // start from tomorrow for prep food
  d = addDays(d, 1);
  while (out.length < count) {
    if (isOpenDay(d)) out.push(format(d, "yyyy-MM-dd"));
    d = addDays(d, 1);
  }
  return out;
}

export function BookingWizard({
  initialPackage,
}: {
  initialPackage?: PackageId;
}) {
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState<PackageId>(
    initialPackage ?? "epicurienne"
  );
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [addons, setAddons] = useState<AddonId[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pkg = getPackage(packageId);
  const dates = useMemo(() => nextOpenDates(50), []);
  const totals = useMemo(
    () => computeTotal({ packageId, guests, addonIds: addons }),
    [packageId, guests, addons]
  );

  function toggleAddon(id: AddonId) {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function canNext(): boolean {
    if (step === 0) return !!packageId && guests >= pkg.minGuests;
    if (step === 1) return !!date && !!slot;
    if (step === 2) return true;
    if (step === 3)
      return name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);
    return false;
  }

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId,
          guests,
          date,
          slot,
          addonIds: addons,
          name,
          email,
          phone,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur réservation");
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.redirect) {
        window.location.href = data.redirect;
        return;
      }
      throw new Error("Réponse inattendue du serveur");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur");
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
      {/* Main column */}
      <div>
        {/* Steps */}
        <ol className="mb-10 flex flex-wrap items-center gap-2 md:gap-3">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`step-dot ${
                  i === step ? "active" : i < step ? "done" : ""
                }`}
              >
                {i + 1}
              </span>
              <span
                className={`hidden text-[11px] uppercase tracking-[0.14em] sm:inline ${
                  i === step ? "text-ink" : "text-muted"
                }`}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <span className="mx-1 hidden h-px w-6 bg-line sm:block md:w-10" />
              )}
            </li>
          ))}
        </ol>

        {/* STEP 0 — packages */}
        {step === 0 && (
          <section className="space-y-6">
            <header>
              <h1 className="font-display text-3xl uppercase tracking-[0.12em] md:text-4xl">
                Choisissez votre expérience
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                Tarifs 2026 · réservation en ligne · paiement sécurisé. Dégustation
                simple gratuite sans résa au caveau.
              </p>
            </header>

            <div className="flex flex-wrap items-center gap-4 rounded-sm border border-line bg-white px-4 py-3">
              <label className="text-[11px] uppercase tracking-[0.14em] text-muted">
                Nombre de personnes
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center border border-line hover:bg-cream"
                  onClick={() =>
                    setGuests((g) => Math.max(pkg.minGuests, g - 1))
                  }
                  aria-label="Moins"
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{guests}</span>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center border border-line hover:bg-cream"
                  onClick={() =>
                    setGuests((g) => Math.min(pkg.maxGuests, g + 1))
                  }
                  aria-label="Plus"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-muted">
                Min. {pkg.minGuests} · Max. {getPackage(packageId).maxGuests}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {PACKAGES.map((p) => {
                const selected = p.id === packageId;
                const priceLabel = p.isPairPrice
                  ? `${formatEuro(p.pairPrice ?? 0)} / 2`
                  : `${formatEuro(p.pricePerPerson)} / pers.`;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setPackageId(p.id);
                      setGuests((g) =>
                        Math.min(p.maxGuests, Math.max(p.minGuests, g))
                      );
                      setSlot("");
                    }}
                    className={`card-package p-5 text-left ${
                      selected ? "selected" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        {p.badge && (
                          <span className="mb-2 inline-block bg-sand px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-ink">
                            {p.badge}
                          </span>
                        )}
                        <h3 className="font-display text-lg uppercase tracking-[0.08em]">
                          {p.name}
                        </h3>
                        <p className="mt-1 text-xs text-muted">{p.tagline}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-lg font-medium">{priceLabel}</p>
                        <p className="text-[10px] uppercase tracking-wider text-muted">
                          {p.durationMin} min
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                      {p.description}
                    </p>
                    <ul className="mt-4 space-y-1.5">
                      {p.includes.slice(0, 4).map((inc) => (
                        <li
                          key={inc}
                          className="flex gap-2 text-xs text-muted"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sand-deep" />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* STEP 1 — date & time */}
        {step === 1 && (
          <section className="space-y-6">
            <header>
              <h1 className="font-display text-3xl uppercase tracking-[0.12em] md:text-4xl">
                Date & horaire
              </h1>
              <p className="mt-3 text-sm text-muted">
                Ouvert mardi à samedi · {pkg.name}
              </p>
            </header>

            <div>
              <label className="mb-2 block text-[11px] uppercase tracking-[0.14em] text-muted">
                Date de visite
              </label>
              <select
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSlot("");
                }}
              >
                <option value="">Choisir une date…</option>
                {dates.map((d) => (
                  <option key={d} value={d}>
                    {format(parseISO(d), "EEEE d MMMM yyyy", { locale: fr })}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-3 block text-[11px] uppercase tracking-[0.14em] text-muted">
                Créneau
              </label>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                {pkg.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    disabled={!date}
                    onClick={() => setSlot(s)}
                    className={`border px-3 py-3 text-sm transition ${
                      slot === s
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white hover:border-sand-deep disabled:opacity-40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* STEP 2 — addons */}
        {step === 2 && (
          <section className="space-y-6">
            <header>
              <h1 className="font-display text-3xl uppercase tracking-[0.12em] md:text-4xl">
                Options
              </h1>
              <p className="mt-3 text-sm text-muted">
                Ajoutez une touche privée ou un cadeau. Facultatif.
              </p>
            </header>

            <div className="space-y-3">
              {ADDONS.map((ad) => {
                const ok =
                  ad.compatibleWith === "all" ||
                  ad.compatibleWith.includes(packageId);
                if (!ok) return null;
                const checked = addons.includes(ad.id);
                const price =
                  ad.flatPrice && ad.flatPrice > 0
                    ? `${formatEuro(ad.flatPrice)} (forfait)`
                    : `+ ${formatEuro(ad.pricePerPerson)} / pers.`;
                return (
                  <label
                    key={ad.id}
                    className={`flex cursor-pointer gap-4 border bg-white p-5 transition ${
                      checked ? "border-ink" : "border-line hover:border-sand-deep"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 h-4 w-4 accent-ink"
                      checked={checked}
                      onChange={() => toggleAddon(ad.id)}
                    />
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="font-display text-base uppercase tracking-[0.08em]">
                          {ad.name}
                        </span>
                        <span className="text-sm font-medium">{price}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {ad.description}
                      </p>
                      {ad.note && (
                        <p className="mt-2 text-xs italic text-muted">
                          {ad.note}
                        </p>
                      )}
                    </div>
                  </label>
                );
              })}
            </div>

            {(packageId === "picnic-pied" || packageId === "picnic-velo") && (
              <div className="border border-sand bg-cream-dark/40 p-5 text-sm leading-relaxed text-ink-soft">
                <p className="font-display text-xs uppercase tracking-[0.14em] text-ink">
                  Pique-nique — inclus
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5">
                  <li>Panier gourmand préparé le matin (charcuterie, fromage, tartinade, pain, fruit)</li>
                  <li>Carte d’itinéraire PDF envoyée à la confirmation + papier au départ</li>
                  <li>
                    {packageId === "picnic-velo"
                      ? "Parcours vélo Accueil Vélo — vélos non fournis (liste loueurs par email)"
                      : "Boucle à pied dans le cirque de vignes (~45–90 min selon rythme)"}
                  </li>
                  <li>Prévoir chaussures adaptées · météo : report possible sans frais</li>
                </ul>
              </div>
            )}
          </section>
        )}

        {/* STEP 3 — contact */}
        {step === 3 && (
          <section className="space-y-6">
            <header>
              <h1 className="font-display text-3xl uppercase tracking-[0.12em] md:text-4xl">
                Vos coordonnées
              </h1>
              <p className="mt-3 text-sm text-muted">
                Confirmation par email · paiement sécurisé Stripe (CB).
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted">
                  Nom complet *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted">
                  Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-[11px] uppercase tracking-[0.14em] text-muted">
                  Message (allergies, groupe, hôtel…)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </p>
            )}
          </section>
        )}

        {/* Nav buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <button
            type="button"
            className="btn-ghost !py-3"
            disabled={step === 0 || loading}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Retour
          </button>
          {step < 3 ? (
            <button
              type="button"
              className="btn-primary"
              disabled={!canNext()}
              onClick={() => setStep((s) => s + 1)}
            >
              Continuer
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary min-w-[200px]"
              disabled={!canNext() || loading}
              onClick={submit}
            >
              {loading ? "Redirection…" : `Payer ${formatEuro(totals.total)}`}
            </button>
          )}
        </div>
      </div>

      {/* Summary sticky */}
      <aside className="h-fit border border-line bg-white p-6 lg:sticky lg:top-24">
        <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
          Récapitulatif
        </p>
        <h2 className="mt-2 font-display text-xl uppercase tracking-[0.08em]">
          {pkg.name}
        </h2>
        <p className="mt-1 text-sm text-muted">{pkg.tagline}</p>

        <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted">Personnes</dt>
            <dd>{guests}</dd>
          </div>
          {date && (
            <div className="flex justify-between gap-4">
              <dt className="text-muted">Date</dt>
              <dd className="text-right">
                {format(parseISO(date), "d MMM yyyy", { locale: fr })}
                {slot ? ` · ${slot}` : ""}
              </dd>
            </div>
          )}
          {addons.length > 0 && (
            <div>
              <dt className="text-muted">Options</dt>
              <dd className="mt-1 space-y-1">
                {addons.map((id) => (
                  <p key={id} className="text-right text-xs">
                    {ADDONS.find((a) => a.id === id)?.name}
                  </p>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <ul className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
          {totals.lines.map((l) => (
            <li key={l.label} className="flex justify-between gap-3">
              <span className="text-muted">{l.label}</span>
              <span>{formatEuro(l.amount)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
          <span className="text-[11px] uppercase tracking-[0.14em]">Total TTC</span>
          <span className="font-display text-3xl tracking-wide">
            {formatEuro(totals.total)}
          </span>
        </div>
        <p className="mt-2 text-xs text-muted">
          soit {formatEuro(totals.perPerson)} / personne en moyenne
        </p>
        <p className="mt-6 text-[11px] leading-relaxed text-muted">
          Annulation gratuite jusqu’à 48 h avant · en cas d’absence artiste, option
          remboursée intégralement.
        </p>
      </aside>
    </div>
  );
}
