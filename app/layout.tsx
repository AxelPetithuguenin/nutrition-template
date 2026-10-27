import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/data/site";
import { resolveFonts } from "@/lib/fonts";
import { labels } from "@/lib/labels";
import { buildJsonLd, buildMetadata } from "@/lib/seo";
import { buildThemeCss } from "@/lib/theme";
import MotionProvider from "@/components/motion/MotionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/**
 * Enveloppe globale du site.
 *
 * Trois responsabilites, toutes alimentees par `data/site.ts` :
 *  1. charger les polices choisies par le client ;
 *  2. injecter sa charte de couleurs sous forme de variables CSS ;
 *  3. produire les metadonnees et les donnees structurees.
 */

/** Metadonnees (titre, description, Open Graph, robots...). */
export const metadata: Metadata = buildMetadata(siteConfig);

/** Couleur de la barre d'adresse sur mobile : celle du client. */
export const viewport: Viewport = {
  themeColor: siteConfig.theme.colors.primary,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const fonts = resolveFonts(siteConfig.theme.typography);
  const themeCss = buildThemeCss(siteConfig.theme, fonts.cssVariables);
  const jsonLd = buildJsonLd(siteConfig);

  return (
    <html lang={siteConfig.seo.lang} className={fonts.className}>
      <head>
        {/* Charte client -> variables CSS consommees par Tailwind. */}
        <style dangerouslySetInnerHTML={{ __html: themeCss }} />

        {/* Donnees structurees : fiche etablissement + questions frequentes. */}
        {jsonLd.map((document, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(document) }}
          />
        ))}
      </head>

      <body className="min-h-screen bg-background text-ink antialiased">
        {/* Acces rapide au contenu pour la navigation au clavier. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-primary focus:px-6 focus:py-3 focus:font-medium focus:text-on-primary"
        >
          {labels.skipToContent}
        </a>

        <MotionProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
