import { siteConfig } from "@/data/site";
import { labels, t } from "@/lib/labels";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/**
 * Page 404.
 * Le nom du client et le bouton de retour proviennent de la configuration.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center bg-surface py-20">
      <Container size="narrow">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="font-display text-6xl font-semibold text-primary">404</span>

          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            {labels.notFoundTitle}
          </h1>

          <p className="max-w-md leading-relaxed text-muted">
            {t(labels.notFoundText, { name: siteConfig.company.name })}
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button
              action={{ label: labels.notFoundHome, href: "/", icon: "arrow-right" }}
            />
            <Button
              action={{
                label: labels.notFoundContact,
                href: "mailto",
                variant: "outline",
                icon: "mail",
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
