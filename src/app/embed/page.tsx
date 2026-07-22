import { BookingWizard } from "@/components/BookingWizard";
import { PACKAGES, type PackageId } from "@/lib/packages";

export const metadata = {
  title: "Réserver (embed) | Tour de l’Évêque",
  robots: { index: false, follow: false },
};

export default async function EmbedPage({
  searchParams,
}: {
  searchParams: Promise<{ pack?: string }>;
}) {
  const sp = await searchParams;
  const pack = PACKAGES.some((p) => p.id === sp.pack)
    ? (sp.pack as PackageId)
    : undefined;

  return (
    <div className="min-h-screen bg-white px-3 py-6 md:px-6">
      <BookingWizard initialPackage={pack} />
    </div>
  );
}
