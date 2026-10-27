import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import {
  displayPhone,
  formatAddressLines,
  mailtoHref,
  telHref,
} from "@/lib/contact";
import { labels } from "@/lib/labels";
import { getVisibleFooterColumns } from "@/lib/sections";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SocialLinks from "@/components/layout/SocialLinks";

/**
 * Pied de page.
 *
 * Sur fond vert profond, avec une signature en grand format : le nom du
 * cabinet ferme la page comme une signature de papeterie, plutot que de
 * disparaitre dans une ligne de mentions legales.
 *
 * Tous les blocs sont conditionnels : un client sans reseaux sociaux ni
 * colonnes de liens obtient un pied de page plus compact, sans trou.
 */
export function Footer() {
  const { company, contact, footer, images } = siteConfig;
  const columns = getVisibleFooterColumns(siteConfig);
  const year = new Date().getFullYear();
  const logo = images.logoLight ?? images.logo;

  return (
    <footer className="bg-footer-bg text-footer-text">
      <Container size="wide">
        <div className="grid gap-14 py-20 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
          {/* Identite */}
          <div className="flex flex-col gap-6">
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width ?? 180}
                height={logo.height ?? 48}
                unoptimized={logo.src.toLowerCase().endsWith(".svg")}
                className="h-10 w-auto self-start"
              />
            ) : (
              <span className="font-display text-2xl">{company.name}</span>
            )}

            {footer.about && (
              <p className="measure leading-relaxed text-footer-text/70">{footer.about}</p>
            )}

            <SocialLinks tone="light" className="mt-2" />
          </div>

          {/* Coordonnees + colonnes de liens */}
          <div
            className={cn(
              "grid gap-10",
              columns.length > 0 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2",
            )}
          >
            {footer.showContact && (
              <div className="flex flex-col gap-5">
                <h2 className="eyebrow text-footer-text/75">{labels.contactTitle}</h2>
                <ul className="flex flex-col gap-4 text-sm">
                  <li>
                    <a
                      href={telHref(contact.phone)}
                      className="flex items-start gap-3 text-footer-text/80 transition-colors duration-500 hover:text-footer-text"
                    >
                      <Icon name="phone" size={16} className="mt-0.5 text-accent" />
                      <span className="tabular">{displayPhone(contact)}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={mailtoHref(contact.email)}
                      className="flex items-start gap-3 break-all text-footer-text/80 transition-colors duration-500 hover:text-footer-text"
                    >
                      <Icon name="mail" size={16} className="mt-0.5 text-accent" />
                      {contact.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 text-footer-text/80">
                    <Icon name="map-pin" size={16} className="mt-0.5 text-accent" />
                    <address className="leading-relaxed not-italic">
                      {formatAddressLines(contact.address).map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </li>
                </ul>
              </div>
            )}

            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-5">
                <h2 className="eyebrow text-footer-text/75">{column.title}</h2>
                <ul className="flex flex-col gap-3 text-sm">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      <Link
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="text-footer-text/80 transition-colors duration-500 hover:text-footer-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Signature en filigrane.
            Trace en SVG et non en texte HTML : c'est un ornement, au meme titre
            qu'un motif de fond. En texte, son opacite tres faible — voulue —
            serait analysee comme un defaut de contraste, alors que la
            recommandation WCAG exclut explicitement le texte purement
            decoratif. Le nom reste par ailleurs lisible en clair juste
            au-dessus et dans la mention de copyright. */}
        <div className="border-t border-white/10 py-10">
          <svg
            viewBox="0 0 1200 130"
            role="presentation"
            aria-hidden="true"
            focusable="false"
            className="h-[clamp(2.5rem,1.2rem+5.4vw,6rem)] w-full select-none"
            preserveAspectRatio="xMinYMid meet"
          >
            <text
              x="0"
              y="100"
              fontFamily="var(--font-display)"
              fontSize="120"
              fill="currentColor"
              className="text-footer-text/[0.07]"
            >
              {company.name}
            </text>
          </svg>
        </div>

        {/* Barre legale */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-footer-text/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName || company.name}. {labels.allRightsReserved}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footer.legalLinks?.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-500 hover:text-footer-text"
              >
                {link.label}
              </Link>
            ))}

            {footer.credits &&
              (footer.credits.href ? (
                <a
                  href={footer.credits.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-500 hover:text-footer-text"
                >
                  {footer.credits.label}
                </a>
              ) : (
                <span>{footer.credits.label}</span>
              ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
