import { siteConfig } from "@/data/site";
import { cn, splitHighlight } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SmartImage from "@/components/ui/SmartImage";
import Entrance from "@/components/motion/Entrance";
import HeroDecor, { Sparkle } from "@/components/sections/HeroDecor";
import Parallax from "@/components/motion/Parallax";

/**
 * Section d'ouverture.
 *
 * Mise en page `fullscreen` : grande photo lifestyle, parallaxe tres legere au
 * defilement, texte pose en bas a gauche sur un degrade. Le titre s'ecrit en
 * Playfair a l'echelle `display`, avec une portion mise en couleur definie par
 * `titleHighlight` dans `data/site.ts`.
 *
 * Deux autres mises en page restent disponibles (`split`, `centered`) : le
 * choix se fait dans la configuration, sans toucher au code.
 */
export function Hero() {
  const hero = siteConfig.sections.hero;
  const image = siteConfig.images.hero;
  const [before, highlight, after] = splitHighlight(hero.title, hero.titleHighlight);
  const layout = hero.layout ?? "decorated";
  const isDecorated = layout === "decorated";
  const isFullscreen = layout === "fullscreen";

  /* --------------------------------------------------------------- Contenu */
  const content = (
    <div className={cn(
        "flex flex-col",
        (layout === "centered" || isDecorated) && "items-center text-center",
      )}>
      {hero.eyebrow && (
        <Entrance delay={80}>
          <span
            className={cn(
              "flex items-center gap-3",
              layout === "centered" && "justify-center",
            )}
          >
            <span
              aria-hidden="true"
              className={cn("h-px w-8", isFullscreen ? "bg-white/40" : "rule-soft")}
            />
            <span className={cn("eyebrow", isFullscreen ? "text-white/75" : "text-muted")}>
              {hero.eyebrow}
            </span>
          </span>
        </Entrance>
      )}

      <Entrance delay={180} className="mt-6">
        <h1 className={cn("text-display", isFullscreen ? "text-white" : "text-ink")}>
          {before}
          {highlight && (
            // Sur photo, l'or de la charte suffit ; sur fond clair il faut sa
            // version dense pour rester lisible (3:1 minimum en très grand corps).
            <span className={isFullscreen ? "text-accent" : "text-gold-strong"}>
              {highlight}
            </span>
          )}
          {after}
        </h1>
      </Entrance>

      <Entrance delay={300} className="mt-5 sm:mt-7">
        <p
          className={cn(
            "text-lead measure",
            isFullscreen ? "text-white/80" : "text-muted",
            (layout === "centered" || isDecorated) && "mx-auto",
          )}
        >
          {hero.subtitle}
        </p>
      </Entrance>

      {hero.actions && hero.actions.length > 0 && (
        <Entrance delay={420} className="mt-8 sm:mt-10">
          <div className={cn("flex flex-wrap gap-3", (layout === "centered" || isDecorated) && "justify-center")}>
            {hero.actions.map((action, index) => (
              <Button
                key={action.label}
                action={action}
                size="lg"
                variantOverride={
                  isFullscreen ? (index === 0 ? "light" : "outline-light") : undefined
                }
              />
            ))}
          </div>
        </Entrance>
      )}

      {hero.highlights && hero.highlights.length > 0 && (
        <Entrance delay={540} className="mt-7 sm:mt-10">
          <ul className={cn("flex flex-wrap gap-x-7 gap-y-3", (layout === "centered" || isDecorated) && "justify-center")}>
            {hero.highlights.map((item) => (
              <li
                key={item.text}
                className={cn(
                  "flex items-center gap-2.5 text-sm",
                  isFullscreen ? "text-white/80" : "text-muted",
                )}
              >
                <Icon
                  name={item.icon ?? "check"}
                  size={16}
                  className={isFullscreen ? "text-accent" : "text-primary"}
                />
                {item.text}
              </li>
            ))}
          </ul>
        </Entrance>
      )}
    </div>
  );

  /* ------------------------------------------------------------ Badge flottant */
  const badge = hero.badge ? (
    <Entrance
      delay={660}
      className={cn(
        "flex items-center gap-4 rounded-theme px-5 py-4 sm:px-6 sm:py-5",
        isFullscreen
          ? "bg-background/92 shadow-float backdrop-blur-md"
          : "border border-border bg-background shadow-card",
      )}
    >
      {hero.badge.icon && (
        <span className="flex size-11 items-center justify-center rounded-full bg-primary-light text-primary">
          <Icon name={hero.badge.icon} size={20} />
        </span>
      )}
      <span className="flex flex-col">
        <span className="font-display text-2xl leading-none text-ink tabular">
          {hero.badge.value}
        </span>
        <span className="mt-1.5 text-sm text-muted">{hero.badge.label}</span>
      </span>
    </Entrance>
  ) : null;

  /* ------------------------------------------------------------------ Decore */
  if (isDecorated) {
    return (
      <section
        id="hero"
        className="relative isolate overflow-hidden bg-gradient-to-b from-surface via-background to-primary-light pt-28 pb-36 sm:pt-32 sm:pb-40"
      >
        <HeroDecor decorations={hero.decorations ?? []} />

        {/* Etincelles : elles ponctuent le vide autour du titre. */}
        <Sparkle className="top-[26%] left-[19%] hidden lg:block" size={22} />
        <Sparkle className="top-[38%] right-[21%] hidden lg:block" size={16} delay={1.4} />
        <Sparkle className="bottom-[28%] left-[27%] hidden lg:block" size={14} delay={2.6} />

        <Container size="default" className="relative">
          {content}

          {badge && (
            <Entrance delay={760} className="mt-12 flex justify-center">
              {badge}
            </Entrance>
          )}
        </Container>
      </section>
    );
  }

  /* ---------------------------------------------------------------- Plein ecran */
  if (isFullscreen) {
    return (
      <section id="hero" className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
        {/* La photo depasse legerement du cadre pour absorber le deplacement
            de la parallaxe sans laisser apparaitre de bord. */}
        <Parallax amount={8} className="absolute inset-0 -z-10">
          <div className="relative h-[112%] w-full">
            <SmartImage image={image} fill priority sizes="100vw" />
          </div>
        </Parallax>

        {/* Deux voiles : une teinte d'ensemble, puis un degrade qui assure la
            lisibilite du texte quelle que soit la photo fournie.
            Le voile superieur, lui, est porte par l'en-tete. */}
        <div className="overlay-scrim absolute inset-0 -z-10" aria-hidden="true" />
        <div className="overlay-gradient absolute inset-0 -z-10" aria-hidden="true" />

        <Container size="wide" className="relative pt-32 pb-12 sm:pt-40 sm:pb-20">
          <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between lg:gap-16 sm:gap-12">
            <div className="max-w-3xl">{content}</div>
            {badge && <div className="lg:mb-2 lg:shrink-0">{badge}</div>}
          </div>
        </Container>
      </section>
    );
  }

  /* ------------------------------------------------------------------- Centre */
  if (layout === "centered") {
    return (
      <section id="hero" className="bg-surface pt-36 sm:pt-44">
        <Container size="narrow">{content}</Container>
        <Container size="wide" className="mt-16">
          <Entrance delay={300} className="relative aspect-[21/9] overflow-hidden rounded-theme">
            <SmartImage image={image} fill priority sizes="100vw" />
          </Entrance>
        </Container>
        <div className="h-section-sm" />
      </section>
    );
  }

  /* ------------------------------------------------------------------- Split */
  return (
    <section id="hero" className="relative overflow-hidden bg-surface pt-36 pb-section-sm sm:pt-44">
      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {content}

          <Entrance delay={300} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-theme">
              <SmartImage image={image} fill priority sizes="(max-width: 1024px) 100vw, 48vw" />
            </div>
            {badge && <div className="absolute -bottom-6 -left-6 hidden sm:block">{badge}</div>}
          </Entrance>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
