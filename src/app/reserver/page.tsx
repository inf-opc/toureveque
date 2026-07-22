import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BookingWizard } from "@/components/BookingWizard";
import { PACKAGES, type PackageId } from "@/lib/packages";

export const metadata = {
  title: "Réserver | Château La Tour de l’Évêque",
};

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: Promise<{ pack?: string; cancelled?: string }>;
}) {
  const sp = await searchParams;
  const pack = PACKAGES.some((p) => p.id === sp.pack)
    ? (sp.pack as PackageId)
    : undefined;

  return (
    <>
      <SiteHeader cta={false} />
      <main className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        {sp.cancelled === "1" && (
          <p className="mb-8 border border-sand bg-cream-dark/50 px-4 py-3 text-sm text-ink-soft">
            Paiement annulé — vous pouvez modifier votre sélection et réessayer.
          </p>
        )}
        <BookingWizard initialPackage={pack} />
      </main>
      <SiteFooter />
    </>
  );
}
