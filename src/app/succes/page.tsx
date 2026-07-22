import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OPENING, formatEuro } from "@/lib/packages";

export const metadata = {
  title: "Réservation confirmée | Château La Tour de l’Évêque",
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{
    session_id?: string;
    mode?: string;
    total?: string;
    ref?: string;
  }>;
}) {
  const sp = await searchParams;
  const isRequest = sp.mode === "request";
  const total = sp.total ? Number(sp.total) : null;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-xl px-5 py-24 text-center md:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted">
          {isRequest ? "Demande reçue" : "Merci"}
        </p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.1em] md:text-4xl">
          {isRequest
            ? "Votre demande est enregistrée"
            : "Réservation confirmée"}
        </h1>
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">
          {isRequest ? (
            <>
              Stripe n’est pas encore configuré sur cet environnement : le caveau
              a reçu votre demande
              {sp.ref ? (
                <>
                  {" "}
                  (réf. <strong>{sp.ref}</strong>)
                </>
              ) : null}
              {total ? <> pour {formatEuro(total)}</> : null}. Vous serez
              recontacté(e) sous 24 h ouvrées pour confirmer et régler.
            </>
          ) : (
            <>
              Un email de confirmation Stripe vous a été envoyé. Présentez-le
              (ou le QR) au caveau le jour J.
              {sp.session_id ? (
                <span className="mt-2 block text-xs text-muted">
                  Session {sp.session_id.slice(0, 20)}…
                </span>
              ) : null}
            </>
          )}
        </p>
        <p className="mt-6 text-sm text-muted">
          {OPENING.address}
          <br />
          {OPENING.phone} · {OPENING.email}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Retour aux expériences
          </Link>
          <a href={OPENING.site} className="btn-ghost" target="_blank" rel="noreferrer">
            Site du château
          </a>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
