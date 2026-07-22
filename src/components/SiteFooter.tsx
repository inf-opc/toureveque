import { OPENING } from "@/lib/packages";

export function SiteFooter() {
  return (
    <footer className="site-chrome border-t border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.2em]">
            Château La Tour de l’Évêque
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {OPENING.address}
            <br />
            Famille Sumeire · Bio · Gravité
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Caveau
          </p>
          <p className="mt-2 text-sm text-ink-soft">{OPENING.label}</p>
          <p className="mt-1 text-sm">
            <a href={`tel:+33494282017`} className="hover:underline">
              {OPENING.phone}
            </a>
            <br />
            <a href={`mailto:${OPENING.email}`} className="hover:underline">
              {OPENING.email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Site principal
          </p>
          <a
            href={OPENING.site}
            className="mt-2 inline-block text-sm hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            toureveque.com
          </a>
          <p className="mt-6 text-xs text-muted">
            © {new Date().getFullYear()} Château La Tour de l’Évêque
          </p>
        </div>
      </div>
    </footer>
  );
}
