import Image from "next/image";
import Link from "next/link";
import { OPENING } from "@/lib/packages";

export function SiteHeader({
  cta = true,
  compact = false,
}: {
  cta?: boolean;
  compact?: boolean;
}) {
  return (
    <header className="site-chrome sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo-tr.png"
            alt="Château La Tour de l’Évêque"
            width={180}
            height={22}
            className="h-7 w-auto md:h-8"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-[12px] font-medium uppercase tracking-[0.12em] text-ink-soft md:flex">
          <a
            href={`${OPENING.site}/une-histoire/`}
            className="hover:text-sand-deep"
            target="_blank"
            rel="noreferrer"
          >
            Histoire
          </a>
          <a
            href={`${OPENING.site}/vignoble/`}
            className="hover:text-sand-deep"
            target="_blank"
            rel="noreferrer"
          >
            Vignoble
          </a>
          <Link href="/#experiences" className="hover:text-sand-deep">
            Expériences
          </Link>
          <a
            href={`${OPENING.site}/contact/`}
            className="hover:text-sand-deep"
            target="_blank"
            rel="noreferrer"
          >
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {!compact && (
            <a
              href={`tel:+33494282017`}
              className="hidden text-[11px] tracking-wide text-muted lg:block"
            >
              {OPENING.phone}
            </a>
          )}
          {cta && (
            <Link
              href="/reserver"
              className="btn-primary !px-4 !py-2.5 text-[11px] md:!px-5"
            >
              Réserver
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
