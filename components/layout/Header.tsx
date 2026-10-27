"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { displayPhone, telHref } from "@/lib/contact";
import { labels, t } from "@/lib/labels";
import { getVisibleNavLinks } from "@/lib/sections";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/motion/variants";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";

/**
 * En-tete du site.
 *
 * Au chargement, l'en-tete est transparent et pose sur la photo du hero :
 * le visuel occupe tout l'ecran, sans bandeau qui le coupe. Des le premier
 * defilement il prend un fond creme translucide et un filet. Le passage est
 * anime, y compris la couleur du texte, pour que la lisibilite soit assuree
 * dans les deux etats.
 *
 * Tout le contenu vient de `data/site.ts` : logo, liens (ceux qui pointent
 * vers une section desactivee sont retires automatiquement), bouton et
 * bandeau d'annonce.
 */
export function Header() {
  const { company, navigation, images, contact, sections } = siteConfig;
  const links = getVisibleNavLinks(siteConfig);
  const reduced = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /**
   * L'en-tete n'est transparent que si la premiere section est un hero en
   * plein ecran : sur une mise en page claire, il lui faut un fond des le
   * depart pour rester lisible.
   */
  const overHero =
    sections.hero.enabled && (sections.hero.layout ?? "fullscreen") === "fullscreen";
  const solid = scrolled || !overHero;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile ouvert : on bloque le defilement de la page derriere.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Fermeture du menu a la touche Echap.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const logo = solid ? images.logo : (images.logoLight ?? images.logo);

  return (
    <>
      {/* Bandeau d'annonce. Aplat vert profond : sur sauge, un texte creme
          tomberait a 2:1 de contraste. */}
      {navigation.announcement && (
        <div className="bg-primary text-on-primary">
          <Container size="wide">
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-2.5 text-center text-xs">
              <span>{navigation.announcement.text}</span>
              {navigation.announcement.link && (
                <Link
                  href={navigation.announcement.link.href}
                  className="font-medium underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {navigation.announcement.link.label}
                </Link>
              )}
            </p>
          </Container>
        </div>
      )}

      <header
        className={cn(
          "sticky top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          solid
            ? "border-b border-border/70 bg-background/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        {/*
          Voile porte par l'en-tete lui-meme, et non par la section situee
          derriere : le logo clair et les liens blancs restent lisibles meme si
          le client remplace la photo du hero par un visuel tres lumineux.
          Il disparait des que l'en-tete prend son fond opaque.

          Note : un audit automatique signale malgre tout ces liens, car il ne
          sait pas evaluer le contraste au-dessus d'une image et suppose alors
          le fond de page. Le contraste reel, lui, est assure par ce voile.
        */}
        <div
          aria-hidden="true"
          className={cn(
            "overlay-top pointer-events-none absolute inset-x-0 top-0 h-32 transition-opacity duration-700",
            solid ? "opacity-0" : "opacity-100",
          )}
        />

        <Container size="wide" className="relative">
          <div className="flex h-20 items-center justify-between gap-8">
            {/* Logo ou nom de l'entreprise */}
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label={t(labels.homeAria, { name: company.name })}
            >
              {logo ? (
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width ?? 180}
                  height={logo.height ?? 48}
                  priority
                  unoptimized={logo.src.toLowerCase().endsWith(".svg")}
                  className="h-9 w-auto sm:h-10"
                />
              ) : (
                <span
                  className={cn(
                    "font-display text-xl transition-colors duration-700",
                    solid ? "text-ink" : "text-white",
                  )}
                >
                  {company.name}
                </span>
              )}
            </Link>

            {/* Navigation (ecrans larges) */}
            {/* Six liens, un numero et un bouton : la barre ne tient proprement
                qu'a partir de 1280 px. En dessous, le menu lateral est plus lisible
                qu'une navigation qui se casse sur deux lignes. */}
            <nav aria-label="Navigation principale" className="hidden xl:block">
              <ul className="flex items-center gap-9">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={cn(
                        "group relative py-2 text-sm transition-colors duration-500",
                        solid
                          ? "text-muted hover:text-ink"
                          : "text-white/80 hover:text-white",
                      )}
                    >
                      {link.label}
                      {/* Filet qui se deploie depuis la gauche au survol. */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100",
                          solid ? "bg-primary" : "bg-white",
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {navigation.showPhone && (
                <a
                  href={telHref(contact.phone)}
                  className={cn(
                    "hidden items-center gap-2 text-sm transition-colors duration-500 2xl:inline-flex tabular",
                    solid ? "text-muted hover:text-primary" : "text-white/85 hover:text-white",
                  )}
                >
                  <Icon name="phone" size={15} />
                  {displayPhone(contact)}
                </a>
              )}

              {navigation.cta && (
                <div className="hidden sm:block">
                  <Button
                    action={navigation.cta}
                    size="sm"
                    variantOverride={solid ? "primary" : "light"}
                  />
                </div>
              )}

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label={labels.openMenu}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "flex size-11 cursor-pointer items-center justify-center rounded-full border transition-colors duration-500 xl:hidden",
                  solid
                    ? "border-border text-ink hover:border-primary hover:text-primary"
                    : "border-white/35 text-white hover:border-white",
                )}
              >
                <Icon name="menu" size={20} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <div id="mobile-menu" className="fixed inset-0 z-60 overflow-hidden xl:hidden">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-overlay/45 backdrop-blur-sm"
            />

            <m.nav
              aria-label="Navigation mobile"
              initial={{ x: reduced ? 0 : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : "100%" }}
              transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
              className="absolute top-0 right-0 flex h-full w-[min(24rem,90vw)] flex-col bg-background"
            >
              <div className="flex items-center justify-between px-6 py-6">
                <span className="font-display text-lg text-ink">{company.name}</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label={labels.closeMenu}
                  className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-border text-ink transition-colors duration-500 hover:border-primary hover:text-primary"
                >
                  <Icon name="close" size={19} />
                </button>
              </div>

              <ul className="flex flex-1 flex-col overflow-y-auto px-6">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-border last:border-0">
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between py-5 font-display text-xl text-ink transition-colors duration-500 hover:text-primary"
                    >
                      {link.label}
                      <Icon
                        name="arrow-right"
                        size={17}
                        className="text-primary/50 transition-transform duration-500 group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-4 border-t border-border p-6">
                <a
                  href={telHref(contact.phone)}
                  className="flex items-center gap-2.5 text-sm text-ink tabular"
                >
                  <Icon name="phone" size={16} className="text-primary" />
                  {displayPhone(contact)}
                </a>
                {navigation.cta && (
                  <div onClick={() => setMenuOpen(false)}>
                    <Button action={navigation.cta} block />
                  </div>
                )}
              </div>
            </m.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
