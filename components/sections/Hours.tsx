import { siteConfig } from "@/data/site";
import { directionsHref, displayPhone, formatAddressLines, telHref } from "@/lib/contact";
import { DAY_LABELS, formatDay, sortSchedule } from "@/lib/hours";
import { labels } from "@/lib/labels";
import { cn } from "@/lib/utils";
import Icon from "@/components/ui/Icon";
import OpenStatus from "@/components/ui/OpenStatus";
import Reveal from "@/components/motion/Reveal";
import Section from "@/components/ui/Section";
import SectionTitle from "@/components/ui/SectionTitle";

/**
 * Horaires d'ouverture.
 *
 * Le jour courant est mis en evidence et, si `showOpenStatus` est actif,
 * une pastille indique en temps reel si l'etablissement est ouvert
 * (calcul effectue cote navigateur, voir `components/ui/OpenStatus.tsx`).
 */
export function Hours() {
  const hours = siteConfig.sections.hours;
  const contact = siteConfig.contact;
  const schedule = sortSchedule(hours.schedule);

  return (
    <Section id="hours" background="surface">
      <SectionTitle
        eyebrow={hours.eyebrow}
        title={hours.title}
        subtitle={hours.subtitle}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        {/* Tableau des horaires */}
        <Reveal className="lg:col-span-3">
          <div className="h-full rounded-theme border border-border bg-background p-6 shadow-card sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                <Icon name="clock" size={20} className="text-primary" />
                {labels.openingHoursTitle}
              </h3>
              {hours.showOpenStatus && (
                <OpenStatus schedule={hours.schedule} timezone={hours.timezone} />
              )}
            </div>

            <ul className="flex flex-col">
              {schedule.map((day) => {
                const closed = day.ranges.length === 0;
                return (
                  <li
                    key={day.day}
                    // `data-day` permet au CSS ou aux tests de cibler un jour precis.
                    data-day={day.day}
                    className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border py-3 last:border-0"
                  >
                    <span className="font-medium text-ink">{DAY_LABELS[day.day]}</span>
                    <span className={cn("text-sm", closed ? "text-muted/70" : "text-muted")}>
                      {formatDay(day)}
                    </span>
                  </li>
                );
              })}
            </ul>

            {hours.note && (
              <p className="mt-5 flex gap-2.5 rounded-theme bg-primary-light/60 p-4 text-sm leading-relaxed text-muted">
                <Icon name="sparkles" size={17} className="mt-0.5 shrink-0 text-primary" />
                {hours.note}
              </p>
            )}
          </div>
        </Reveal>

        {/* Rappel des coordonnees */}
        <Reveal delay={120} className="lg:col-span-2">
          <div className="flex h-full flex-col gap-5 rounded-theme bg-secondary p-6 text-on-primary sm:p-8">
            <h3 className="font-display text-lg font-semibold">{labels.findUsTitle}</h3>

            <address className="flex gap-3 text-sm leading-relaxed text-on-primary/80 not-italic">
              <Icon name="map-pin" size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>
                {formatAddressLines(contact.address).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </address>

            <a
              href={telHref(contact.phone)}
              className="flex items-center gap-3 text-sm text-on-primary/80 transition-colors hover:text-on-primary"
            >
              <Icon name="phone" size={18} className="shrink-0 text-accent" />
              {displayPhone(contact)}
            </a>

            <a
              href={directionsHref(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-theme border border-white/30 px-5 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-secondary"
            >
              <Icon name="map-pin" size={17} />
              {labels.directions}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

export default Hours;
