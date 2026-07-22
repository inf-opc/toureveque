import type { Metadata } from "next";
import { Josefin_Sans, Montserrat } from "next/font/google";
import "./globals.css";

const display = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600"],
});

const body = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Réserver une expérience | Château La Tour de l’Évêque",
  description:
    "Visites, dégustations, pique-nique dans les vignes et rencontres artiste au Château La Tour de l’Évêque — Pierrefeu-du-Var, Provence.",
  openGraph: {
    title: "Réserver · Château La Tour de l’Évêque",
    description:
      "Choisissez votre expérience œnotouristique, votre date et payez en ligne.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
