import { siteConfig } from "@/data/site";
import {
  directionsHref,
  displayPhone,
  formatAddressLines,
  mailtoHref,
  telHref,
} from "@/lib/contact";
import { DAY_LABELS, formatDayCompact, sortSchedule } from "@/lib/hours";
import { labels } from "@/lib/labels";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import OpenStatus from "@/components/ui/OpenStatus";
import SectionTitle from "@/components/ui/SectionTitle";
import ContactForm from "@/components/sections/ContactForm";
import SocialLinks from "@/components/layout/SocialLinks";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

/**
 * Section de contact : coordonnees, horaires, formulaire et plan.
 *
 * Les horaires sont rappeles ici plutot que dans une section dediee : sur un
 * site de cabinet, l'horaire se consulte au moment de prendre rendez-vous,
 * pas au milieu de la page. La section « hours » reste disponible dans le
 * template pour les clients qui la preferent autonome.
 *
 * `showForm` et `showMap` permettent d'adapter la section a chaque client.
 */
export function Contact() {
  const section = siteConfig.sections.contact;
  const contact = siteConfig.contact;
  const hours = siteConfig.sections.hours;
  const showForm = section.showForm !== false;
  const showMap = section.showMap !== false && Boolean(contact.mapEmbedUrl);
  const showHours = section.showHours !== false && hours.schedule.length > 0;

  /** Coordonnees affichees sous forme de liens actionnables. */
  const details = [
    {
      icon: "phone" as const,
      label: labels.phoneLabel,
      value: displayPhone(contact),
      href: telHref(contact.phone),
    },
    {
      icon: "mail" as const,
      label: labels.emailLabel,
      value: contact.email,
      href: mailtoHref(contact.email),
    },
    {
      icon: "map-pin" as const,
      label: labels.addressLabel,
      value: formatAddressLines(contact.address).join(", "),
      href: directionsHref(contact),
      external: true,
    },
  ];

  return (
    <section id="contact" className="scroll-mt-24 bg-surface py-section">
      <Container size="wide">
        <SectionTitle
          eyebrow={section.eyebrow}
          title={section.title}
          subtitle={section.subtitle}
          align="center"
          className="mx-auto max-w-2xl"
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Coordonnees + horaires */}
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-theme border border-border bg-background p-8 sm:p-9">
              <Stagger as="ul" gap={0.08} className="flex flex-col">
                {details.map((detail) => (
                  <StaggerItem
                    as="li"
                    key={detail.label}
                    className="border-b border-border py-5 first:pt-0 last:border-0 last:pb-0"
                  >
                    <a
                      href={detail.href}
                      {...(detail.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex items-start gap-4"
                    >
                      <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-on-primary">
                        <Icon name={detail.icon} size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="eyebrow block text-muted/80">{detail.label}</span>
                        <span className="mt-1.5 block break-words text-ink transition-colors duration-500 group-hover:text-primary">
                          {detail.value}
                        </span>
                      </span>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>

              {contact.bookingUrl && (
                <Button
                  action={{
                    label: "Prendre rendez-vous en ligne",
                    href: contact.bookingUrl,
                    icon: "calendar-check",
                    external: true,
                  }}
                  block
                  className="mt-8"
                />
              )}

              <div className="mt-8 border-t border-border pt-6">
                <p className="eyebrow mb-4 text-muted/80">{labels.followUs}</p>
                <SocialLinks />
              </div>
            </div>

            {/* Horaires */}
            {showHours && (
              <div className="rounded-theme border border-border bg-background p-8 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl text-ink">
                    {labels.openingHoursTitle}
                  </h3>
                  {hours.showOpenStatus && (
                    <OpenStatus schedule={hours.schedule} timezone={hours.timezone} />
                  )}
                </div>

                <ul className="mt-6 flex flex-col">
                  {sortSchedule(hours.schedule).map((day) => {
                    const closed = day.ranges.length === 0;
                    return (
                      <li
                        key={day.day}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border py-3 text-sm last:border-0"
                      >
                        <span className="text-ink">{DAY_LABELS[day.day]}</span>
                        <span className={closed ? "text-muted/60 tabular" : "text-muted tabular"}>
                          {formatDayCompact(day)}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {hours.note && (
                  <p className="mt-6 text-sm leading-relaxed text-muted">{hours.note}</p>
                )}
              </div>
            )}
          </Reveal>

          {/* Formulaire */}
          {showForm && (
            <Reveal delay={0.12}>
              <div className="h-full rounded-theme border border-border bg-background p-8 sm:p-10">
                <ContactForm />
              </div>
            </Reveal>
          )}
        </div>

        {/* Plan */}
        {showMap && (
          <Reveal preset="scale" delay={0.1} className="mt-6">
            <div className="overflow-hidden rounded-theme border border-border">
              <iframe
                src={contact.mapEmbedUrl}
                title={`Localisation de ${siteConfig.company.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-[24rem] w-full border-0 grayscale-[0.35] transition-[filter] duration-700 hover:grayscale-0"
              />
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  );
}

export default Contact;
